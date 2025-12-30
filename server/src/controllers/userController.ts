import type { Request, Response, NextFunction } from "express";
import { pool } from "../config/db.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import ErrorResponse from "../utils/CustomErrorResponse.ts";
import { z } from "zod";
import { comparePasswords } from "../utils/comparePasswords.ts";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.ts";
import geoip from "geoip-lite";
import cloudinary from "../config/cloudinary.ts";
import prisma from "../lib/prisma.ts";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import type { User } from "@prisma/client";
import { generateRefreshToken } from "../utils/refreshToken.ts";
import type { TokenPayload } from "../types/output.js";

const JWT_SECRET = process.env.JWT_SECRET || "secr3t";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "secr3tTkn";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const NODE_ENV = process.env.NODE_ENV;

const createToken = (userId: string, plan: string) => {
  return jwt.sign({ userId, plan }, JWT_SECRET, { expiresIn: "1d" });
};

export const registerSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(4, "Name must be at least 4 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function getCsrfToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res
    .status(200)
    .json({ success: true, message: "Token set in cookies" });
}

export async function signupUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ errors: validation.error.format() });
    return;
  }

  const { email, password, name, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword)
      throw new ErrorResponse("Passwords do not match", 400);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new ErrorResponse("User already registred", 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + 60 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        isVerified: false,
        verificationToken: verificationToken,
        verificationExpires: verificationExpires,
      },
    });

    const verifyEmailURL = `${
      NODE_ENV === "development" ? "http://localhost:3000" : process.env.DOMAIN
    }/verify-email?vtoken=${user.verificationToken}`;
    const message = `
      <h1>You have requested a email verification</h1>
      <p>Click the link below to verify your email:</p>
      <a href="${verifyEmailURL}" target="_blank">${verifyEmailURL}</a>
    `;

    await sendEmail({
      to: user.email,
      subject: "Email verification",
      text: message,
    });

    res.status(201).json({
      success: true,
      email: user.email,
      message: "Account created! Email verification sent, check email.",
    });
    // const refreshToken = generateRefreshToken(user.id, user.plan)

    //     res.cookie("refresh_token", refreshToken, {
    //       httpOnly: true,
    //       secure: NODE_ENV === "production",
    //         sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // ✅ 'lax' lokalno, da ne blokira testove
    //       // sameSite: "strict",
    //     maxAge: 7 * 24 * 60 * 60, // 7 dana ✅
    //     });

    //     const token = createToken(user.id, user.plan);

    //     res.cookie("auth_token", token, {
    //       httpOnly: true,
    //       secure: NODE_ENV === "production",
    //       sameSite: "strict",
    //       maxAge: 24 * 60 * 60 * 1000,
    //     });

    //     const safeUser = {
    //       id: user.id,
    //       email: user.email,
    //       name: user.name,
    //       plan: user.plan,
    //       planExpires: user.planExpires,
    //       createdAt: user.createdAt,
    //       updatedAt: user.updatedAt,
    //       role: user.role,
    //       profileImage: user.profileImage,
    //     };

    //     res.status(201).json({
    //       success: true,
    //       message: "User created!",
    //       // token: token,
    //       user: safeUser,
    //     });
  } catch (error) {
    next(error);
  }
}



export async function resendVerificationEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;

    console.log(email);

    if (!email) {
      throw new ErrorResponse("Please provide an email address.", 400);
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new ErrorResponse("User with this email does not exist.", 404);
    }

    if (user.isVerified) {
      throw new ErrorResponse("This account is already verified.", 400);
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken: verificationToken,
        verificationExpires,
      },
    });

    const domain =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.DOMAIN;

    const verifyEmailURL = `${domain}/verify-email?vtoken=${verificationToken}`;

    const htmlMessage = `
      <h1>Email Verification</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${verifyEmailURL}" target="_blank">${verifyEmailURL}</a>
      <p>This link will expire in 1 hour.</p>
    `;

    await sendEmail({
      to: user.email,
      subject: "Verify Your Email Address",
      text: htmlMessage,
    });

    res.status(200).json({
      success: true,
      message: "Verification email resent. Please check your inbox.",
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { verificationToken } = req.body;

    if (!verificationToken) {
      throw new ErrorResponse("Verification token is not provided", 400);
    }
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: verificationToken,
        verificationExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new ErrorResponse("Invalid or expired verification token", 400);
    }

    if (user.isVerified) {
      res
        .status(200)
        .json({ success: true, message: "Email already verified" });
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationExpires: null,
      },
    });

    res.status(200).json({ success: true, message: "Email verified!" });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    if (!email) throw new ErrorResponse("Email is required", 400);
    if (!password) throw new ErrorResponse("Password is required", 400);

    const user = await prisma.user.findUnique({ where: { email } });

    // console.log("User ===> ", user);
    if (!user) throw new ErrorResponse("User not found", 404);

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) throw new ErrorResponse("Invalid credentials", 401);

    if (!user.isVerified) {
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const verificationExpires = new Date(Date.now() + 60 * 60 * 1000);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          verificationToken,
          verificationExpires,
        },
      });

      const verifyEmailURL = `${
        NODE_ENV === "development"
          ? "http://localhost:3000"
          : process.env.DOMAIN
      }/verify-email?vtoken=${verificationToken}`;
      const message = `
      <h1>You have requested a email verification</h1>
      <p>Click the link below to verify your email:</p>
      <a href="${verifyEmailURL}" target="_blank">${verifyEmailURL}</a>
    `;

      await sendEmail({
        to: user.email,
        subject: "Email verification",
        text: message,
      });

      res
        .status(403)
        .json({ message: "Email not verified, verification mail sent" });
      return;
    }

    // console.log(user);

    if (user.twoFactorEnabled) {
      res.status(200).json({
        success: true,
        message: "2FA required",
        twoFactor: true,
        userId: user.id,
      });

      return;
    }

    const refreshToken = generateRefreshToken(user.id, user.plan);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // 'lax' samo lokalno
      // sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const authToken = createToken(user.id, user.plan);
    res.cookie("auth_token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      domain:
        process.env.NODE_ENV === "production"
          ? ".frostyimage.com"
          : "localhost",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      plan: user.plan,
      planExpires: user.planExpires,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
      profileImage: user.profileImage,
      twoFactorEnabled: user.twoFactorEnabled,
    };

    // console.log("login token ==> ", authToken);

    res.status(200).json({
      success: true,
      message: "Logged in",
      // token: authToken,
      user: safeUser,
    });
  } catch (error) {
    console.log("Login error ===> ", error);
    next(error);
  }
}

export async function getRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tokenFromCookies = req.cookies.refresh_token;

    if (!tokenFromCookies) {
      throw new ErrorResponse("No refresh token found", 401);
    }

    const decoded = jwt.verify(
      tokenFromCookies,
      JWT_REFRESH_SECRET
    ) as TokenPayload;

    if (!decoded) {
      throw new ErrorResponse("Invalid refresh token", 400);
    }

    const newAccessToken = createToken(decoded.userId, decoded.plan);

    console.log("user id, plan ===> ", decoded.userId, decoded.plan);
    console.log("Novi token ===> ", newAccessToken);

    res.status(200).json({
      message: "Access token generated!",
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
}

export async function logoutUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      domain:
        process.env.NODE_ENV === "production"
          ? ".frostyimage.com"
          : "localhost",
      path: "/",
    });

    res.clearCookie("csrf-token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.clearCookie("csrf-token-client", {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      domain:
        process.env.NODE_ENV === "production"
          ? ".frostyimage.com"
          : "localhost",
    });

    return res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    next(error);
  }
}

interface UserWithResetFields {
  resetPasswordToken?: string | null;
  resetPasswordExpire?: Date | null;
}

export function generateResetPasswordToken(user: UserWithResetFields) {
  const resetToken = crypto.randomBytes(20).toString("hex");

  const hashedResetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedResetPasswordToken;
  user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minuta od sada

  return resetToken;
}

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;
  let user: User | null = null;

  try {
    user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new ErrorResponse("No user found with this email address.", 404);
    }

    const userWithResetFields = {
      ...user,
      resetPasswordToken: null,
      resetPasswordExpire: null,
    };

    const resetPasswordToken = generateResetPasswordToken(userWithResetFields);

    console.log(" Token iz forgot pass ===> ", resetPasswordToken);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: userWithResetFields.resetPasswordToken,
        resetPasswordExpire: userWithResetFields.resetPasswordExpire,
      },
    });

    const resetURL = `${
      NODE_ENV === "development" ? "http://localhost:3000" : process.env.DOMAIN
    }/reset-password/${resetPasswordToken}`;
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetURL}" target="_blank">${resetURL}</a>
    `;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    res.status(200).json({
      success: true,
      message:
        "If an account with that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    if (user) {
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            resetPasswordToken: null,
            resetPasswordExpire: null,
          },
        });
      } catch (cleanupError) {
        console.error("Failed to clean up reset token:", cleanupError);
      }
    }

    next(error);
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { newPassword, confirmNewPassword } = req.body;
  const { resetToken } = req.params;
  try {
    if (!resetToken) {
      throw new ErrorResponse("Reset token is missing", 400);
    }

    console.log("Token from params ===> ", resetToken);

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // console.log("Ulazni reset token", resetToken);
    // console.log("Izlazni reset token", resetPasswordToken);

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      throw new ErrorResponse("Invalid token", 400);
    }

    if (confirmNewPassword !== confirmNewPassword) {
      throw new ErrorResponse("Password does not match", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedNewPassword,
        resetPasswordToken: null,
        resetPasswordExpire: null,
      },
    });

    const token = createToken(user?.id!, user.plan);

    res.status(200).json({
      success: true,
      token,
      message: "Password updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const { email } = req.userData;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    const match = await comparePasswords(currentPassword, user?.password!);
    if (!match) {
      throw new ErrorResponse("Incorrect current password", 400);
    }

    if (newPassword !== confirmNewPassword) {
      throw new ErrorResponse("Passwords do not match", 400);
    }

    if (!user) {
      throw new ErrorResponse("User not found", 400);
    }

    const isSamePassword = await comparePasswords(newPassword, user.password);
    if (isSamePassword) {
      throw new ErrorResponse(
        "The new password cannot be the same as the current password",
        400
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user?.id },
      data: {
        password: hashedNewPassword,
      },
    });

    const newToken = createToken(user.id, user.plan);

    res.cookie("auth_token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      domain:
        process.env.NODE_ENV === "production"
          ? ".frostyimage.com"
          : "localhost",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({ success: true, message: "Password changed" });
  } catch (error) {
    next(error);
  }
}

function getClientIp(req: Request): string {
  // prvo pokušaj x-real-ip (Vercel)
  let ip =
    req.headers["x-real-ip"]?.toString() ||
    req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
    req.socket?.remoteAddress ||
    null;

  // fallback za lokalni dev a na produkciji uzima korisnikov ip
  if (!ip || ip === "::1" || ip === "127.0.0.1") {
    ip = "93.86.114.32"; // test IP Srbija
  }

  return ip;
}

export async function getGeo(req: Request, res: Response, next: NextFunction) {
  try {
    const ip = getClientIp(req);

    const geo = geoip.lookup(ip);

    if (!geo) {
      throw new ErrorResponse("Location not found", 400);
    }

    res.status(200).json({
      ip,
      country: geo.country,
      region: geo.region,
      city: geo.city,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.userData;
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      throw new ErrorResponse("User not found", 400);
    }

    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      plan: user.plan,
      planExpires: user.planExpires,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
      profileImage: user.profileImage,
      twoFactorEnabled: user.twoFactorEnabled,
    };

    res
      .status(200)
      .json({ sucess: true, message: "User sent!", user: safeUser });
  } catch (error) {
    next(error);
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const result = pool.query('SELECT * FROM "user"');
    res.status(200).json({
      success: true,
      message: "Successfully fetch user",
      result: (await result).rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function removeImage(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { profileImage: true, profileImagePublicId: true },
    });

    if (!user) {
      throw new ErrorResponse("No user found", 400);
    }
    console.log(user.profileImagePublicId);
    if (user?.profileImagePublicId) {
      const result = await cloudinary.uploader.destroy(
        user?.profileImagePublicId
      );

      if (result.result === "ok") {
        await prisma.user.update({
          where: { id: userId },
          data: {
            profileImage: null,
            profileImagePublicId: null,
          },
        });
        return true; 
      }
      return false;
    }
  } catch (error) {
    console.error("Failed to remove image:", error);

    throw new ErrorResponse("Image remove failed", 404);
  }
}

export async function removeProfileImg(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userData.id;
    const removedPicture = await removeImage(userId);

    if (removedPicture) {
      res.status(200).json({
        success: true,
        message: "Your profile image has been deleted.",
      });
    } else {
      throw new ErrorResponse("Profile picture removal failed", 400);
    }
  } catch (error) {
    next(error);
  }
}

export async function uploadProfileImg(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userData.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { profileImage: true, profileImagePublicId: true },
    });

    if (!user) {
      throw new ErrorResponse("No user found", 400);
    }

    await removeImage(userId);

    const imageFile = req.file;
    if (!imageFile) {
      throw new ErrorResponse("No image uploaded", 400);
    }

    const base64 = `data:${
      imageFile.mimetype
    };base64,${imageFile.buffer.toString("base64")}`;

    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "frosty-image-profile-photos",
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        profileImage: uploadResult.secure_url,
        profileImagePublicId: uploadResult.public_id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Your new profile image has been saved.",
      imageUrl: uploadResult.secure_url,
    });
  } catch (error) {
    next(error);
  }
}

export async function changeUsername(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.userData;
  const { newName } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        name: true,
      },
    });

    if (!user) {
      throw new ErrorResponse("User not found", 400);
    }

    if (!newName) {
      throw new ErrorResponse("Enter value for new name", 400);
    }

    if (newName === user.name) {
      throw new ErrorResponse("Enter different name", 400);
    }

    await prisma.user.update({
      where: { id: id },
      data: {
        name: newName,
      },
    });

    res.status(200).json({ success: true, message: "Name changed" });
  } catch (error) {
    next(error);
  }
}

export async function setupTwoFactor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.userData;
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      throw new ErrorResponse("No user found", 400);
    }

    const secret = speakeasy.generateSecret({
      name: `Frosty image (${user?.email}) `,
    });

    await prisma.user.update({
      where: { id: id },
      data: { twoFactorSecret: secret.base32 },
    });

    if (!secret.otpauth_url) {
      throw new ErrorResponse("Otpauth is not generated", 400);
    }

    QRCode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
      if (err) throw new ErrorResponse("Qr code error", 500);

      res.json({
        success: true,
        message: "Qr code has been generated",
        qrCode: dataUrl,
      });
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyEnableTwoFactor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.userData;
  const { token, currentPassword } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      throw new ErrorResponse("User not found", 400);
    }

    if (!user.twoFactorSecret) {
      throw new ErrorResponse("This user has no token", 400);
    }

    if (!currentPassword) {
      throw new ErrorResponse("Please provide password", 400);
    }

    const isMatch = await comparePasswords(currentPassword, user.password);

    if (!isMatch) {
      throw new ErrorResponse("Incorrect password", 400);
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) {
      throw new ErrorResponse("Invalid code", 400);
    }

    await prisma.user.update({
      where: { id: id },
      data: { twoFactorEnabled: true },
    });

    res.status(200).json({
      success: true,
      message: "Two factor enabled",
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyLoginTwoFactor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token, id } = req.body;

  try {
    if (!token) {
      throw new ErrorResponse("Code is missing", 400);
    }

    if (!id) {
      throw new ErrorResponse("User id is missing", 400);
    }

    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      throw new ErrorResponse("No user found", 400);
    }

    if (!user.twoFactorEnabled) {
      throw new ErrorResponse("Two factor is not set", 400);
    }

    if (!user.twoFactorSecret) {
      throw new ErrorResponse("Two factor secret is missing", 400);
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) {
      throw new ErrorResponse("Invalid code", 400);
    }

    const authToken = createToken(user.id, user.plan);

    res.cookie("auth_token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      plan: user.plan,
      planExpires: user.planExpires,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
      profileImage: user.profileImage,
    };

    res
      .status(200)
      .json({ success: true, message: "Logged in with 2FA", user: safeUser });
  } catch (error) {
    next(error);
  }
}

export async function disableTwoFactor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.userData;
  const { currentPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new ErrorResponse("User not found", 400);
    }

    const isMatch = await comparePasswords(currentPassword, user.password);
    if (!isMatch) {
      throw new ErrorResponse("Incorrect password", 400);
    }

    if (!user.twoFactorEnabled) {
      throw new ErrorResponse(
        "Two-Factor Authentication is already disabled",
        400
      );
    }

    await prisma.user.update({
      where: { id: id },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Two factor authentication disabled" });
  } catch (error) {
    next(error);
  }
}

export async function removeTokens(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.auth_token;
  console.log("Prije => ", token);
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    domain: process.env.DOMAIN || "localhost",
  });

  console.log("Posle => ", token);

  res.status(200).json({ success: true, message: "token removed" });
}
