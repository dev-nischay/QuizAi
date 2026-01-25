import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import AuthPage from "./components/auth/AuthPage";
import QuizHome from "./components/quiz/quiz-home/QuizHome";
import QuizBuilderPage from "./components/quiz/quiz-build/QuizBuilderPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AuthPage />} />
          <Route path="home" element={<QuizHome />} />
          <Route path="build" element={<QuizBuilderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
