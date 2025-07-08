import { SetupTwoFactorResponse } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";
import axios, { AxiosError } from "axios";

export const setupTwoFactor = async (): Promise<SetupTwoFactorResponse> => {
  try {
    const response = axiosInstance.post<SetupTwoFactorResponse>(
      "/2fa/setup",
      {},
      {
        withCredentials: true,
      }
    );
    return (await response).data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ error?: string; message?: string }>;
      throw err.response?.data ?? { error: "Unknown error" };
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
