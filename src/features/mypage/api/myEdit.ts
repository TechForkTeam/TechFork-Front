import type {
  InterestDataDto,
  InterestTypeDto,
  MyProfileType,
} from "@/shared/api/my.types";
import { useEditTagStore } from "../model/useEditTagStore";
import api from "@/shared/api/api";
import { API_ENDPOINTS } from "@/shared/consts/endpoints";
import { SHARED_QUERY_KEY } from "@/shared/consts/queryKeys";
import { HOME_QUERY_KEY } from "@/features/home/consts/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_ERROR } from "@/shared/consts/errorCodes";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

// 내 관심사 수정 =>mypage
export const putMyInterst = async (body: InterestDataDto) => {
  const { data } = await api.put(API_ENDPOINTS.users.me.interests, body);
  return data;
};

export const usePutMyInterst = () => {
  const queryClient = useQueryClient();
  const queryKey = [SHARED_QUERY_KEY.MY, SHARED_QUERY_KEY.MY_INTEREST] as const;
  const recommendQueryKey = [
    SHARED_QUERY_KEY.POSTS,
    SHARED_QUERY_KEY.MY,
    HOME_QUERY_KEY.POSTS_RECOMMEND,
  ] as const;

  return useMutation<
    unknown,
    AxiosError<{ code: string; message: string }>,
    InterestDataDto,
    { previous: InterestTypeDto[] | undefined; previousRecommend: unknown }
  >({
    mutationFn: (body: InterestDataDto) => putMyInterst(body),

    onMutate: async (payload: InterestDataDto) => {
      await queryClient.cancelQueries({ queryKey });
      await queryClient.cancelQueries({ queryKey: recommendQueryKey });

      const previous = queryClient.getQueryData<InterestTypeDto[]>(queryKey); //수정 전 관심사
      const previousRecommend = queryClient.getQueryData(recommendQueryKey); //수정 전 추천글 캐시
      queryClient.setQueryData<InterestTypeDto[]>(queryKey, payload.interests);

      const { selectedTags } = useEditTagStore.getState();
      useEditTagStore.setState({
        originalTags: [...selectedTags],
      });

      return { previous, previousRecommend };
    },
    onError: (e, _, context) => {
      if (e?.response?.data?.code == USER_ERROR.INVALID_INTEREST) {
        toast.error(e.response.data.message);
      }

      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
      if (context?.previousRecommend) {
        queryClient.setQueryData(recommendQueryKey, context.previousRecommend);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: recommendQueryKey });
    },
  });
};

//내프로필 수정 =>마페

export const patchMyProfile = async (body: MyProfileType) => {
  const { data } = await api.patch(API_ENDPOINTS.users.me.profile, body);
  return data;
};

export const usePatchMyProfile = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const queryKey = [SHARED_QUERY_KEY.MY, SHARED_QUERY_KEY.MY_PROFILE] as const;

  return useMutation({
    mutationFn: patchMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
      onSuccess?.();
    },
  });
};
