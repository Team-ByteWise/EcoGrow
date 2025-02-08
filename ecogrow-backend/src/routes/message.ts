import express, { NextFunction, Request, Response } from 'express';
import { MailtrapClient } from 'mailtrap';
import { env } from '../config/env';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const email = req.query.email as string;

  try {
    const mailtrapClient = new MailtrapClient({
      token: env.mailtrap.token
    });
    mailtrapClient
      .send({
        from: { name: "EcoGrow", email: env.mailtrap.senderEmail },
        to: [{ email: email }],
        subject: "Congratulations! You have been placed in the TOP 3 in EcoGrow leaderboard.",
        text: `Congratulations on being placed in the TOP 3 in EcoGrow leaderboard. As a reward, we have prepared a gift of a few fruits and vegetables for you. We hope you enjoy them! We also encourage you to continue tracking your progress and earning more credits!`,
      })
      .then(console.log)
      .catch(console.error);
    res.json({
      success: true
    });
  } catch (error) {
    next(error);
  }
});

export default router;