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

async function logoutAndRedirect() {
  removeLocalStorageItem(AUTH_TOKEN_KEY);

  try {
    await axiosInstance.post("/auth/logout", {}, { skipAuth: true });
  } catch (e) {
    console.log(e);
  } finally {
    window.location.replace("/signin");
  }
}

axiosInstance.interceptors.request.use((req) => {
  if (req.skipAuth) return req;

  const authToken = getLocalStorageItem(AUTH_TOKEN_KEY);

  if (authToken) {
    req.headers.Authorization = `Bearer ${authToken}`;
  }

  return req;
});

axiosInstance.interceptors.response.use(
  (res) => res.data,

  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url;

    const isAuthApi = url === "/auth/login" || url === "/auth/refresh";

    if (!originalRequest || !status) {
      return Promise.reject("Something went wrong!");
    }

    if (originalRequest.skipAuth) {
      return Promise.reject(error);
    }

    if ((status === 401 && isAuthApi) || status === 403) {
      await logoutAndRedirect();
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post(
          "/auth/refresh",
          {},
          { skipAuth: true }
        );

        const newAccessToken = res.data.accessToken;

        setLocalStorageItem(AUTH_TOKEN_KEY, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (e) {
        await logoutAndRedirect();
        return Promise.reject(e);
      }
    }
    const customError = {
      ...(error.response?.data || {}),
      message: error.response?.data?.message || "Something went wrong",
    };

    return Promise.reject(customError);
  }
);

export default axiosInstance;
