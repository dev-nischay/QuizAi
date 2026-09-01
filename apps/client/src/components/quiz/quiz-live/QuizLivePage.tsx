import Lobby from "./Lobby";
import { useAuthStore } from "../../../store/authStore";
import { useLiveStore } from "../../../store/liveStore";
import { socketService } from "../../../live/socket-client";
import { useSocket } from "../../../live/socketHook";
import { Loading } from "../../globals/Loading";
import { ErrorModal } from "../../globals/Error";
import { useEffect } from "react";
import HostLive from "./host/HostActive";
import { GuestLive } from "./guest/GuestActive";
import { useNavigate } from "react-router-dom";

export default function QuizLivePage() {
  const phase = useLiveStore((state) => state.phase);
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const username = useAuthStore((state) => state.username);
  const roomCode = useAuthStore((state) => state.roomCode);
  const nav = useNavigate();
  const { connect, loading, error } = useSocket({ token, role, quizId: roomCode, username });

  useEffect(() => {
    connect();
    return () => {
      socketService.disconnect();
    };
  }, []);

  if (error) {
    return <ErrorModal onClose={() => nav("/home")} onHome={() => nav("/home")} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className=" relative flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden ">
      {phase === "lobby" && <Lobby role={role} />}

      {phase === "active" && role === "host" && <HostLive />}

      {phase === "active" && role === "guest" && <GuestLive />}
    </div>
  );
}
