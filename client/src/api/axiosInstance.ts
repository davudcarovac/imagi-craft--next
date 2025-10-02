import { getCookie } from "@/utils/getCookie";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:4000";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// helper: funkcija za prikazivanje alert-a
function showServerSleepAlert() {
  if (!document.getElementById("server-sleep-alert")) {
    const div = document.createElement("div");
    div.id = "server-sleep-alert";
    div.innerText = "⏳ Server se budi, molimo sačekajte...";
    div.style.position = "fixed";
    div.style.bottom = "20px";
    div.style.left = "50%";
    div.style.transform = "translateX(-50%)";
    div.style.background = "#333";
    div.style.color = "#fff";
    div.style.padding = "10px 20px";
    div.style.borderRadius = "8px";
    div.style.zIndex = "9999";
    document.body.appendChild(div);
  }
}

function hideServerSleepAlert() {
  const alert = document.getElementById("server-sleep-alert");
  if (alert) alert.remove();
}

// request interceptor
axiosInstance.interceptors.request.use((config) => {
  if (config.url?.startsWith("http")) {
    throw new Error("Absolute URLs are not allowed!");
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

  // ⏳ ako zahtev traje duže od 5 sekundi, pokaži alert
  (config as any)._sleepTimeout = setTimeout(() => {
    showServerSleepAlert();
  }, 5000);

  return config;
});

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    clearTimeout((response.config as any)._sleepTimeout);
    hideServerSleepAlert();
    return response;
  },
  (error) => {
    clearTimeout((error.config as any)._sleepTimeout);
    hideServerSleepAlert();
    return Promise.reject(error);
  }
);
