import axios, { AxiosError } from "axios";
import { axiosInstance } from "../axiosInstance";

export const uploadProfileImage = async (data: FormData) => {
  try {
    const response = await axiosInstance.post("/upload-profile-image", data, {
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
