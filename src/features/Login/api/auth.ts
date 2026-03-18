//refreshToken

import api from "@/shared/api/api";
import { API_ENDPOINTS } from "@/shared/constants/endpoints";

export const postRefreshToken = async () => {
  const { data } = await api.post(API_ENDPOINTS.auth.refresh);
  return data.data.accessToken;
};

//로그아웃,쿠키
export const postLogout = async () => {
  const { data } = await api.post(API_ENDPOINTS.auth.logout);
  return data.data;
};
