import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import AppError from "../utils/AppError";

class AuthService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async signup(data: {
    email: string;
    username: string;
    password: string;
  }) {
    const {
      email,
      username,
      password,
    } = data;

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new AppError(
        existingUser.email === email
          ? "Email already registered"
          : "Username already taken",
        400
      );
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await tx.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        }
      });

      await tx.credit.create({
        data: {
          userId: user.id,
          creditsEarned: 0,
          creditsConsumed: 0
        }
      });

      const token = jwt.sign(
        { userId: user.id, username: user.username, email: user.email },
        env.jwt.secret as string,
        { expiresIn: env.jwt.expiresIn }
      );

      return {
        token: token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username
        },
      };
    });

    return result;
  }

  async login(data: { email: string; password: string }) {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      env.jwt.secret as string,
      { expiresIn: env.jwt.expiresIn }
    );

    return {
      token: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      },
    };
  }

  async verifyToken(userId: number, username?: string, userEmail?: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new AppError("User no longer exists", 401);
      }

      if (username && userEmail) {
        if (user.username !== username || user.email !== userEmail) {
          throw new AppError("Invalid token", 401);
        }
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username, email: user.email },
        env.jwt.secret,
        { expiresIn: env.jwt.expiresIn }
      );

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        if (error.name === "TokenExpiredError") {
          throw new AppError("Token has expired", 401);
        }
        throw new AppError("Invalid token", 401);
      }
      throw error;
    }
  }

  async verifyUser(userId: number, username: string, userEmail: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        username: username,
        email: userEmail,
      }
    });

    if (!user) {
      throw new AppError("Unauthorized access", 403);
    }
  }
}

export default new AuthService(new PrismaClient());