import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";
import { Recipe } from "../types";

export const useGetRecipe = (id: string) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const res = await axios.get(`/recipes/${id}`);
      const data: Recipe = await res.data;
      return data;
    },
    enabled: !!id,
  });
};
