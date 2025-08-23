import type { NextFunction, Request, Response, Express } from "express";
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
  const action = req.body.action;
  const token = req.cookies.auth_token;
  let userPlan: keyof typeof PLAN_LIMITS = "STARTER";

  try {
    // if (!token) {
    //   throw new ErrorResponse("Request is not authorized", 401);
    // }

    if (!req.files) {
      throw new ErrorResponse("No files were uploaded.", 400);
    }

    // Verifikacija tokena i provera plana
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      userPlan = decoded.plan as keyof typeof PLAN_LIMITS;

      if (!PLAN_LIMITS[userPlan]) {
        throw new ErrorResponse("Invalid user plan", 403);
      }
    }

    const { maxFiles, maxTotalSize } = PLAN_LIMITS[userPlan];

    // Watermark slučaj
    if (action === "watermark") {
      const wmFiles = req.files as {
        files?: Express.Multer.File[];
        file?: Express.Multer.File[];
      };

      // Provera da li postoje oba fajla
      if (!wmFiles.files || wmFiles.files.length === 0 || !wmFiles.files[0]) {
        throw new ErrorResponse("Background image is required", 400);
      }

      if (!wmFiles.file || wmFiles.file.length === 0 || !wmFiles.file[0]) {
        throw new ErrorResponse("Watermark image is required", 400);
      }

      const bgFile = wmFiles.files[0];
      const watermarkFile = wmFiles.file[0];

      const { bgFileSize, maxTotalSize: maxTotalSizeWm } =
        PLAN_LIMITS_WM[userPlan];

      if (bgFile.size > bgFileSize) {
        throw new ErrorResponse(
          `Maximum background file size for ${userPlan} plan is ${bytesToMB(
            bgFileSize
          )}MB`,
          413
        );
      }

      if (watermarkFile.size > maxTotalSizeWm) {
        throw new ErrorResponse(
          `Maximum watermark file size for ${userPlan} plan is ${bytesToMB(
            maxTotalSizeWm
          )}MB`,
          413
        );
      }
    }
    // Regularni upload slučaj
    else {
      const files = req.files as Express.Multer.File[];

      if (files.length > maxFiles) {
        throw new ErrorResponse(
          `Maximum ${maxFiles} files allowed for ${userPlan} plan`,
          403
        );
      }

      const hasOversizedFile = files.some((item) => item.size > maxTotalSize);
      if (hasOversizedFile) {
        throw new ErrorResponse(
          `Maximum file size for ${userPlan} plan is ${bytesToMB(
            maxTotalSize
          )}MB`,
          413
        );
      }
    }

    next();
  } catch (error) {
    console.error("Upload limiter error:", error);
    next(error);
  }
};
