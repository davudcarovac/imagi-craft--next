import type { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/CustomErrorResponse.ts";
import { generateCsrfToken } from "../utils/generateCsrfToken.ts";

export const csrfProtection = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session) {
    throw new ErrorResponse("Session not initialized", 500);
  }

  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    const csrfToken = generateCsrfToken();
    req.session.csrfToken = csrfToken;

    req.session.save((err) => {
      if (err) {
        return next(new ErrorResponse("Failed to save session", 500));
      }
    });

    return res.status(200).json({
      success: true,
      message: "Csrf token set in session",
      csrfToken: csrfToken,
    });
  }

  const tokenInHeader = req.headers["x-csrf-token"];
  const tokenInSession = req.session.csrfToken;

  console.log("session  => ", req.session);
  console.log("token in header => ", tokenInHeader);
  console.log("token in session => ", tokenInSession);

  if (!tokenInHeader || tokenInHeader !== tokenInSession) {
    throw new ErrorResponse("Csrf token invalid or missing", 403);
  }

  next();
};
