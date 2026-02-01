//refreshToken

import api from "./api";

export const postRefreshToken = async () => {
  const { data } = await api.post("/api/v1/auth/refresh");
  return data.data.accessToken;
};
