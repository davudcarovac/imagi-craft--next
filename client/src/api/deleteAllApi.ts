import { axiosInstance } from "./axiosInstance";

type DeleteAllType = {
  message: string;
};

export const deleteAllFiles = async (): Promise<DeleteAllType | undefined> => {
  try {
    const response = await axiosInstance.get("/convert-image/delete-all");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
