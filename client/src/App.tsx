import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import AuthPage from "./components/auth/AuthPage";
import QuizHome from "./components/quiz/quiz-home/QuizHome";
import QuizBuilder from "./components/quiz/quiz-build/QuestionBuilder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AuthPage />} />
          <Route path="home" element={<QuizHome />} />
          <Route path="build" element={<QuizBuilder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
