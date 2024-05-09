import axios from "../lib/axiosInstance";

import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type UpdateRecipeValues = {
  title: string;
  description: string;
  ingredients: string[];
};

export const useUpdateCountry = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateRecipeValues) => {
      try {
        await axios.patch(`/recipes/${id}`, data);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recipe"] as InvalidateQueryFilters);
    },
  });
};
