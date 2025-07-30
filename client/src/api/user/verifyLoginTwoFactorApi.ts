import {
  VerifyLoginTwoFactorData,
  VerifyLoginTwoFactorResponse,
} from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";
import axios, { AxiosError } from "axios";
import { getCsrfToken } from "./csrfTokenApi";

export const verifyLoginTwoFactor = async (
  data: VerifyLoginTwoFactorData
): Promise<VerifyLoginTwoFactorResponse> => {
  try {
    const csrfTokenResponse = await getCsrfToken();

    const response = await axiosInstance.post("/2fa/verify-login", data, {
      headers: {
        "x-csrf-token": csrfTokenResponse.csrfToken || "",
      },
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
