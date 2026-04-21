import { INTERESTS_MOCK } from "@/features/mypage/consts/interests";
import { create } from "zustand";

interface EditInterestCategoryStoreProps {
  selectedCategory: string;
  setSelectedCategory: (categoryCode: string) => void;
  resetSelectedCategory: () => void;
}

export const useEditInterestCategoryStore =
  create<EditInterestCategoryStoreProps>(set => ({
    selectedCategory: INTERESTS_MOCK.interests[0].code,
    setSelectedCategory: categoryCode =>
      set({ selectedCategory: categoryCode }),
    resetSelectedCategory: () =>
      set({ selectedCategory: INTERESTS_MOCK.interests[0].code }),
  }));
