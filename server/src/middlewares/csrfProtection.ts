import type { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/CustomErrorResponse.ts";
import crypto from "crypto";

const generateCsrfToken = () => crypto.randomBytes(32).toString("hex");

export const csrfProtection = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    const token = generateCsrfToken();
    res.cookie("XSRF-TOKEN", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: false,
      path: "/",
    });
    return next();
  }

  const csrfCookie = req.cookies["XSRF-TOKEN"];
  const csrfHeader = req.headers["x-xsrf-token"];

  // console.log("csrf cookie => ", csrfCookie);
  // console.log("csrf header => ", csrfHeader);

  if (!csrfCookie || csrfCookie !== csrfHeader) {
    throw new ErrorResponse("CSRF token invalid or missing", 403);
  }

  next();
};
