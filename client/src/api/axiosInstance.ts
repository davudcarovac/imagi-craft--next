import { getCookie } from "@/utils/getCookie";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

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
    div.innerText = "⏳ The server is waking up, please wait...";
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
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
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
    // Axios headers sada ne mogu biti undefined
    config.headers = config.headers ?? {};
    config.headers["x-csrf-token"] = csrfToken;
  }

  // ⏳ dodaj "_sleepTimeout" preko type assertion
  (
    config as InternalAxiosRequestConfig & {
      _sleepTimeout?: ReturnType<typeof setTimeout>;
    }
  )._sleepTimeout = setTimeout(() => {
    showServerSleepAlert();
  }, 5000);

  return config;
});

// response interceptor

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _sleepTimeout?: ReturnType<typeof setTimeout>;
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const cfg = response.config as CustomAxiosRequestConfig;
    if (cfg._sleepTimeout) clearTimeout(cfg._sleepTimeout);
    hideServerSleepAlert();
    return response;
  },
  (error: AxiosError) => {
    const cfg = error.config as CustomAxiosRequestConfig;
    if (cfg?._sleepTimeout) clearTimeout(cfg._sleepTimeout);
    hideServerSleepAlert();

    // AUTOMATSKA ODJAVA na 401
    if (error.response?.status === 401) {
      console.warn("Token istekao ili nevažeći — automatska odjava");
      localStorage.removeItem("user"); // očisti user state
      window.location.href = "/login"; // preusmeri korisnika
    }

    return Promise.reject(error);
  }
);
