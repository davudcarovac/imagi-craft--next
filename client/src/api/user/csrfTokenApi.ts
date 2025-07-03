import { axiosInstance } from "../axiosInstance";

export const getCsrfToken = async () => {
  try {
    const response = await axiosInstance.get("/csrf-token", {
      withCredentials: true,
    });

    console.log("Get CSRF token api ===> ", response);
    return response.data;
  } catch (error) {
    console.log("Get CSRF token function ERROR ===> ", error);
  }
};
