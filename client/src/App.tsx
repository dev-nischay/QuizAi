import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import AuthPage from "./components/auth/AuthPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
