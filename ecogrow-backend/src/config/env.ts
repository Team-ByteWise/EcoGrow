import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3001"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  DATABASE_URL: z.string(),

  JWT_SECRET: z.string().min(32, "JWT secret must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),

  CORS_ORIGIN: z.string().url("Frontend URL must be a valid URL"),
  MAILTRAP_TOKEN: z.string(),
  MAILTRAP_SENDER_EMAIL: z.string(),
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error("❌ Invalid environment variables:", envParse.error.format());
  throw new Error("Invalid environment variables");
}

export const env = {
  server: {
    port: parseInt(envParse.data.PORT),
    nodeEnv: envParse.data.NODE_ENV,
  },
  database: {
    url: envParse.data.DATABASE_URL,
  },
  jwt: {
    secret: envParse.data.JWT_SECRET,
    expiresIn: parseFloat(envParse.data.JWT_EXPIRES_IN),
  },
  cors: {
    origin: envParse.data.CORS_ORIGIN,
  },
  mailtrap: {
    token: envParse.data.MAILTRAP_TOKEN,
    senderEmail: envParse.data.MAILTRAP_SENDER_EMAIL,
  }
} as const;

export const jwtConfig = env.jwt;