import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import AppError from "../utils/AppError";

interface ValidateRequestOptions {
  params?: AnyZodObject;
  query?: AnyZodObject;
  body?: AnyZodObject;
}

export function validateRequest(schemas: ValidateRequestOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.params) {
        req.params = await schemas.params.parseAsync(req.params);
      }
      if (schemas.query) {
        req.query = await schemas.query.parseAsync(req.query);
      }
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          new AppError(
            "Validation failed",
            400,
            error.errors.map((e) => ({
              path: e.path.join("."),
              message: e.message,
            }))
          )
        );
      } else {
        next(error);
      }
    }
  };
}