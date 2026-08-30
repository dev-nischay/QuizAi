import { Outlet, Navigate } from "react-router-dom";

export const WithAuth = () => {
  const token = localStorage.getItem("Authorization")?.split(" ")[1];

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
