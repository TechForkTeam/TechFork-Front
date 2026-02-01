//refreshToken

import api from "./api";

export const postRefreshToken = async () => {
  const { data } = await api.post("/api/v1/auth/refresh");
  return data.data.accessToken;
};

//로그아웃,쿠키
export const postLogout = async () => {
  const { data } = await api.post("/api/v1/auth/logout");
  return data.data;
};
