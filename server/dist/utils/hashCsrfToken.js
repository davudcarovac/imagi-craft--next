import crypto from "crypto";
const secret = process.env.CSRF_TOKEN_SECRET;
export const hashCsrfToken = (token) => {
    return crypto
        .createHmac("sha256", secret)
        .update(token)
        .digest("hex");
};
