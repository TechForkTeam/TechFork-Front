//사용자와 관련된 정보를 가져옵니다.

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import api from "./api";
import type { MyProfileType } from "../types/my";

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

//내프로필 수정

export const patchMyProfile = async (body: MyProfileType) => {
  const { data } = await api.patch("/api/v1/users/me/profile", body);
  return data;
};

export const usePatchMyProfile = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my", "profile"],
      });
      onSuccess?.();
    },
    onError: err => console.log(err),
  });
};
