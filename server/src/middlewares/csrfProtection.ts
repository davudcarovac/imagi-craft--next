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
    console.log("Get token ===> ", token);
    res.cookie("XSRF-TOKEN", token, {
      secure: true, // HTTPS only
      sameSite: "none", // Obavezno za cross-site
      httpOnly: false, // Dozvoli čitanje u JavaScriptu
      domain: "frosty-image-server.onrender.com", // Eksplicitno navedi domain
      path: "/",
      maxAge: 48 * 60 * 60 * 1000, // 24h
    });
    return next();
  }

  const csrfCookie = req.cookies["XSRF-TOKEN"];
  const csrfHeader = req.headers["x-xsrf-token"];

  console.log("csrf cookie => ", csrfCookie);
  console.log("csrf header => ", csrfHeader);
  console.log(csrfCookie, csrfCookie === csrfHeader);

  if (!csrfCookie || csrfCookie !== csrfHeader) {
    throw new ErrorResponse("CSRF token invalid or missing", 403);
  }

  next();
};
