import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import AuthPage from "./components/auth/AuthPage";
import QuizHome from "./components/quiz/quiz-home/QuizHome";
import QuizBuilderPage from "./components/quiz/quiz-build/QuizBuilderPage";
import QuizLivePage from "./components/quiz/quiz-live/QuizLivePage";
import NotFoundPage from "./components/globals/NotFoundPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WithAuth } from "./components/globals/withAuth";
import QuizResultsPage from "./components/quiz/ResultsPage";

const query = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={query}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<AuthPage />} />

            <Route element={<WithAuth />}>
              <Route path="home" element={<QuizHome />} />
              <Route path="build" element={<QuizBuilderPage />} />
              <Route path="live" element={<QuizLivePage />} />
              <Route path="results" element={<QuizResultsPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
