import { ChangeNameResponse } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";
import axios, { AxiosError } from "axios";

export const changeName = async (
  newName: string
): Promise<ChangeNameResponse> => {
  try {
    const response = await axiosInstance.post<ChangeNameResponse>(
      "/change-username",

      { newName: newName },
      {
        withCredentials: true,
      }
    );
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
