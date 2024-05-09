import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../lib/axiosInstance";

type CreateRecipeValues = {
  title: string;
  description: string;
  ingredients: string[];
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRecipeValues) => {
      try {
        await axios.post("/recipes", data);
      } catch (error) {
        alert(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"] as InvalidateQueryFilters);
    },
  });
};
