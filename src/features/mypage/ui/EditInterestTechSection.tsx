import { TAG_CATEGORY_MAP, TAG_MAP } from "@/shared/consts/tags";
import { useMemo } from "react";
import { INTERESTS_MOCK } from "../consts/interests";
import { useEditInterestCategoryStore } from "../model/useEditInterestCategoryStore";
import { useEditTagStore } from "../model/useEditTagStore";
import { TechSelection } from "./TechSelection";

export const EditInterestTechSection = () => {
  const selectedTags = useEditTagStore(state => state.selectedTags);
  const toggleTag = useEditTagStore(state => state.toggleTag);
  const selectedCategory = useEditInterestCategoryStore(
    state => state.selectedCategory,
  );
  const selectedCategoryData = useMemo(
    () => INTERESTS_MOCK.interests.find(item => item.code === selectedCategory),
    [selectedCategory],
  );
  const selectedCategoryTags = useMemo(() => {
    if (!selectedCategoryData) return [];

    return TAG_MAP[
      TAG_CATEGORY_MAP[selectedCategoryData.code as keyof typeof TAG_CATEGORY_MAP]
    ];
  }, [selectedCategoryData]);

  return (
    <div className="w-full bg-bgStrong p-10">
      <h5 className="body-sb-18">{selectedCategoryData?.label}</h5>
      <p className="mb-6 body-r-14 font-alternative">
        관심있는 기술을 선택하세요.
      </p>

      <div className="grid grid-cols-5 gap-4">
        {selectedCategoryTags.map(({ code, label }) => {
          const value = `${selectedCategoryData?.code}:${code}`;

          return (
            <TechSelection
              key={value}
              label={label}
              selected={selectedTags.includes(value)}
              onClick={() =>
                selectedCategoryData && toggleTag(selectedCategoryData.code, code)
              }
            />
          );
        })}
      </div>
    </div>
  );
};
