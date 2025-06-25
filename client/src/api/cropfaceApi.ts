import { ResponseApiType } from "../types/apiTypes";
import { axiosInstance } from "./axiosInstance";

export const cropfaceImage = async (
  cropfaceData: FormData
): Promise<ResponseApiType | undefined> => {
  try {
    const response = await axiosInstance.post("/crop-face", cropfaceData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
