import axios, { type InternalAxiosRequestConfig } from "axios";
import useUserStore from "../store/useUserStore";
import { postRefreshToken } from "./auth";

// const TEMP_TOKEN = import.meta.env.VITE_APP_DEV_TOKEN;
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

const api = axios.create({
  baseURL: "https://techfork.shop",
  withCredentials: true,
});

api.interceptors.request.use(
  config => {
    const accessToken = useUserStore.getState().user?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 이미 refresh 중이면
        if (!refreshPromise) {
          refreshPromise = postRefreshToken();
        }

        const newAccessToken = await refreshPromise;
        refreshPromise = null;
        useUserStore.getState().setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (e) {
        refreshPromise = null;
        useUserStore.getState().logout();
        // window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default api;

// api.interceptors.request.use(
//   config => {
//     // const accessToken = useUserStore.getState().user?.accessToken;
//     if (TEMP_TOKEN) {
//       config.headers.Authorization = `Bearer ${TEMP_TOKEN}`;
//     }

//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// export default api;
