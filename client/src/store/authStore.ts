import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStore = {
  token: string;
  username: string;
  setToken: (token: string) => void;
  setUsername: (username: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: "",
      username: "",

      setToken: (token) => {
        set({ token });
        localStorage.setItem("Authorization", `Bearer ${token}`);
      },

      setUsername: (username) => {
        set({ username }); // important: set object, not raw string
      },

      logout: () => {
        set({ token: "", username: "" });
        localStorage.removeItem("Authorization");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.token,
        username: state.username,
      }),
      onRehydrateStorage: (state) => {
        if (state?.token) {
          localStorage.setItem("Authorization", `Bearer ${state.token}`);
        }
      },
    },
  ),
);
