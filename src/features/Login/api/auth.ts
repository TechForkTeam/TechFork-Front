//refreshToken

import api from "@/shared/api/api";
import { API_ENDPOINTS } from "@/shared/consts/endpoints";

export { postRefreshToken } from "@/shared/api/auth";

//로그아웃,쿠키
export const postLogout = async () => {
  const { data } = await api.post(API_ENDPOINTS.auth.logout);
  return data.data;
};
