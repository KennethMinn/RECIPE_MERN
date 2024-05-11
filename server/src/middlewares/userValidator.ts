import { type NextFunction, type Request, type Response } from "express";
import { userSchema } from "../types/userSchema";
import User from "../models/User";

export const userValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let zodErrors = {};

  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }; // {title : 'error message'}
    });
  }

  const { email } = req.body;
  const isUserExisted = await User.findOne({ email });
  if (isUserExisted) {
    zodErrors = { ...zodErrors, email: "email already exists." };
  }

  if (Object.keys(zodErrors).length > 0)
    return res.status(400).json({ errors: zodErrors });

  next();
};
