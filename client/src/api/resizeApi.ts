import axios, { AxiosError } from "axios";
import { ResponseApiType } from "../types/apiTypes";
import { axiosInstance } from "./axiosInstance";

export const resizeImage = async (
  data: FormData
): Promise<ResponseApiType | undefined> => {
  try {
    const response = await axiosInstance.post("/resize", data);
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
