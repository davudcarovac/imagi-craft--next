import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:4000";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, // 👈 Obavezno za slanje cookie-a
});

axiosInstance.interceptors.request.use((config) => {
  // console.log("URL ===> ", BASE_URL);
  if (config.url?.startsWith("http")) {
    throw new Error("Absoulte URL's are not allowed!");
  }
  return config;
});
