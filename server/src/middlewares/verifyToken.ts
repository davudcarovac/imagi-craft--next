import type { NextFunction, Response, Request } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import prisma from "../lib/prisma.ts";
import ErrorResponse from "../utils/CustomErrorResponse.ts";

interface TokenPayload extends JwtPayload {
  id: string;
}
const JWT_SECRET = process.env.JWT_SECRET || "secr3t";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { authorization } = req.headers;
  const token = req.cookies.auth_token;

  console.log(token);

  // if (!authorization) {
  //   res.status(401).json({ message: "Authorization token required." });
  //   return;
  // }

  // const token = authorization?.split(" ")[1];
  // console.log("Token from cookies ===> ", token);
  try {
    if (!token) {
      throw new ErrorResponse("Request is not authorized", 401);
    }
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    // console.log("user from verify ===> ", user);
    if (!user) {
      throw new ErrorResponse("No user found", 400);
    }

    req.userData = user;

    next();
  } catch (error) {
    res.status(401).json({
      error: "Request is not authorized.",
    });
  }
};
