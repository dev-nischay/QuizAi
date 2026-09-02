import type { LeaderBoard } from "@common/contracts";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";
export type ResultStore = {
  finalResult: LeaderBoard[] | [];
  setFinalResult: (result: LeaderBoard[]) => void;
  reset: () => void;
};

type InititalState = {
  finalResult: LeaderBoard[] | [];
};

const intialState: InititalState = {
  finalResult: [],
};

export const useResultStore = create<ResultStore>()(
  persist(
    (set) => ({
      ...intialState,

      setFinalResult: (result) => {
        set({ finalResult: result });
      },

      reset() {
        set({ finalResult: [] });
      },
    }),
    {
      name: "results",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        finalResult: state.finalResult,
      }),
    },
  ),
);
