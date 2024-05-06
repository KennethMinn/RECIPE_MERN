import { Request, Response } from "express";
import Recipe from "../models/Recipe";
import { z } from "zod";

export const RecipeController = {
  index: async (req: Request, res: Response) => {
    const recipes = await Recipe.find();
    return res.json(recipes);
  },
  show: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const recipe = await Recipe.findById(id);
      return res.json(recipe);
    } catch (error) {
      return res.json({ message: "Recipe not found." });
    }
  },
  store: async (req: Request, res: Response) => {
    const recipeSchema = z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      ingredients: z.array(z.string().min(1)).nonempty(),
    });

    const result = recipeSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "fail" });

    return res.status(200).json({ message: "ok" });

    // const { title, description, ingredients } = req.body;
    // const recipe = await Recipe.create({
    //   title,
    //   description,
    //   ingredients,
    // });
  },
};
