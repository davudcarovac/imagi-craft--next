import { getUserResponse } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";
import axios, { AxiosError } from "axios";

export const getUser = async (): Promise<getUserResponse> => {
  try {
    const response = await axiosInstance.get("/user", {
      withCredentials: true,
    });

    console.log(response);
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
