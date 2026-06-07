import axios from "axios";
import { AUTH_TOKEN_KEY } from "@/config/storage.config";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "./store.manager";
import API_CONFIG from "@/config/api.config";
import PATHS from "@/config/path.config";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getLocalStorageItem(AUTH_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let requestQueue = [];

const resolveQueue = (token) =>
  requestQueue.forEach(({ resolve }) => resolve(token));

const rejectQueue = (error) =>
  requestQueue.forEach(({ reject }) => reject(error));

async function refreshAccessToken() {
  const res = await axiosInstance.post(API_CONFIG.AUTH.REFRESH);
  const newToken = res?.data?.accessToken;
  setLocalStorageItem(AUTH_TOKEN_KEY, newToken);
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  return newToken;
}

async function clearSession() {
  try {
    await axiosInstance.post(API_CONFIG.AUTH.LOGOUT);
  } finally {
    removeLocalStorageItem(AUTH_TOKEN_KEY);
    window.location.href = PATHS.LOGIN;
  }
}

axiosInstance.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    const { response, config: originalRequest } = error;
    const status = response?.status;

    if (originalRequest.url?.includes(API_CONFIG.AUTH.REFRESH)) {
      rejectQueue(error);
      isRefreshing = false;
      requestQueue = [];
      await clearSession();
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          requestQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        resolveQueue(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch {
        rejectQueue(error);
        await clearSession();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
        requestQueue = [];
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
