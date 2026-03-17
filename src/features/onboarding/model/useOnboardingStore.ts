import { create } from "zustand";

//onboarding에서 선택한 것,
interface OnboardingStore {
  nickname: string;
  aboutMe: string;
  email: string;
  check: boolean;
  setTemp: (user: Partial<OnboardingStore>) => void;
  resetTag: () => void;
}

export const useOnboardingStore = create<OnboardingStore>(set => ({
  nickname: "",
  aboutMe: "",
  email: "",
  check: false,
  setTemp: user => set(state => ({ ...state, ...user })),
  resetTag: () => set({ nickname: "", aboutMe: "", email: "", check: false }),
}));
