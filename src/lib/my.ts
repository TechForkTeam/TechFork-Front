//사용자와 관련된 정보를 가져옵니다.

import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import api from "./api";
import type {
  InterestDataDto,
  InterestResponseDto,
  InterestTypeDto,
  MyProfileType,
} from "../types/my";
import { useEditTagStore } from "../store/useEditTagStore";

// 내 프로필 조회
export const getMyProfile = async () => {
  const { data } = await api.get("/api/v1/users/me/profile");
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

//내 관심사 조회
export const getMyInterest = async () => {
  const { data } = await api.get("/api/v1/users/me/interests");
  return data;
};

export const useGetMyInterest = () => {
  return useSuspenseQuery<InterestResponseDto, Error, InterestTypeDto[]>({
    queryKey: ["my", "interest"],
    queryFn: getMyInterest,
    select: res => res.data.interests,
  });
};

// 내 관심사 수정
export const putMyInterst = async (body: InterestDataDto) => {
  const { data } = await api.put("/api/v1/users/me/interests", body);
  return data;
};

export const usePutMyInterst = () => {
  const queryClient = useQueryClient();
  const queryKey = ["my", "interest"];

  return useMutation({
    mutationFn: (body: InterestDataDto) => putMyInterst(body),

    onMutate: async (payload: InterestDataDto) => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<InterestTypeDto[]>(queryKey);
      queryClient.setQueryData<InterestTypeDto[]>(queryKey, payload.interests);

      const { selectedTags } = useEditTagStore.getState();
      useEditTagStore.setState({
        originalTags: [...selectedTags],
      });

      return { previous };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
