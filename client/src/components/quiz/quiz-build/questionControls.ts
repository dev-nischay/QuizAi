import type { Question } from "../quiz.types";

export class QuestionControls {
  questions;
  setQuestions;
  constructor(questions: Question[], setQuestions: React.Dispatch<React.SetStateAction<Question[]>>) {
    this.questions = questions;
    this.setQuestions = setQuestions;
  }

  addQuestion = (question: Question) => {
    this.setQuestions((prev) => [...prev, question]);
  };

  removeQuestion = (_id: string) => {
    this.setQuestions((prev) => prev.filter((e) => e._id !== _id));
  };

  updateQuestion = (_id: string, update: Partial<Question>) => {
    this.setQuestions((prev) => prev.map((question) => (question._id === _id ? { ...question, ...update } : question)));
  };
}
