import ErrorResponse from "../utils/CustomErrorResponse.js";
import crypto from "crypto";
const generateCsrfToken = () => crypto.randomBytes(32).toString("hex");
export const csrfProtection = (req, res, next) => {
    // Konfiguracija za cookie
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        const token = generateCsrfToken();
        console.log("Get token ===> ", token);
        res.cookie("XSRF-TOKEN", token, {
            secure: true, // mora biti true ako koristiš SameSite: 'none'
            sameSite: "none", // mora biti 'none' za cross-site
            httpOnly: false, // mora biti false ako želiš da čitaš iz document.cookie
            path: "/",
            maxAge: 48 * 60 * 60 * 1000,
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
