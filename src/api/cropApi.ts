import { ResponseApiType } from "../types/apiTypes";
import { axiosInstance } from "./axiosInstance";

export const cropImage = async (
  data: FormData
): Promise<ResponseApiType | undefined> => {
  try {
    const response = await axiosInstance.post("/crop", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
