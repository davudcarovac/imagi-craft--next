import ErrorResponse from "../utils/CustomErrorResponse.js";
import crypto from "crypto";
const generateCsrfToken = () => crypto.randomBytes(32).toString("hex");
export const csrfProtection = (req, res, next) => {
    // Konfiguracija za cookie
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        console.log(process.env.NODE_ENV === "production", process.env.NODE_ENV === "production" ? "none" : "lax");
        const token = generateCsrfToken();
        console.log("Get token ===> ", token);
        res.cookie("XSRF-TOKEN", token, {
            // secure: process.env.NODE_ENV === "production",
            secure: false,
            // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            sameSite: "lax",
            httpOnly: false,
            path: "/",
            maxAge: 48 * 60 * 60 * 1000,
        });
        return next();
    }
    const csrfCookie = req.cookies["XSRF-TOKEN"];
    const csrfHeader = req.headers["x-xsrf-token"];
    console.log("headers ===> ", csrfHeader === "");
    console.log("csrf cookie => ", csrfCookie);
    console.log("csrf header => ", csrfHeader);
    // console.log(csrfCookie, csrfCookie === csrfHeader);
    if (!csrfCookie || csrfCookie !== csrfHeader) {
        throw new ErrorResponse("CSRF token invalid or missing", 403);
    }
    next();
};
