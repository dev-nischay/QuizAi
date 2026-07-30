import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";

export const WithAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem("Authorization")?.split(" ")[1] as string | null;

    if (!token || token.length === 0) {
      <Navigate to={"/"} replace></Navigate>;
    }
  }, []);

  return <Outlet />;
};
