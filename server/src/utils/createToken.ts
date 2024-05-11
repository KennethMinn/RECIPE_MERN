import jwt from "jsonwebtoken";

export const maxAge = 3 * 24 * 60 * 60; //3 days in seconds

export const createToken = (_id: string) => {
  const token = jwt.sign({ _id }, "secretKey", { expiresIn: maxAge });
  return token;
};
