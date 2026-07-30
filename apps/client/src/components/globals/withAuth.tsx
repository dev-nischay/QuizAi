import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export const WithAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem("Authorization")?.split(" ")[1] as string | null;

    if (!token || token.length === 0) {
      window.location.replace("/");
    }
  }, []);

  return <Outlet />;
};
