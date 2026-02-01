import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserData {
  accessToken: string | null;
  isNewMember: string | null;
}

interface UserStoreType {
  user: UserData | null;

  setUser: (user: UserData) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

const useUserStore = create<UserStoreType>()(
  persist(
    set => ({
      user: null,
      setUser: user => set({ user }),
      setAccessToken: accessToken =>
        set(state => ({
          user: state.user
            ? { ...state.user, accessToken }
            : { accessToken, isNewMember: null },
        })),
      logout: () => set({ user: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
