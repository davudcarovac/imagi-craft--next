import type { Request, Response, NextFunction } from "express";
import { pool } from "../config/db.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import prisma from "../lib/prisma.ts";
import ErrorResponse from "../utils/CustomErrorResponse.ts";
import { z } from "zod";
import { comparePasswords } from "../utils/comparePasswords.ts";

const JWT_SECRET = process.env.JWT_SECRET || "secr3t";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

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

    res.status(201).json({
      success: true,
      message: "User created!",
      token: token,
      user: user,
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

    if (!email) {
      throw new ErrorResponse("Email is required field", 400);
    }
    if (!password) {
      throw new ErrorResponse("Password is required field", 400);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new ErrorResponse("User does not exist", 400);

    const passwordMatching = await comparePasswords(password, user.password);
    if (!passwordMatching) {
      throw new ErrorResponse("Incorrect password", 400);
    }

    const token = createToken(user.id);

    res.status(200).json({
      sucess: true,
      message: "Logged in",
      token,
      user: user,
    });
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
