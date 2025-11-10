import type { NextFunction, Response, Request } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import prisma from "../lib/prisma.ts";
import ErrorResponse from "../utils/CustomErrorResponse.ts";
import type { TokenPayload } from "../types/output.js";

const JWT_SECRET = process.env.JWT_SECRET || "secr3t";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { authorization } = req.headers;
  const token = req.cookies.auth_token;

  // console.log("verify token value ===> ", token);
  // console.log("cookies ===> ", req.cookies);

  // if (!authorization) {
  //   res.status(401).json({ message: "Authorization token required." });
  //   return;
  // }

  // const token = authorization?.split(" ")[1];
  // console.log("Token from cookies ===> ", token);
  try {
    console.log("auth token ===> ", token);
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

    // console.log(user);
    // console.log(decoded);

    req.userData = user;

    next();
  } catch (error) {
    console.log("error in verify token middleware ===> ", error);
    // throw new ErrorResponse("Request is not authorized", 401);
    next(error);
  }
};
