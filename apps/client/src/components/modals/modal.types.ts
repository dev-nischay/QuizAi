import type { Question } from "@common/contracts";

export type QuizCreateModalProps = {
  questionCount: number;
  onClose: () => void;
  quizData: { title: string; questions: Question[] };
};

export type JoinQuizModalProps = {
  roomCode: string;
  onClose: () => void;
  onJoin: () => void;
};
