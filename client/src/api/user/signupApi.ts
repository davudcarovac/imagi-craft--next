import axios, { AxiosError } from "axios";
import { SignupResponse, SignupUserData } from "@/types/apiTypes";
import { axiosInstance } from "../axiosInstance";

export const signupUser = async (
  data: SignupUserData
): Promise<SignupResponse> => {
  try {
    const response = await axiosInstance.post<SignupResponse>("/signup", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message?: string }>;
      const message = err.response?.data?.message || "Signup failed";
      throw new Error(message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
