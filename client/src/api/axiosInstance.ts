import { getCookie } from "@/utils/getCookie";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:4000";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.url?.startsWith("http")) {
    throw new Error("Absoulte URL's are not allowed!");
  }

  const csrfToken = getCookie("csrf-token-client");

  if (
    csrfToken &&
    config.method &&
    ["post", "put", "patch", "delete"].includes(
      config.method.toLocaleLowerCase()
    )
  ) {
    config.headers["x-csrf-token"] = csrfToken;
  }
  return config;
});
