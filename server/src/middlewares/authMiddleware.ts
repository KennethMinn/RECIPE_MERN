import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = await req.cookies.accessToken;
  console.log(accessToken);
  console.log(req.headers.authorization);
  next();
};
