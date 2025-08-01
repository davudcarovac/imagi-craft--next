import ErrorResponse from "../utils/CustomErrorResponse.js";
import { generateCsrfToken } from "../utils/generateCsrfToken.js";
import { hashCsrfToken } from "../utils/hashCsrfToken.js";
export const csrfProtection = (req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        const csrfToken = generateCsrfToken();
        const csrfTokenHashed = hashCsrfToken(csrfToken);
        res.cookie("csrf-token", csrfTokenHashed, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });
        res.cookie("csrf-token-client", csrfToken, {
            httpOnly: false,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            domain: process.env.NODE_ENV === "production"
                ? ".frostyimage.com"
                : "localhost",
        });
        return next();
    }
    const tokenInCookie = req.cookies["csrf-token"];
    const tokenInHeader = req.headers["x-csrf-token"];
    console.log("from cookie => ", tokenInCookie);
    console.log("from headers => ", tokenInHeader);
    if (!tokenInHeader || !tokenInCookie) {
        throw new ErrorResponse("Missing CSRF token", 403);
    }
    const hashedTokenFromHeader = hashCsrfToken(tokenInHeader);
    if (hashedTokenFromHeader !== tokenInCookie) {
        throw new ErrorResponse("Invalid CSRF token", 403);
    }
    next();
};
