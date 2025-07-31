import ErrorResponse from "../utils/CustomErrorResponse.js";
import { generateCsrfToken } from "../utils/generateCsrfToken.js";
export const csrfProtection = (req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        const csrfToken = generateCsrfToken();
        return res.status(200).json({
            success: true,
            message: "Csrf token sent",
            csrfToken: csrfToken,
        });
    }
    const { csrfToken: tokenInBody } = req.body;
    const tokenInHeader = req.headers["x-csrf-token"];
    // const tokenInCookie = req.cookies["XSRF-TOKEN"];
    console.log("from body => ", tokenInBody);
    console.log("from headers => ", tokenInHeader);
    if (!tokenInBody || tokenInBody !== tokenInHeader) {
        throw new ErrorResponse("CSRF token invalid or missing", 403);
    }
    next();
};
