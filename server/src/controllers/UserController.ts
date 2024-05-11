import { Request, Response } from "express";
import User from "../models/User";

export const UserController = {
  login: async (req: Request, res: Response) => {
    return res.status(200).json({ massage: "login" });
  },
  register: async (req: Request, res: Response) => {
    const user = await User.register(req, res);
    return res.status(200).json(user);
  },
};
//
