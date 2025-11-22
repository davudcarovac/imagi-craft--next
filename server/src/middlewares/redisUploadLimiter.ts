import type { NextFunction, Request, Response, Express } from "express";
import jwt from "jsonwebtoken";

import ErrorResponse from "../utils/CustomErrorResponse.js";
import { PLAN_LIMITS, PLAN_LIMITS_WM } from "../utils/planLimits.js";
import { bytesToMB } from "../utils/bytesToMb.js";
import redisClient from "../config/redis.ts";

const JWT_SECRET = process.env.JWT_SECRET || "secr3t";

export const uploadLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const action = req.body.action;
    const token = req.cookies.auth_token;

    if (!req.files) {
      throw new ErrorResponse("No files were uploaded.", 400);
    }

    // Default plan ako nema tokena
    let userPlan: keyof typeof PLAN_LIMITS = "STARTER";
    let userId = "guest";

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      userId = decoded.id;
      userPlan = decoded.plan as keyof typeof PLAN_LIMITS;
    }

    const limits = PLAN_LIMITS[userPlan];
    if (!limits) {
      throw new ErrorResponse("Invalid user plan", 403);
    }

    // ----------- REDIS DAILY COUNT + SIZE KEY -------------
    const today = new Date().toISOString().split("T")[0];

    const redisFilesKey = `daily_files:${userId}:${today}`;
    const redisSizeKey = `daily_size:${userId}:${today}`;

    let currentFileCount = parseInt(
      (await redisClient.get(redisFilesKey)) || "0"
    );
    let currentSize = parseInt((await redisClient.get(redisSizeKey)) || "0");

    // ============= WATERMARK UPLOAD ======================
    if (action === "watermark") {
      const wmFiles = req.files as {
        files?: Express.Multer.File[];
        file?: Express.Multer.File[];
      };

      if (!wmFiles.files || !wmFiles.files[0]) {
        throw new ErrorResponse("Background image is required", 400);
      }
      if (!wmFiles.file || !wmFiles.file[0]) {
        throw new ErrorResponse("Watermark image is required", 400);
      }

      const bgFile = wmFiles.files[0];
      const watermarkFile = wmFiles.file[0];

      const wmLimits = PLAN_LIMITS_WM[userPlan];

      // --- single-file limits (kao u tvojoj originalnoj funkciji)
      if (bgFile.size > wmLimits.bgFileSize) {
        throw new ErrorResponse(
          `Max background image size for ${userPlan} is ${bytesToMB(
            wmLimits.bgFileSize
          )}MB`,
          413
        );
      }

      if (watermarkFile.size > wmLimits.maxTotalSize) {
        throw new ErrorResponse(
          `Max watermark image size for ${userPlan} is ${bytesToMB(
            wmLimits.maxTotalSize
          )}MB`,
          413
        );
      }

      // --- REDIS TRACKING (dnevno)
      const uploadBytes = bgFile.size + watermarkFile.size;
      const newDailyTotal = currentSize + uploadBytes;

      // Samo ako želiš dnevni watermark limit → koristi PLAN_LIMITS.maxTotalSize (tvoj maxTotalSize)
      if (newDailyTotal > limits.maxTotalSize * limits.maxFiles) {
        throw new ErrorResponse(
          `Daily WM upload limit exceeded for ${userPlan} plan`,
          403
        );
      }

      // Upis u redis
      await redisClient.incrby(redisFilesKey, 2);
      await redisClient.incrby(redisSizeKey, uploadBytes);

      if (currentFileCount === 0) {
        await redisClient.expire(redisFilesKey, 86400);
        await redisClient.expire(redisSizeKey, 86400);
      }

      return next();
    }

    // ============= NORMAL UPLOAD =========================

    const files = req.files as Express.Multer.File[];

    // --- single-request max files (tvoja postojeća logika)
    if (files.length > limits.maxFiles) {
      throw new ErrorResponse(
        `Maximum ${limits.maxFiles} files allowed for ${userPlan} plan`,
        403
      );
    }

    // --- single-file max size (tvoja postojeća logika)
    const oversized = files.some((f) => f.size > limits.maxTotalSize);
    if (oversized) {
      throw new ErrorResponse(
        `Maximum file size for ${userPlan} plan is ${bytesToMB(
          limits.maxTotalSize
        )}MB`,
        413
      );
    }

    // --- REDIS DAILY tracking ---
    const totalUploadBytes = files.reduce((acc, f) => acc + f.size, 0);

    const newFileCount = currentFileCount + files.length;
    const newSizeTotal = currentSize + totalUploadBytes;

    // Ograniči dnevni broj fajlova = maxFiles
    if (newFileCount > limits.maxFiles) {
      throw new ErrorResponse(
        `Daily file upload limit of ${limits.maxFiles} exceeded for ${userPlan} plan`,
        403
      );
    }

    // Dnevna ukupna veličina = maxTotalSize * maxFiles
    const dailyLimitBytes = limits.maxFiles * limits.maxTotalSize;

    if (newSizeTotal > dailyLimitBytes) {
      throw new ErrorResponse(
        `Daily total upload size limit exceeded for ${userPlan} plan`,
        403
      );
    }

    // Zapiši u Redis
    await redisClient.incrby(redisFilesKey, files.length);
    await redisClient.incrby(redisSizeKey, totalUploadBytes);

    if (currentFileCount === 0) {
      await redisClient.expire(redisFilesKey, 86400);
      await redisClient.expire(redisSizeKey, 86400);
    }

    next();
  } catch (error) {
    console.error("Upload limiter error:", error);
    next(error);
  }
};
