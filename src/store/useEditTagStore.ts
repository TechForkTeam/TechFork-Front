import { create } from "zustand";
interface EditTagStoreProps {
  originalTags: string[]; //원래 tag
  selectedTags: string[]; //선택(수정하는 tag)
  setFromServer: (tags: string[]) => void; //서버 전송 tag
  toggleTag: (tag: string) => void; //toggle tag
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
  toggleTag: tag =>
    set(state => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter(item => item !== tag)
        : [...state.selectedTags, tag],
    })),

  resetTag: () => {
    set(state => ({ selectedTags: state.originalTags }));
  },
}));
