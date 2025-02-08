import { PrismaClient } from "@prisma/client";

class LeaderboardService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private async getUsersCo2Offsets() {
    let userToCo2OffsetMap: Map<number, number> = new Map();

    const allUsers = await this.prisma.user.findMany();
    for (const user of allUsers) {
      const userTrees = await this.prisma.order.findMany({
        where: { userId: user.id, status: "COMPLETED" },
        select: {
          quantity: true,
          tree: {
            select: { details: true }
          }
        },
      });

      const totalCo2Offset = userTrees.reduce((sum, tree) => sum + (tree.tree.details?.co2Offset || 0) * tree.quantity, 0);
      userToCo2OffsetMap.set(user.id, totalCo2Offset);
    }

    return userToCo2OffsetMap;
  }

  async getUserRank(userId: number) {
    const userToCo2OffsetMap = await this.getUsersCo2Offsets();
    const sortedUsers = Array.from(userToCo2OffsetMap.entries()).sort((a, b) => b[1] - a[1]);
    const userRank = sortedUsers.findIndex((user) => user[0] === userId) + 1;
    return userRank;
  }

  async getLeaderboard() {
    let data = [];

    const allUsers = await this.prisma.user.findMany();
    for (const user of allUsers) {
      const userTrees = await this.prisma.order.findMany({
        where: { userId: user.id, status: "COMPLETED" },
        select: {
          quantity: true,
          tree: {
            select: { details: true }
          }
        },
      });
      const totalTrees = userTrees.reduce((sum, tree) => sum + tree.quantity, 0);
      const totalCo2Offset = userTrees.reduce((sum, tree) => sum + (tree.tree.details?.co2Offset || 0) * tree.quantity, 0);
      data.push({ userId: user.id, username: user.username, totalTrees, totalCo2Offset });
    }

    const sortedUsers = data.sort((a, b) => b.totalCo2Offset - a.totalCo2Offset);
    return sortedUsers.slice(0, 10);
  }
}

export default new LeaderboardService(new PrismaClient());