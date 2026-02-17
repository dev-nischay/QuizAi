import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import AuthPage from "./components/auth/AuthPage";
import QuizHome from "./components/quiz/quiz-home/QuizHome";
import QuizBuilderPage from "./components/quiz/quiz-build/QuizBuilderPage";
import QuizLivePage from "./components/quiz/quiz-live/QuizLivePage";
import NotFoundPage from "./components/globals/NotFoundPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AuthPage />} />
          <Route path="home" element={<QuizHome />} />
          <Route path="build" element={<QuizBuilderPage />} />
          <Route path="live" element={<QuizLivePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
