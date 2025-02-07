import { PrismaClient } from "@prisma/client";

class LeaderboardService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private async getUsersCo2Offsets() {
    let userToCo2OffsetMap: Map<number, number> = new Map();

    const allUsers = await this.prisma.user.findMany();
    allUsers.forEach(async (user) => {
      const userTrees = await this.prisma.order.findMany({
        where: { userId: user.id },
        select: {
          tree: {
            select: { details: true }
          }
        },
      });

      const totalCo2Offset = userTrees.reduce((sum, tree) => sum + (tree.tree.details?.co2Offset || 0), 0);
      userToCo2OffsetMap.set(user.id, totalCo2Offset);
    });

    return userToCo2OffsetMap;
  }

  async getUserRank(userId: number) {
    const userToCo2OffsetMap = await this.getUsersCo2Offsets();

    const sortedUsers = Array.from(userToCo2OffsetMap.entries()).sort((a, b) => b[1] - a[1]);
    const userRank = sortedUsers.findIndex((user) => user[0] === userId) + 1;

    return userRank;
  }

  async getLeaderboard() {
    const userToCo2OffsetMap = await this.getUsersCo2Offsets();
    const sortedUsers = Array.from(userToCo2OffsetMap.entries()).sort((a, b) => b[1] - a[1]);
    return sortedUsers.slice(0, 10);
  }
}

export default new LeaderboardService(new PrismaClient());