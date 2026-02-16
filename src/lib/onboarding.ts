import { useMutation } from "@tanstack/react-query";
import type { OnboardingRequestType } from "../types/onboarding";
import api from "./api";
import { useNavigate } from "react-router-dom";

//회원가입
export const postOnboarding = async (body: OnboardingRequestType) => {
  const res = await api.post("/api/v1/onboarding/complete", body);
  return res.data;
};

//post
export const useSubmitOnboarding = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: OnboardingRequestType) => postOnboarding(body),
    onSuccess: () => navigate("/"),
    onError: err => console.log(err),
  });
};

//회원탈퇴
export const deleteAccount = async () => {
  const { data } = await api.patch("/api/v1/users/me/withdrawal");
  return data;
};

export const useDeleteAccount = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => onSuccess?.(),
    onError: err => console.error(err),
  });
};
