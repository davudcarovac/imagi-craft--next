import crypto from "crypto";

const secret = process.env.CSRF_TOKEN_SECRET;

export const hashCsrfToken = (token: string) => {
  return crypto
    .createHmac("sha256", secret as string)
    .update(token)
    .digest("hex");
};
