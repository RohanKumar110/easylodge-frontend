import axios from "axios";
import { AUTH_TOKEN_KEY } from "@/config/storage.config";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "./store.manager";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  withCredentials: true,
});

let refreshPromise = null;

async function logoutAndRedirect() {
  removeLocalStorageItem(AUTH_TOKEN_KEY);

  try {
    await axiosInstance.post("/auth/logout", {}, { skipAuth: true });
  } finally {
    window.location.replace("/signin");
  }
}

axiosInstance.interceptors.request.use((config) => {
  if (config.skipAuth) return config;

  const token = getLocalStorageItem(AUTH_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (!originalRequest || !status) {
      return Promise.reject(error);
    }

    // refresh token failed
    if (originalRequest.url?.includes("/auth/refresh") || status === 403) {
      await logoutAndRedirect();
      return Promise.reject(error);
    }

    // access token expired
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // avoid multiple refresh calls
        if (!refreshPromise) {
          refreshPromise = axiosInstance
            .post("/auth/refresh", {}, { skipAuth: true })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const res = await refreshPromise;

        const accessToken = res.data.accessToken;

        setLocalStorageItem(AUTH_TOKEN_KEY, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (e) {
        await logoutAndRedirect();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default axiosInstance;