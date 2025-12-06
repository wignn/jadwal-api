import type { Request, Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";
import { ZodError } from "zod";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } else if (error instanceof ZodError) {
    res.status(400).json({
      errors: "Validation Error",
      details: error.issues,
    });
  } else {
    res.status(500).json({
      errors: error.message,
    });
  }
};
