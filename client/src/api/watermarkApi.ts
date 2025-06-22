import { ResponseApiType } from "../types/apiTypes";
import { axiosInstance } from "./axiosInstance";

export const watermarkImage = async (
  data: FormData
): Promise<ResponseApiType | undefined> => {
  try {
    const response = await axiosInstance.post("/watermark", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
