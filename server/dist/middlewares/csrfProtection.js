import ErrorResponse from "../utils/CustomErrorResponse.js";
import crypto from "crypto";
const generateCsrfToken = () => crypto.randomBytes(32).toString("hex");
export const csrfProtection = (req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        const token = generateCsrfToken();
        res.cookie("XSRF-TOKEN", token, {
            secure: true,
            sameSite: "none",
            domain: ".frostyimage.com", // Dodajte tačku za poddomene
            httpOnly: false, // Da biste mogli da čitate sa frontenda
        });
        // Dodajte token u response body za dodatnu sigurnost
        return res.json({ csrfToken: token });
    }
    const csrfCookie = req.cookies["XSRF-TOKEN"];
    const csrfHeader = req.headers["x-xsrf-token"];
    console.log("cookie ===> ", csrfCookie);
    console.log("headers ===> ", csrfHeader);
    if (!csrfCookie || csrfCookie !== csrfHeader) {
        throw new ErrorResponse("CSRF token invalid or missing", 403);
    }
    next();
};
