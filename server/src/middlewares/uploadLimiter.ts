import type { NextFunction, Request, Response } from "express";
import { PLAN_LIMITS, PLAN_LIMITS_WM } from "../utils/planLimits.ts";
import ErrorResponse from "../utils/CustomErrorResponse.ts";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import type { TokenPayload } from "../types/output.js";
import { bytesToMB } from "../utils/bytesToMb.ts";

const JWT_SECRET = process.env.JWT_SECRET || "secr3t";

export const uploadLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.auth_token;
  let userPlan: keyof typeof PLAN_LIMITS = "STARTER";

  try {
    // if (!token) {
    //   throw new ErrorResponse("Request is not authorized", 401);
    // }

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

      if (!PLAN_LIMITS[userPlan]) {
        throw new ErrorResponse("Invalid user plan", 403);
      }
      userPlan = decoded.plan as keyof typeof PLAN_LIMITS;
    }

    const { maxFiles, maxTotalSize } = PLAN_LIMITS[userPlan];
    const { bgFileSize, maxTotalSize: maxTotalSizeWm } =
      PLAN_LIMITS_WM[userPlan];

    const files = req.files as Express.Multer.File[] | undefined;

    if (files && files.length > maxFiles) {
      throw new ErrorResponse(
        `Maximum ${maxFiles} files allowed for ${userPlan} plan`,
        403
      );
    }

    const hasOversizedFile = files?.some((item) => item.size > maxTotalSize);
    if (hasOversizedFile) {
      throw new ErrorResponse(
        `Maximum file size for ${userPlan} plan is ${bytesToMB(
          maxTotalSize
        )}MB`,
        413
      );
    }

    console.log(PLAN_LIMITS[userPlan]);
    console.log(PLAN_LIMITS_WM[userPlan]);

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
