import { ResponseApiType } from "../types/apiTypes";
import { axiosInstance } from "./axiosInstance";

export const resizeImage = async (
  data: FormData
): Promise<ResponseApiType | undefined> => {
  try {
    const response = await axiosInstance.post("/resize", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
