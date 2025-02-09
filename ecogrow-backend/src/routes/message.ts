import express, { NextFunction, Request, Response } from 'express';
import { sendMessage } from '../services/message-service';

const router = express.Router();

router.get('/reward', async (req: Request, res: Response, next: NextFunction) => {
  const email = req.query.email as string;

  try {
    sendMessage(email, "Congratulations! You have been placed in the TOP 3 in EcoGrow leaderboard.", `Congratulations on being placed in the TOP 3 in EcoGrow leaderboard. As a reward, we have prepared a gift of a few fruits and vegetables for you. We hope you enjoy them! We also encourage you to continue tracking your progress and earning more credits!`);
    res.json({
      success: true
    });
  } catch (error) {
    next(error);
  }
});

export default router;