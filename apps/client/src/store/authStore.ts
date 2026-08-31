import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStore = {
  token: string;
  username: string;
  role: "host" | "guest" | null;
  roomCode: string | null;
  setToken: (token: string) => void;
  setRoomCode: (roomCode: string | null) => void;
  setUsername: (username: string) => void;
  setRole: (role: "host" | "guest" | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: "",
      username: "",
      role: null,
      roomCode: null,

      setRole: (role) => set((state) => ({ role: role, username: state.username, token: state.token })),
      // if role is null that means user is not in a quiz
      setToken: (token) => {
        set({ token });
        localStorage.setItem("Authorization", `Bearer ${token}`);
      },
      setRoomCode(roomCode) {
        set({ roomCode });
      },
      setUsername(username) {
        set({ username });
        // important: set object, not raw string
      },

      logout: () => {
        set({ token: "", username: "", role: null });
        localStorage.removeItem("Authorization");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        username: state.username,
        role: state.role,
        roomCode: state.roomCode,
      }),
      onRehydrateStorage: (state) => {
        if (state?.token) {
          localStorage.setItem("Authorization", `Bearer ${state.token}`);
        }
      },
    },
  ),
);
