import axios, { AxiosError } from "axios";
import { axiosInstance } from "../axiosInstance";
import {
  ResendVerificationEmailData,
  ResendVerificationEmailResponse,
} from "@/types/apiTypes";

export const resendVerificationEmail = async (
  data: ResendVerificationEmailData
): Promise<ResendVerificationEmailResponse> => {
  try {
    const response = await axiosInstance.post<ResendVerificationEmailResponse>(
      "/resend-verification-email",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ error?: string; message?: string }>;
      throw err.response?.data ?? { error: "Unknown error" };
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
