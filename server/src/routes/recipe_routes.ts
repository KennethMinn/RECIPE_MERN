import express from "express";
import { RecipeController } from "../controllers/RecipeController";

const router = express.Router();

router.get("", RecipeController.index);
router.get("/:id", RecipeController.show);
router.post("", RecipeController.store);

export default router;
