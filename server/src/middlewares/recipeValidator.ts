import { type NextFunction, type Request, type Response } from "express";
import { recipeSchema } from "../types/recipeSchema";

export const recipeValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let zodErrors = {};

  const result = recipeSchema.safeParse(req.body);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }; // {title : 'error message'}
    });
  }

  if (Object.keys(zodErrors).length > 0)
    return res.status(400).json({ errors: zodErrors });

  next();
};
