import { Request, Response } from "express";
import User from "../models/User";
import { createToken, maxAge } from "../utils/createToken";

export const UserController = {
  login: async (req: Request, res: Response) => {
    return res.status(200).json({ massage: "login" });
  },
  register: async (req: Request, res: Response) => {
    try {
      const user = await User.register(req, res);
      const accessToken = createToken(user._id);
      res.cookie("accessToken", accessToken, { httpOnly: true, maxAge }); //set http only cookie in browser
      return res.status(200).json({ accessToken, user });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },
};
//
