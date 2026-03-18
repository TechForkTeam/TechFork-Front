import type {
  InterestDataDto,
  InterestTypeDto,
  MyProfileType,
} from "@/features/home/api/my.types";
import { useEditTagStore } from "@/features/mypage/model/useEditTagStore";
import api from "@/shared/api/api";
import { API_ENDPOINTS } from "@/shared/consts/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 내 관심사 수정 =>mypage
export const putMyInterst = async (body: InterestDataDto) => {
  const { data } = await api.put(API_ENDPOINTS.users.me.interests, body);
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

//내프로필 수정 =>마페

export const patchMyProfile = async (body: MyProfileType) => {
  const { data } = await api.patch(API_ENDPOINTS.users.me.profile, body);
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
