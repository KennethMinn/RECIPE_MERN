import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String], //string[]
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Recipe", recipeSchema);
