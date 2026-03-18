import { useMutation } from "@tanstack/react-query";
import api from "./api";
import { API_ENDPOINTS } from "../consts/endpoints";

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
