import type { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/CustomErrorResponse.ts";
import { generateCsrfToken } from "../utils/generateCsrfToken.ts";

export const csrfProtection = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    const csrfToken = generateCsrfToken();
    console.log(csrfToken);
    res.cookie("XSRF-TOKEN", csrfToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      httpOnly: false,
      domain:
        process.env.NODE_ENV === "production"
          ? // ? ".frostyimage.com"
            undefined
          : "localhost",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return next();
  }

  const tokenInHeader = req.headers["x-csrf-token"];
  const tokenInCookie = req.cookies["XSRF-TOKEN"];

  console.log("from headers => ", tokenInHeader);
  console.log("from cookies => ", tokenInCookie);

  if (!tokenInCookie || tokenInCookie !== tokenInHeader) {
    throw new ErrorResponse("CSRF token invalid or missing", 403);
  }

  next();
};
