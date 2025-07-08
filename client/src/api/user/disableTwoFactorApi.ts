import { DisableTwoFactorResponse } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";
import axios, { AxiosError } from "axios";

export const disableTwoFactor = async (data: {
  currentPassword: string;
}): Promise<DisableTwoFactorResponse> => {
  try {
    const response = await axiosInstance.post("/2fa/disable", data, {
      withCredentials: true,
    });
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
