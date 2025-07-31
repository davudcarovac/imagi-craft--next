import axios, { AxiosError } from "axios";
import { LoginResponse, LoginUserData } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";
import { getCsrfToken } from "./csrfTokenApi";

export const loginUser = async (
  data: LoginUserData
): Promise<LoginResponse> => {
  try {
    const csrfTokenResponse = await getCsrfToken();
    console.log("csrf token response ===> ", csrfTokenResponse);

    const response = await axiosInstance.post<LoginResponse>(
      "/login",
      { ...data, csrfToken: csrfTokenResponse.csrfToken },
      {
        headers: {
          "x-csrf-token": csrfTokenResponse.csrfToken || "",
        },
        withCredentials: true,
      }
    );

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
