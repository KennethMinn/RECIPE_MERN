import { FormEvent, useState } from "react";
import { useCreateUser } from "../hooks/auth/useCreateUser";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: createUser, isPending } = useCreateUser();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    try {
      const data = { name, email, password };
      setName("");
      setEmail("");
      setPassword("");
      createUser(data);
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
        <h1 className="mb-5 text-2xl font-bold text-center">Register Form</h1>
        <div className="flex flex-col gap-y-3">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="name"
            className="py-3 ps-2 border border-gray-500 w-[300px] rounded-md"
          />
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
