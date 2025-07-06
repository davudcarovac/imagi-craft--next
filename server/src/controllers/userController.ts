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

const JWT_SECRET = process.env.JWT_SECRET || "secr3t";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const NODE_ENV = process.env.NODE_ENV;

const createToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "3d" });
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

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = createToken(user.id);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 dan
    });

    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      isPremium: user.ispremium,
      premiumExpires: user.premiumexpires,
      createdAt: user.createdat,
      updatedAt: user.updatedat,
      role: user.role,
      profileImage: user.profileImage,
    };

    res.status(201).json({
      success: true,
      message: "User created!",
      // token: token,
      user: safeUser,
    });
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
    if (!user) throw new ErrorResponse("User not found", 404);

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) throw new ErrorResponse("Invalid credentials", 401);

    const authToken = createToken(user.id);
    res.cookie("auth_token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      isPremium: user.ispremium,
      premiumExpires: user.premiumexpires,
      createdAt: user.createdat,
      updatedAt: user.updatedat,
      role: user.role,
      profileImage: user.profileImage,
    };

    res.status(200).json({
      success: true,
      message: "Logged in",
      // token: authToken,
      user: safeUser,
    });
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
  let user = null;

  try {
    // 1. Nađi korisnika
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

    const resetURL = `http://localhost:3000/reset-password/${resetPasswordToken}`;
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

    const token = createToken(user?.id!);

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
        "Nova lozinka ne može biti ista kao trenutna",
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

    const token = createToken(user.id);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ success: true, message: "Password changed", token: token });
  } catch (error) {
    next(error);
  }
}

export async function logoutUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    domain: process.env.DOMAIN || "localhost",
  });
  res.json({ success: true, message: "Logged out" });
}

export async function getCsrfToken(req: Request, res: Response) {
  res.status(200).json({ status: "CSRF token set in cookies." });
}

export async function getGeo(req: Request, res: Response, next: NextFunction) {
  try {
    let ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.socket?.remoteAddress ||
      null;

    if (!ip) {
      throw new ErrorResponse("Ip not available", 400);
    }

    if (!ip || ip === "::1" || ip === "127.0.0.1") {
      ip = "93.86.114.32"; // ili neka IP iz Srbije npr. "93.86.114.32"
    }

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
      isPremium: user.ispremium,
      premiumExpires: user.premiumexpires,
      createdAt: user.createdat,
      updatedAt: user.updatedat,
      role: user.role,
      profileImage: user.profileImage,
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

    if (user?.profileImagePublicId) {
      const result = await cloudinary.uploader.destroy(
        user?.profileImagePublicId
      );

      if (result.ok) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            profileImage: null,
            profileImagePublicId: null,
          },
        });
        return true; // uspešno obrisano
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
      message: "Upload successful",
      imageUrl: uploadResult.secure_url,
    });
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
