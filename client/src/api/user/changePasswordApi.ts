import axios, { AxiosError } from "axios";
import { ChangePasswordData, ChangePasswordResponse } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";
import { getCsrfToken } from "./csrfTokenApi";

export const changePasswordUser = async (
  data: ChangePasswordData
): Promise<ChangePasswordResponse> => {
  try {
    const response = await axiosInstance.post<ChangePasswordResponse>(
      "/change-password",
      data,
      {
        withCredentials: true,
      }
    );

    await getCsrfToken();

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
