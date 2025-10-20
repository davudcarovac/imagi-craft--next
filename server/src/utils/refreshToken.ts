import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "secr3tTkn";

export const generateRefreshToken = (userId: string, plan: string) => 
{
    return jwt.sign({userId, plan}, JWT_REFRESH_SECRET, {expiresIn: "7d"})
}