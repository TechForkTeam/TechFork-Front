import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "@/shared/api/api";
import { API_ENDPOINTS } from "@/shared/consts/endpoints";
import type { OnboardingRequestType } from "./onboarding.types";

export const postOnboarding = async (body: OnboardingRequestType) => {
  const res = await api.post(API_ENDPOINTS.onboarding.complete, body);
  return res.data;
};

export const useSubmitOnboarding = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: OnboardingRequestType) => postOnboarding(body),
    onSuccess: () => navigate("/"),
    onError: err => console.log(err),
  });
};
