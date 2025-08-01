import axios, { AxiosError } from "axios";
import { LoginResponse, LoginUserData } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";
import { getCsrfToken } from "./csrfTokenApi";
import { getCookie } from "@/utils/getCookie";

export const loginUser = async (
  data: LoginUserData
): Promise<LoginResponse> => {
  try {
    await getCsrfToken();
    const csrfToken = getCookie("csrf-token-client");

    console.log("from cookies ===> ", csrfToken);

    // console.log("csrf token response ===> ", csrfTokenResponse);

    const response = await axiosInstance.post<LoginResponse>("/login", data, {
      headers: {
        "x-csrf-token": csrfToken || "",
      },
      withCredentials: true,
    });

    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ error?: string; message?: string }>;
      throw err.response?.data ?? { error: "Unknown error" };
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
