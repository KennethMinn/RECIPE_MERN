import { FormEvent, useState } from "react";
import { useLoginUser } from "../hooks/auth/useLoginUser";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending } = useLoginUser();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      const data = { email, password };
      setEmail("");
      setPassword("");
      login(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={onSubmit}
        className="p-10 mt-10 border border-black rounded-md w-[400px]"
      >
        <h1 className="mb-5 text-2xl font-bold text-center">Login Form</h1>
        <div className="flex flex-col gap-y-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="email"
            className="py-3 ps-2 border border-gray-500 w-[300px] rounded-md"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="text"
            placeholder="password"
            className="py-3 ps-2 border border-gray-500 w-[300px] rounded-md"
          />
          <button
            disabled={isPending}
            type="submit"
            className="p-3 text-center text-white bg-black rounded-md cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
