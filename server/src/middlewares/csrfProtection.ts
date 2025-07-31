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
    return res.status(200).json({
      success: true,
      message: "Csrf token sent",
      csrfToken: csrfToken,
    });
  }

  const { csrfToken: tokenInBody } = req.body;

  const tokenInHeader = req.headers["x-csrf-token"];
  // const tokenInCookie = req.cookies["XSRF-TOKEN"];

  console.log("from body => ", tokenInBody);
  console.log("from headers => ", tokenInHeader);

  if (!tokenInBody || tokenInBody !== tokenInHeader) {
    throw new ErrorResponse("CSRF token invalid or missing", 403);
  }

  next();
};
