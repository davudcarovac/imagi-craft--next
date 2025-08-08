import { PLAN_LIMITS, PLAN_LIMITS_WM } from "../utils/planLimits.js";
import ErrorResponse from "../utils/CustomErrorResponse.js";
import jwt, {} from "jsonwebtoken";
import "dotenv/config";
import { bytesToMB } from "../utils/bytesToMb.js";
const JWT_SECRET = process.env.JWT_SECRET || "secr3t";
export const uploadLimiter = async (req, res, next) => {
    const token = req.cookies.auth_token;
    let userPlan = "STARTER";
    try {
        // if (!token) {
        //   throw new ErrorResponse("Request is not authorized", 401);
        // }
        if (token) {
            const decoded = jwt.verify(token, JWT_SECRET);
            if (!PLAN_LIMITS[userPlan]) {
                throw new ErrorResponse("Invalid user plan", 403);
            }
            userPlan = decoded.plan;
        }
        const { maxFiles, maxTotalSize } = PLAN_LIMITS[userPlan];
        const { bgFileSize, maxTotalSize: maxTotalSizeWm } = PLAN_LIMITS_WM[userPlan];
        const files = req.files;
        if (files && files.length > maxFiles) {
            throw new ErrorResponse(`Maximum ${maxFiles} files allowed for ${userPlan} plan`, 403);
        }
        const hasOversizedFile = files?.some((item) => item.size > maxTotalSize);
        if (hasOversizedFile) {
            throw new ErrorResponse(`Maximum file size for ${userPlan} plan is ${bytesToMB(maxTotalSize)}MB`, 413);
        }
        console.log(PLAN_LIMITS[userPlan]);
        console.log(PLAN_LIMITS_WM[userPlan]);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
