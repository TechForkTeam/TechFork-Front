//사용자와 관련된 정보를 가져옵니다.

import { useSuspenseQuery } from "@tanstack/react-query";
import api from "./api";

//내 관심사 조회
export const getMyInterest = async () => {
  const { data } = await api.get("/api/v1/users/me/interests");
  return data;
};

export const useGetMyInterest = () => {
  return useSuspenseQuery({
    queryKey: ["my", "interest"],
    queryFn: getMyInterest,
    select: res => res.data.interests,
  });
};

// 내 프로필 조회
export const getMyProfile = async () => {
  const { data } = await api.get("/api/v1/users/me/profile");
  return data;
};

export const useGetMyProfile = () => {
  return useSuspenseQuery({
    queryKey: ["my", "profile"],
    queryFn: getMyProfile,
    select: res => res.data,
  });
};
