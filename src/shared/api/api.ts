import axios, { type InternalAxiosRequestConfig } from "axios";
import useUserStore from "@/shared/model/useUserStore";
import { postRefreshToken } from "./auth";
import { AUTH_ERROR } from "@/shared/consts/errorCodes";

// const TEMP_TOKEN = import.meta.env.VITE_APP_DEV_TOKEN;
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
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

    // 서버 응답 없음 => 네트워크 에러
    if (!error.response) {
      return Promise.reject(error);
    }

    const code = (error.response?.data as { code?: string })?.code;

    // 세션 무효화 또는 탈퇴 회원=> refresh 시도 없이 즉시 로그아웃
    if (code === AUTH_ERROR.REFRESH_MISMATCH || code === AUTH_ERROR.WITHDRAWN) {
      useUserStore.getState().logout();
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
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
