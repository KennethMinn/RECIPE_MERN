import { Request, Response } from "express";
import Recipe from "../models/Recipe";
import mongoose from "mongoose";

type Num = { number: number };

export const RecipeController = {
  index: async (req: Request, res: Response) => {
    const limit = 1; //items per page
    // ?page = 1
    let page: number = parseInt(req.query.page as string) || 1; // Parse string to number

    const recipes = await Recipe.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); //sort by descending with createdAt

    const totalRecipes = await Recipe.countDocuments(); //length of all recipes
    const totalPages = Math.ceil(totalRecipes / limit); //total pagination numbers

    let link = {
      nextPage: page == totalPages ? false : true,
      previousPage: page == 1 ? false : true,
      currentPage: page, //page from user req query
      numbers: [],
    };

    for (let index = 1; index <= totalPages; index++) {
      const num: Num = { number: index };
      link.numbers.push(num as never);
    }

    const response = {
      link,
      recipes,
    };

    return res.json(response);
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
    const newData = req.body;
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
