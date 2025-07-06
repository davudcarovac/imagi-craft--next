import axios, { AxiosError } from "axios";
import { axiosInstance } from "../axiosInstance";
import { RemoveProfilePictureResponse } from "@/types/apiTypes";

export const removeProfileImage =
  async (): Promise<RemoveProfilePictureResponse> => {
    try {
      const response = await axiosInstance.post<RemoveProfilePictureResponse>(
        "/remove-profile-image",
        {},
        { withCredentials: true }
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
