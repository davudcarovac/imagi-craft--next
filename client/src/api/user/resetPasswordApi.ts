import axios, { AxiosError } from "axios";
import { ResetPasswordResponse, ResetPasswordUserData } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";

export const resetPasswordUser = async (
  data: ResetPasswordUserData
): Promise<ResetPasswordResponse> => {
  try {
    const response = await axiosInstance.post<ResetPasswordResponse>(
      `/reset-password/${data.resetToken}`,
      {
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message?: string }>;
      const message = err.response?.data?.message || "Reset password failed";
      throw new Error(message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
