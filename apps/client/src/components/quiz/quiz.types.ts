import type { Question, Options } from "@common/contracts";
export type OptionProps = {
  placeholder: string;
  setCorrectIndex: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3>>;
  optionIndex: number;
  selectedOption: number;
};

export type EditModalProps = {
  saveEditing: (question: Question) => void;
  cancelEditing: () => void;
  editQuestion: Question;
  index: number;
};

export type QuestionListProps = {
  text: string;
  correctOptionIndex: Options;
  options: [string, string, string, string];
  _id: string;
  startEditing: (_id: string) => void;
  i: number;
};

export type OptionListProps = {
  index: number;
  color: string;
  shape: string;
  correctOptionIndex: Options;
  opt: string;
};

export type OptionEditProps = {
  optIdx: number;
  shape: string;
  colorHex: string;
  text: string;
  correctOptionIndex: Options;
  onCorrect: () => void;
};

export type HostOptionProps = {
  text: string;
  optionIndex: Options;
  correctOptionIndex: Options;
  show: boolean;
};

export type AIQuestionModalProps = {
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setQuizTitle: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
};
