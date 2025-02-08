import { Router } from "express";
import authService from "../services/auth-service";
import { validateRequest } from "../middlewares/validate-request";
import { auth } from "../middlewares/auth";
import {
  signupSchema,
  loginRequestSchema,
  type SignupRequest,
  type AuthResponse,
  type LoginRequest,
} from "../types/auth.api";

const router = Router();

router.post<
  Record<string, never>,
  AuthResponse,
  SignupRequest
>(
  "/signup",
  validateRequest({ body: signupSchema }),
  async (req, res, next) => {
    try {
      const result = await authService.signup(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post<
  Record<string, never>,
  AuthResponse,
  LoginRequest
>(
  "/login",
  validateRequest({ body: loginRequestSchema }),
  async (req, res, next) => {
    try {
      const result = await authService.login(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get<
  Record<string, never>,
  AuthResponse
>("/verify",
  auth,
  async (req, res, next) => {
    try {
      const result = await authService.verifyToken(req.userId!, req.username!, req.email!);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;