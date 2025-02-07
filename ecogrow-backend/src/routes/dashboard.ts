import express, { Request, Response } from 'express';
import { auth } from '../middlewares/auth';
import dashboardService from '../services/dashboard-service';
import leaderboardService from '../services/leaderboard-service';
import AppError from '../utils/AppError';

const router = express.Router();

router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new AppError("Unauthorized access", 403);
    }
    
    const userOrders = await dashboardService.getUserTrees(userId);

    const totalTreesPlanted = userOrders.reduce((sum, order) => sum + order.quantity, 0);
    const totalCo2Offset = userOrders.reduce((sum, order) => {
      const co2Offset = order.tree.details?.co2Offset || 0;
      return sum + (co2Offset * order.quantity);
    }, 0);

    const leaderboard = await leaderboardService.getLeaderboard();

    const lastTreesPlanted = userOrders.map(order => ({
      treeName: order.tree.name,
      projectName: order.tree.project.name,
      quantity: order.quantity,
      date: order.date,
      co2Offset: (order.tree.details?.co2Offset || 0) * order.quantity,
      imageUrl: order.tree.details?.imageUrl
    }));

    const userRank = await leaderboardService.getUserRank(userId);

    res.json({
      treesPlanted: totalTreesPlanted,
      totalCo2Offset,
      rank: userRank,
      lastTreesPlanted,
      leaderboard
    });
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

export default router;