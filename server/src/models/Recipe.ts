import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
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
