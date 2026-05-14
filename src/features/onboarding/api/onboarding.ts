import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import api from "@/shared/api/api";
import { API_ENDPOINTS } from "@/shared/consts/endpoints";
import type { OnboardingRequestType } from "./onboarding.types";
import { USER_ERROR } from "@/shared/consts/errorCodes";
import { toast } from "react-toastify";

export const postOnboarding = async (body: OnboardingRequestType) => {
  const res = await api.post(API_ENDPOINTS.onboarding.complete, body);
  return res.data;
};

export const useSubmitOnboarding = () => {
  const navigate = useNavigate();

  return useMutation<
    unknown,
    AxiosError<{ code: string; message: string }>,
    OnboardingRequestType
  >({
    mutationFn: (body: OnboardingRequestType) => postOnboarding(body),
    onSuccess: () => navigate("/"),
    onError: err => {
      if (err.response?.data.code === USER_ERROR.INVALID_INTEREST) {
        toast.error(err.response.data.message);
      }
    },
  });
};
