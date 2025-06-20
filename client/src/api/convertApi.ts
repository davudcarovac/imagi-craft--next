import { ResponseApiType } from "../types/apiTypes";
import { axiosInstance } from "./axiosInstance";

export const convertImage = async (
  convertData: FormData
): Promise<ResponseApiType | undefined> => {
  try {
    const response = await axiosInstance.post("/convert", convertData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
