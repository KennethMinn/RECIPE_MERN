import { Request, Response } from "express";
import Recipe from "../models/Recipe";
import mongoose from "mongoose";

export const RecipeController = {
  index: async (_req: Request, res: Response) => {
    const recipes = await Recipe.find().sort({ createdAt: -1 }); //sort by descending with createdAt
    return res.json(recipes);
  },
  show: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id." });
      }
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found." });
      }
      return res.status(200).json(recipe);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  store: async (req: Request, res: Response) => {
    const { title, description, ingredients } = req.body;
    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
    });
    return res.status(200).json(recipe);
  },
  update: async (req: Request, res: Response) => {
    const newData = { ...req.body };
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id." });
      }
      const recipe = await Recipe.findByIdAndUpdate(id, newData, { new: true }); //new : true is returning the updated value
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found." });
      }
      return res.status(200).json(recipe);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  destroy: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id." });
      }
      await Recipe.findByIdAndDelete(id);
      return res.json({ message: "recipe deleted" });
    } catch (error) {
      return res.json({ message: "Recipe not found." });
    }
  },
};
