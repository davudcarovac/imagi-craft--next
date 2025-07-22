import { ResponseApiType } from "../types/apiTypes";
import { axiosInstance } from "./axiosInstance";

export const collageImage = async (
  collageData: FormData
): Promise<
  | (ResponseApiType & {
      message: string;
      dimensions: { width: number; height: number };
    })
  | undefined
> => {
  try {
    const response = await axiosInstance.post("/collage", collageData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
