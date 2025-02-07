import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import authService from "../services/auth-service";

export const auth = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AppError("No token provided", 401));
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
      return next(new AppError("Token error", 401));
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return next(new AppError("Malformatted token", 401));
    }

    const decoded = jwt.verify(token, env.jwt.secret) as { userId: number; username: string; email: string };
    req.userId = decoded.userId;
    req.username = decoded.username;
    req.email = decoded.email;

    if (!req.userId || !req.username || !req.email) {
      return next(new AppError("Invalid or expired token", 401));
    }

    // Check if user still exists
    authService.verifyUser(req.userId, req.username, req.email).catch(() => {
      return next(new AppError("User no longer exists", 401));
    });

    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};
