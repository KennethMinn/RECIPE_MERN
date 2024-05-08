import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";

export const useGetAllRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const res = await axios.get("/recipes");
      return await res.data;
    },
  });
};
