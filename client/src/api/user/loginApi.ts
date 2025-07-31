import axios, { AxiosError } from "axios";
import { LoginResponse, LoginUserData } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";
import { getCsrfToken } from "./csrfTokenApi";
import { formatCsrfToken } from "@/utils/formatCsrfToken";

export const loginUser = async (
  data: LoginUserData
): Promise<LoginResponse> => {
  try {
    await getCsrfToken();
    // console.log("Token ===> ", csrfTokenResponse);

    const csrfToken = formatCsrfToken();
    console.log("Full cookies ===> ", document.cookie);

    const response = await axiosInstance.post<LoginResponse>("/login", data, {
      headers: {
        "x-csrf-token": csrfToken || "",
      },
      withCredentials: true,
    });

    // console.log(response.data);
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
