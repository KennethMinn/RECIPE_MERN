import express from "express";
import { UserController } from "../controllers/UserController";
import { userValidator } from "../middlewares/userValidator";

const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", userValidator, UserController.register);

export default router;
