import bcrypt from "bcrypt";
export const comparePasswords = async (password, passwordDb) => {
    return await bcrypt.compare(password, passwordDb);
};
