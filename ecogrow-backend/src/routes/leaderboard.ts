import express, { NextFunction, Request, Response } from 'express';
import { auth } from '../middlewares/auth';
import leaderboardService from '../services/leaderboard-service';

const router = express.Router();

router.get('/', auth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderboard = await leaderboardService.getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default router;