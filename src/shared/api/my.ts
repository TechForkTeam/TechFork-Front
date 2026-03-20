//사용자와 관련된 정보를 가져옵니다.

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_CACHE_TIME } from "../consts/cacheTimes";
import type {
  InterestResponseDto,
  InterestTypeDto,
} from "./my.types";
import api from "./api";
import { API_ENDPOINTS } from "../consts/endpoints";
import { SHARED_QUERY_KEY } from "../consts/queryKeys";

// 내 프로필 조회 =>공통
export const getMyProfile = async () => {
  const { data } = await api.get(API_ENDPOINTS.users.me.profile);
  return data;
};

export const useGetMyProfile = (enabled?: boolean) => {
  return useQuery({
    queryKey: [SHARED_QUERY_KEY.MY, SHARED_QUERY_KEY.MY_PROFILE],
    queryFn: getMyProfile,
    select: res => res.data,
    enabled,
    staleTime: QUERY_CACHE_TIME.MY_PROFILE.staleTime,
    gcTime: QUERY_CACHE_TIME.MY_PROFILE.gcTime,
  });
};

//내 관심사 조회  =>공통
export const getMyInterest = async () => {
  const { data } = await api.get(API_ENDPOINTS.users.me.interests);
  return data;
};

export const useGetMyInterest = () => {
  return useSuspenseQuery<InterestResponseDto, Error, InterestTypeDto[]>({
    queryKey: [SHARED_QUERY_KEY.MY, SHARED_QUERY_KEY.MY_INTEREST],
    queryFn: getMyInterest,
    select: res => res.data.interests,
    staleTime: QUERY_CACHE_TIME.MY_INTEREST.staleTime,
    gcTime: QUERY_CACHE_TIME.MY_INTEREST.gcTime,
  });
};
