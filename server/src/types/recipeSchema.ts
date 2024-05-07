import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  ingredients: z
    .array(z.string().min(1, "string cannot be empty"))
    .nonempty("must have at least one ingredients"),
});

export type TRecipeSchema = z.infer<typeof recipeSchema>;
