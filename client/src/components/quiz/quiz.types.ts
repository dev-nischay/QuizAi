import type { QuestionControls } from "./quiz-build/questionControls";
export type OptionProps = {
  placeholder: string;
  setCorrectIndex: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3>>;
  optionIndex: number;
  selectedOption: number;
};

export type QuestionBuilderProps = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  quesControls: QuestionControls;
  isEditing: boolean;
  editQuestion: Question | null;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
};

export type Question = {
  _id: string;
  text: string;
  options: [string, string, string, string];
  correctOptionIndex: 0 | 1 | 2 | 3;
};

export type QuestionPreviewProps = Question & {
  quesControls: QuestionControls;
  i: number;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
};

export type OptionIndex = 0 | 1 | 2 | 3;

export type HostOptionProps = {
  text: string;
  optionIndex: OptionIndex;
  correctOptionIndex: OptionIndex;
  show: boolean;
};
