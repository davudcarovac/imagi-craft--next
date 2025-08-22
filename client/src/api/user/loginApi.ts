import axios, { AxiosError } from "axios";
import { LoginResponse, LoginUserData } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";
import { getCsrfToken } from "./csrfTokenApi";

export const loginUser = async (
  data: LoginUserData
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/login", data, {
      withCredentials: true,
    });

    await getCsrfToken();

    return response.data;
  } catch (error: unknown) {
    console.log("Login error ===> ", error);
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ error?: string; message?: string }>;
      throw err.response?.data ?? { error: "Unknown error" };
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
