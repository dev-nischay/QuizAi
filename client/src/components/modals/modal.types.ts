export type QuizCreateModalProps = {
  roomCode: string;
  questionCount: number;
  onClose: () => void;
  onGoToLobby: () => void;
};

export type JoinQuizModalProps = {
  roomCode: string;
  onClose: () => void;
  onJoin: () => void;
};
