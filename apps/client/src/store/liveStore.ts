import { create } from "zustand";
import type { LeaderBoard, SubmitAnswerResponse } from "@common/contracts";
import type { Options, Question, Vote } from "@common/contracts";
type QuizDetails = { host: string; totalQuestionCount: number; title: string; roomCode: string };
type CurrentQuestion = Pick<Question, "text" | "options"> & { correctOptionIndex?: Options } & {
  currentQuestionIndex: number;
};
type LivePhase = "lobby" | "active" | null;
type LiveSession = {
  phase: LivePhase;
  quizDetails: QuizDetails | null;
  currentQuestion: CurrentQuestion | null;
  liveUsers: string[];
  leaderBoard: LeaderBoard[];
  currentAnswer: Omit<SubmitAnswerResponse, "type"> | null;
  votes: Vote[];
  setPhase: (phase: LivePhase) => void;
  setVotes: (votes: Vote[]) => void;
  setAnswer: (answer: Omit<SubmitAnswerResponse, "type">) => void;
  setQuestion: (question: CurrentQuestion) => void;
  setQuizDetails: (details: QuizDetails) => void;
  setLeaderBoard: (leaderBoard: LeaderBoard[]) => void;
  setLivePlayers: (users: string[]) => void;
  reset: () => void;
};

type InititalState = Pick<
  LiveSession,
  "phase" | "quizDetails" | "currentQuestion" | "currentAnswer" | "leaderBoard" | "liveUsers" | "votes"
>;

const intialState: InititalState = {
  phase: null,
  quizDetails: null,
  currentAnswer: null,
  currentQuestion: null,
  liveUsers: [],
  leaderBoard: [],
  votes: [],
};

export const useLiveStore = create<LiveSession>((set) => ({
  ...intialState,

  setQuestion: (question) => {
    set({ currentQuestion: question });
  },

  setVotes(votes) {
    set({ votes });
  },

  setQuizDetails(details) {
    set({
      quizDetails: {
        host: details.host,
        totalQuestionCount: details.totalQuestionCount,
        title: details.title,
        roomCode: details.roomCode,
      },
    });
  },

  setLeaderBoard: (leaderBoard) => {
    set({ leaderBoard: leaderBoard });
  },

  setLivePlayers: (liveUsers) => {
    set({ liveUsers: liveUsers });
  },

  setAnswer: (answer) => {
    set({ currentAnswer: answer });
  },
  setPhase: (phase) => {
    set({ phase });
  },
  reset: () => {
    set(intialState);
  },
}));
