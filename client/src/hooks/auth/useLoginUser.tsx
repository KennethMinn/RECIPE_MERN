import { useMutation } from "@tanstack/react-query";
import axios from "../../lib/axiosInstance";
import { useNavigate } from "react-router-dom";

type LoginUserValues = {
  email: string;
  password: string;
};

export const useLoginUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginUserValues) => {
      try {
        const res = await axios.post("/users/login", data);
        console.log(res.data);
        navigate("/");
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  });
};
