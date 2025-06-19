import { ResponseApiType } from "../types/apiTypes";
import { axiosInstance } from "./axiosInstance";

export const compressImage = async (
  data: FormData
): Promise<ResponseApiType | undefined> => {
  try {
    const response = await axiosInstance.post("/compress-images", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
