import bcrypt from "bcrypt";

export const comparePasswords = async (
  password: string,
  passwordDb: string
) => {
  return await bcrypt.compare(password, passwordDb);
};
