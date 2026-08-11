export type QuizCreateModalProps = {
  questionCount: number;
  onClose: () => void;
  roomCode: string;
  title: string;
};

export type JoinQuizModalProps = {
  roomCode: string;
  onClose: () => void;
  onJoin: () => void;
};
