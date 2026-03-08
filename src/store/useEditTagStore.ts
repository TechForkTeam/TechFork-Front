import { create } from "zustand";
interface EditTagStoreProps {
  originalTags: string[]; //원래 tag
  selectedTags: string[]; //선택(수정하는 tag)
  setFromServer: (tags: string[]) => void; //서버 전송 tag
  toggleTag: (categoryCode: string, keywordCode: string) => void; //toggle tag
  resetTag: () => void; //reset tag
}

export const useEditTagStore = create<EditTagStoreProps>(set => ({
  originalTags: [],
  selectedTags: [],
  setFromServer: tags =>
    set({
      originalTags: tags,
      selectedTags: tags,
    }),
  toggleTag: (categoryCode, keywordCode) =>
    set(state => {
      const value = `${categoryCode}:${keywordCode}`; //중복 키워드 구분
      return {
        selectedTags: state.selectedTags.includes(value)
          ? state.selectedTags.filter(item => item !== value)
          : [...state.selectedTags, value],
      };
    }),

  resetTag: () => {
    set(state => ({ selectedTags: state.originalTags }));
  },
}));
