import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.string().email("Inavalid Email"),
  password: z.string().min(8, "Password must be at least 8 chracters"),
});

export type TUserSchema = z.infer<typeof userSchema>;
