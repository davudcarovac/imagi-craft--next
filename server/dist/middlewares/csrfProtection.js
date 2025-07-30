import ErrorResponse from "../utils/CustomErrorResponse.js";
import { generateCsrfToken } from "../utils/generateCsrfToken.js";
export const csrfProtection = (req, res, next) => {
    if (!req.session) {
        throw new ErrorResponse("Session not initialized", 500);
    }
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        const csrfToken = generateCsrfToken();
        req.session.csrfToken = csrfToken;
        req.session.save((err) => {
            if (err) {
                return next(new ErrorResponse("Failed to save session", 500));
            }
        });
        return res.status(200).json({
            success: true,
            message: "Csrf token set in session",
            csrfToken: csrfToken,
        });
    }
    const tokenInHeader = req.headers["x-csrf-token"];
    const tokenInSession = req.session.csrfToken;
    console.log("session  => ", req.session);
    console.log("token in header => ", tokenInHeader);
    console.log("token in session => ", tokenInSession);
    if (!tokenInHeader || tokenInHeader !== tokenInSession) {
        throw new ErrorResponse("Csrf token invalid or missing", 403);
    }
    next();
};
