import axios, { AxiosError } from "axios";
import { ExtractMetadataResponse } from "../types/apiTypes";
import { axiosInstance } from "./axiosInstance";

export const extractMetadataImage = async (
  data: FormData
): Promise<ExtractMetadataResponse | undefined> => {
  try {
    const response = await axiosInstance.post("/extract-metadata", data);
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
