import axios from "axios";
import { AUTH_TOKEN_KEY } from "@/config/storage.config";
import { getLocalStorageItem } from "./store.manager";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((req) => {
  const authToken = getLocalStorageItem(AUTH_TOKEN_KEY);
  if (authToken) {
    req.headers.Authorization = `Bearer ${authToken}`;
  }
  return req;
});

export default axiosInstance;
