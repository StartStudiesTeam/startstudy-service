import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const middlewareSchema =
  (zodSchema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      zodSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message:
            error.errors.map((err) => err.message).join(", ") ||
            "Erro de validação",
          body: {},
        });
      }
    }
  };
