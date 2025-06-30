import { createTransport, type SentMessageInfo } from "nodemailer";
import "dotenv/config";
import ErrorResponse from "./CustomErrorResponse.ts";

type OptionsType = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail(
  options: OptionsType
): Promise<SentMessageInfo> {
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
  } catch (error: any) {
    throw new ErrorResponse(error.message, 500);
  }
}
