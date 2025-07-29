import axios from "axios";

// const BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? process.env.NEXT_PUBLIC_BASE_URL
//     : "http://localhost:4000";
export const axiosInstance = axios.create({
  baseURL: "https://frosty-image-server.onrender.com",
});

axiosInstance.interceptors.request.use((config) => {
  if (config.url?.startsWith("http")) {
    throw new Error("Absoulte URL's are not allowed!");
  }
  return config;
});
