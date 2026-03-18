import api from "./api";
import { API_ENDPOINTS } from "../consts/endpoints";

export const postRefreshToken = async () => {
  const { data } = await api.post(API_ENDPOINTS.auth.refresh);
  return data.data.accessToken;
};
