import { createTransport } from "nodemailer";
import "dotenv/config";
import ErrorResponse from "./CustomErrorResponse.js";
export async function sendEmail(options) {
    const transporter = createTransport({
        host: process.env.EMAIL_SERVICE,
        port: 587,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
        return info;
    }
    catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
}
