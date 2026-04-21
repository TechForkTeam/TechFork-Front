import { INTERESTS_MOCK } from "@/features/mypage/consts/interests";
import { useMemo, useRef } from "react";
import { useEditInterestCategoryStore } from "../model/useEditInterestCategoryStore";
import { useEditTagStore } from "../model/useEditTagStore";
import { TagItem } from "./TagItem";

export const EditAsidePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedTags = useEditTagStore(state => state.selectedTags);
  const selectedCategory = useEditInterestCategoryStore(
    state => state.selectedCategory,
  );
  const setSelectedCategory = useEditInterestCategoryStore(
    state => state.setSelectedCategory,
  );
  const myInterestMap = useMemo(
    () =>
      selectedTags.reduce<Record<string, number>>((acc, code) => {
        const [categoryCode] = code.split(":");
        if (!categoryCode) return acc;
        acc[categoryCode] = (acc[categoryCode] ?? 0) + 1;
        return acc;
      }, {}),
    [selectedTags],
  );

  const scrollToTop = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <aside
      ref={scrollRef}
      className="w-75 border-x border-b border-bgNormal bg-sub-400 px-6 text-[#8B95A1]"
    >
      <h6 className="py-4 body-r-14">카테고리</h6>

      <ul className="scrollbar-style flex h-150 w-65 flex-col overflow-scroll overflow-x-hidden">
        {INTERESTS_MOCK.interests.map(item => {
          const count = myInterestMap[item.code] ?? 0;

          return (
            <TagItem
              key={item.code}
              tag={item.label}
              length={count}
              selected={item.code === selectedCategory}
              onClick={() => {
                setSelectedCategory(item.code);
                scrollToTop();
              }}
            />
          );
        })}
      </ul>
    </aside>
  );
};
