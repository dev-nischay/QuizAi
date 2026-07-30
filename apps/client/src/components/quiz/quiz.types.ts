import type { QuestionControls } from "./quiz-build/questionControls";
import type { Question, Options } from "@common/contracts";
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

export type QuizFormData = {
  title: string;
  questions: Question[];
};

export type QuizResponse = {
  title: string;
  roomCode: string;
};

export type QuestionPreviewProps = Question & {
  quesControls: QuestionControls;
  i: number;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
};

export type HostOptionProps = {
  text: string;
  optionIndex: Options;
  correctOptionIndex: Options;
  show: boolean;
};
