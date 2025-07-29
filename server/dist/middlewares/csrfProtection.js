import ErrorResponse from "../utils/CustomErrorResponse.js";
import crypto from "crypto";
const generateCsrfToken = () => crypto.randomBytes(32).toString("hex");
export const csrfProtection = (req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        const token = generateCsrfToken();
        console.log("Get token ===> ", token);
        res.cookie("XSRF-TOKEN", token, {
            secure: true, // HTTPS only (obavezno za Render)
            sameSite: "none", // Dozvoli cross-site (Vercel ↔ Render)
            httpOnly: false, // Dozvoli čitanje u JS (axios mora da vidi cookie)
            domain: "frosty-image-server.onrender.com", // Eksplicitno navedi Render domen
            path: "/",
            maxAge: 24 * 60 * 60 * 1000, // 24h
        });
        return next();
    }
    const csrfCookie = req.cookies["XSRF-TOKEN"];
    const csrfHeader = req.headers["x-xsrf-token"];
    console.log("csrf cookie => ", csrfCookie);
    console.log("csrf header => ", csrfHeader);
    // console.log(csrfCookie, csrfCookie === csrfHeader);
    if (!csrfCookie || csrfCookie !== csrfHeader) {
        throw new ErrorResponse("CSRF token invalid or missing", 403);
    }
    next();
};
