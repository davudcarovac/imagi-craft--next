import axios, { AxiosError } from "axios";
import { ResponseApiType } from "../types/apiTypes";
import { axiosInstance } from "./axiosInstance";

export const collageImage = async (
  collageData: FormData
): Promise<
  | (ResponseApiType & {
      message: string;
      dimensions: { width: number; height: number };
    })
  | undefined
> => {
  try {
    const response = await axiosInstance.post("/collage", collageData);
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
