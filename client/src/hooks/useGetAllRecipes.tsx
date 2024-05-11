import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";

export const useGetAllRecipes = (page = "") => {
  return useQuery({
    queryKey: ["recipes", page],
    queryFn: async () => {
      const res = await axios.get(`/recipes/?page=${page}`);
      return await res.data;
    },
  });
};
