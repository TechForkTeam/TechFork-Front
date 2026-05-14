import api from "@/shared/api/api";
import { API_ENDPOINTS } from "@/shared/consts/endpoints";
import { USER_ERROR } from "@/shared/consts/errorCodes";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import useUserStore from "@/shared/model/useUserStore";

export const deleteAccount = async () => {
  const { data } = await api.patch(API_ENDPOINTS.users.me.withdrawal);
  return data;
};

export const useDeleteAccount = (onSuccess: () => void) => {
  return useMutation<unknown, AxiosError<{ code: string; message: string }>>({
    mutationFn: deleteAccount,
    onSuccess: () => onSuccess?.(),
    onError: e => {
      if (e?.response?.data?.code === USER_ERROR.ALREADY_WITHDRAWN) {
        toast.error(e.response.data.message);
        useUserStore.getState().logout();
      }
    },
  });
};
