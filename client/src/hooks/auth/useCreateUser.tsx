import { useMutation } from "@tanstack/react-query";
import axios from "../../lib/axiosInstance";
import { useNavigate } from "react-router-dom";

type CreateUserValues = {
  name: string;
  email: string;
  password: string;
};

export const useCreateUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: CreateUserValues) => {
      try {
        const res = await axios.post("/users/register", data);
        console.log(res.data);
        navigate("/");
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  });
};
