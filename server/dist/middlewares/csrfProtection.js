import ErrorResponse from "../utils/CustomErrorResponse.js";
import { generateCsrfToken } from "../utils/generateCsrfToken.js";
export const csrfProtection = (req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        const csrfToken = generateCsrfToken();
        res.cookie("XSRF-TOKEN", csrfToken, {
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            httpOnly: false,
            domain: process.env.NODE_ENV === "production"
                ? "https://www.frostyimage.com"
                : "localhost",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return next(); // Dodajte `return` ovde kao dobru praksu
    }
    const tokenInHeader = req.headers["x-csrf-token"];
    const tokenInCookie = req.cookies["XSRF-TOKEN"];
    console.log("from headers => ", tokenInHeader);
    console.log("from cookies => ", tokenInCookie);
    if (!tokenInCookie || tokenInCookie !== tokenInHeader) {
        return res.status(403).json({ error: "CSRF token invalid or missing" }); // Ključno: `return`
    }
    next();
};
