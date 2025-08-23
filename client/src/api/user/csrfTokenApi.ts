import { GetCsrfTokenResponse } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";
import axios, { AxiosError } from "axios";

export const getCsrfToken = async (): Promise<GetCsrfTokenResponse> => {
  try {
    const response = await axiosInstance.get<GetCsrfTokenResponse>(
      "/csrf-token",
      {
        withCredentials: true,
      }
    );

    // console.log("csrf response ===> ", response);

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
