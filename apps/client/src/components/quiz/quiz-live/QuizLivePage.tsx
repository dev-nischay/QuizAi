import { useEffect } from "react";
import LiveNav from "./quiz-live-components/LiveNav";
import HostLobby from "./host/HostLobby";
import HostActive from "./host/HostActive";
import HostResult from "./host/HostResult";
import GuestLobby from "./guest/GuestLobby";
import GuestActive from "./guest/GuestActive";
import GuestResult from "./guest/GuestResult";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useLiveStore } from "../../../store/liveStore";
import { socketService } from "../../../live/socket-client";
import { useRoomStore } from "../../../store/roomStore";
export default function QuizLivePage() {
  const phase = useLiveStore((state) => state.phase);
  const liveUsers = useLiveStore((state) => state.liveUsers);

  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);

  const quizId = useRoomStore((state) => state.roomCode);
  const nav = useNavigate();

  useEffect(() => {
    if (!role || !quizId) {
      nav("/home");
      return;
    }

    socketService.connect(token, role, quizId);

    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <div className="w-full min-h-screen   ">
      <LiveNav currentPlayers={liveUsers.length ?? 0} />
      <div className=" mt-28 lg:mt-0 max-w-7xl mx-auto  lg:px-4 lg:py-2">
        {phase === "lobby" && role === "host" && <HostLobby />}
        {phase === "active" && role === "host" && <HostActive />}
        {phase === "results" && role === "host" && <HostResult />}

        {phase === "lobby" && role === "guest" && <GuestLobby />}
        {phase === "active" && role === "guest" && <GuestActive />}
        {phase === "results" && role === "guest" && <GuestResult />}
      </div>
    </div>
  );
}
