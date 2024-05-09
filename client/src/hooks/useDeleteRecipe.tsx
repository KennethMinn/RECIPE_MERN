import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../lib/axiosInstance";

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/recipes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recipies"] as InvalidateQueryFilters);
    },
  });
};
