import jwt, {} from "jsonwebtoken";
import "dotenv/config";
import prisma from "../lib/prisma.js";
import ErrorResponse from "../utils/CustomErrorResponse.js";
const JWT_SECRET = process.env.JWT_SECRET || "secr3t";
export const verifyToken = async (req, res, next) => {
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
        if (!token) {
            throw new ErrorResponse("Request is not authorized", 401);
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });
        // console.log("user from verify ===> ", user);
        if (!user) {
            throw new ErrorResponse("No user found", 400);
        }
        req.userData = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            error: "Request is not authorized.",
        });
    }
};
