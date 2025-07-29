import { axiosInstance } from "../axiosInstance";

export const getCsrfToken = async () => {
  try {
    const response = await axiosInstance.get("/csrf-token", {
      withCredentials: true,
    });

    // console.log("", typeof window === "undefined");

    // const csrfToken = document.cookie
    //   .split("; ")
    //   .find((row) => row.startsWith("XSRF-TOKEN="))
    //   ?.split("=")[1];

    // console.log(csrfToken);

    console.log("Get CSRF token api ===> ", response);
    return response.data;
  } catch (error) {
    console.log("Get CSRF token function ERROR ===> ", error);
  }
};
