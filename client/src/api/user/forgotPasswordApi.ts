import axios, { AxiosError } from "axios";
import { ForgotPasswordResponse } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";

export const forgotPasswordUser = async (data: {
  email: string;
}): Promise<ForgotPasswordResponse> => {
  try {
    const response = await axiosInstance.post<ForgotPasswordResponse>(
      "/forgot-password",
      data
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ error?: string; message?: string }>;
      throw err.response?.data ?? { error: "Unknown error" };
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
