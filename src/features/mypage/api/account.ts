import { useMutation } from "@tanstack/react-query";
import api from "../../../shared/api/api";
import { API_ENDPOINTS } from "../../../shared/consts/endpoints";

export const deleteAccount = async () => {
  const { data } = await api.patch(API_ENDPOINTS.users.me.withdrawal);
  return data;
};

export const useDeleteAccount = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => onSuccess?.(),
    onError: err => console.error(err),
  });
};
