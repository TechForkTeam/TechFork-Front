import { useGetMyInterest } from "@/shared/api/my";
import { useEffect } from "react";
import { usePutMyInterst } from "../api/myEdit";
import { useEditInterestCategoryStore } from "./useEditInterestCategoryStore";
import { useEditTagStore } from "./useEditTagStore";

export const useEditInterestPage = () => {
  const { selectedTags, setFromServer, originalTags, resetTag } =
    useEditTagStore();
  const { data } = useGetMyInterest();
  const resetSelectedCategory = useEditInterestCategoryStore(
    state => state.resetSelectedCategory,
  );
  const handleSaveInterest = usePutMyInterst();

  useEffect(() => {
    if (originalTags.length === 0) {
      const serverTags = data.flatMap(item =>
        item.keywords.map(keywordCode => `${item.category}:${keywordCode}`),
      );
      setFromServer(serverTags);
    }
  }, [data, originalTags.length, setFromServer]);

  useEffect(() => {
    return () => {
      resetTag();
      resetSelectedCategory();
    };
  }, [resetSelectedCategory, resetTag]);

  const handleSave = () => {
    const categoryMap: Record<string, string[]> = {};

    selectedTags.forEach(code => {
      const [categoryCode, keywordCode] = code.split(":");
      if (!categoryCode || !keywordCode) return;

      if (!categoryMap[categoryCode]) {
        categoryMap[categoryCode] = [];
      }

      categoryMap[categoryCode].push(keywordCode);
    });

    handleSaveInterest.mutate({
      interests: Object.entries(categoryMap).map(([category, keywords]) => ({
        category,
        keywords,
      })),
    });
  };

  return {
    modalSaving: handleSaveInterest.isPending,
    handleSave,
  };
};
