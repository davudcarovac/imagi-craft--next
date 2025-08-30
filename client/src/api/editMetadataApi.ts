import axios, { AxiosError } from "axios";
import { EditMetadataResponse } from "../types/apiTypes";
import { axiosInstance } from "./axiosInstance";

export const editMetadata = async (
  data: FormData
): Promise<EditMetadataResponse | undefined> => {
  try {
    const response = await axiosInstance.post("/edit-metadata", data);
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
