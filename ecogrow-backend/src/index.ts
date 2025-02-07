import cors from 'cors';
import express, { Request, Response } from "express";
import morgan from 'morgan';
import AppError from './utils/AppError';
import { env } from './config/env';
import authRoute from './routes/auth'

const app = express();
const port = env.server.port || 3000;

app.use(cors({
  origin: env.cors.origin,
  credentials: true,
}));

app.use(morgan("dev"));

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to EcoGrow Backend Server!\nYou are ${req.headers["user-agent"]}`);
});

app.use("/auth", authRoute);

app.use((_req, _res, next) => {
  next(new AppError('Route not found', 404));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
