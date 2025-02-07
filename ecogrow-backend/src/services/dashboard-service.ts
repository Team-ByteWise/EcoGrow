import { PrismaClient } from "@prisma/client";

class DashboardService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getUserTrees(userId: number) {
    const userTrees = await this.prisma.order.findMany({
      where: { userId: userId },
      select: {
        quantity: true,
        date: true,
        tree: {
          select: { details: true, project: true, name: true }
        }
      },
    });

    return userTrees;
  }

}

export default new DashboardService(new PrismaClient());