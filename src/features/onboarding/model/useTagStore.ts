import { create } from "zustand";
import type { InterestType } from "@/features/onboarding/api/onboarding.types";
import { TAG_MAP } from "@/features/home/consts/tag";

//onboarding에서 선택한 것,
interface TagStore {
  tag: string[];
  setTag: (tag: string[]) => void;
  toggleTag: (category: string, tag: string) => void;
  resetTag: () => void;
  getApiPayload: () => InterestType[];
}

export const useTagStore = create<TagStore>((set, get) => ({
  tag: [],
  setTag: tag => set({ tag }),
  toggleTag: (category, code) => {
    const tagId = `${category}:${code}`;
    set(state => ({
      tag: state.tag.includes(tagId)
        ? state.tag.filter(t => t !== tagId)
        : [...state.tag, tagId],
    }));
  },
  getApiPayload: () => {
    const selectedTagIds = get().tag;

    return (
      Object.entries(TAG_MAP)
        .map(([categoryKey, items]) => {
          //  카테고리가 일치하는 것들만 필터링
          const matchingKeywords = items
            .filter(item =>
              selectedTagIds.includes(`${categoryKey}:${item.code}`),
            )
            .map(item => item.code);

          return {
            // 대문자 변환
            category: categoryKey.toUpperCase(),
            keywords: matchingKeywords,
          };
        })
        // 3. 키워드가 있는 카테고리만 서버로 전송
        .filter(item => item.keywords.length > 0)
    );
  },
  resetTag: () => set({ tag: [] }),
}));
