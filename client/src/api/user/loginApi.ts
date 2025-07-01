import axios, { AxiosError } from "axios";
import { LoginResponse, LoginUserData } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";

export const loginUser = async (
  data: LoginUserData
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/login", data);
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
