export type Questions = {
  text: string;
  options: [string, string, string, string];
  correctOptionIndex: 0 | 1 | 2 | 3;
};

export type TQuiz = {
  title: string;
  questions: Questions[];
  createdAt: Date;
};

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
};
