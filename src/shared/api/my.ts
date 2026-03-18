//사용자와 관련된 정보를 가져옵니다.

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type {
  InterestResponseDto,
  InterestTypeDto,
} from "@/features/home/api/my.types";
import api from "@/shared/api/api";
import { API_ENDPOINTS } from "@/shared/consts/endpoints";

// 내 프로필 조회 =>공통
export const getMyProfile = async () => {
  const { data } = await api.get(API_ENDPOINTS.users.me.profile);
  return data;
};

export const useGetMyProfile = (enabled?: boolean) => {
  return useQuery({
    queryKey: ["my", "profile"],
    queryFn: getMyProfile,
    select: res => res.data,
    enabled,
  });
};

//내 관심사 조회  =>공통
export const getMyInterest = async () => {
  const { data } = await api.get(API_ENDPOINTS.users.me.interests);
  return data;
};

export const useGetMyInterest = () => {
  return useSuspenseQuery<InterestResponseDto, Error, InterestTypeDto[]>({
    queryKey: ["my", "interest"],
    queryFn: getMyInterest,
    select: res => res.data.interests,
  });
};
