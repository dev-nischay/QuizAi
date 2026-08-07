import { useEffect } from "react";
import LiveNav from "./quiz-live-components/LiveNav";
import HostLobby from "./host/HostLobby";
import HostActive from "./host/HostActive";
import GuestLobby from "./guest/GuestLobby";
import GuestActive from "./guest/GuestActive";
import { useAuthStore } from "../../../store/authStore";
import { useLiveStore } from "../../../store/liveStore";
import { socketService } from "../../../live/socket-client";
import { useRoomStore } from "../../../store/roomStore";
import { useSocket } from "../../../live/socketHook";
import Loading from "../../globals/Loading";
import Error from "../../globals/Error";

export default function QuizLivePage() {
  const phase = useLiveStore((state) => state.phase);
  const liveUsers = useLiveStore((state) => state.liveUsers);

  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const username = useAuthStore((state) => state.username);

  const quizId = useRoomStore((state) => state.roomCode);

  const { connect, loading, error } = useSocket({ token, role, quizId, username });

  useEffect(() => {
    connect();
    return () => {
      socketService.disconnect();
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={String(error)} />;
  }

  return (
    <div className="w-full min-h-screen   ">
      <LiveNav currentPlayers={liveUsers.length ?? 0} />
      <div className=" mt-28 lg:mt-0 max-w-7xl mx-auto  lg:px-4 lg:py-2">
        {phase === "lobby" && role === "host" && <HostLobby />}
        {phase === "active" && role === "host" && <HostActive />}

        {phase === "lobby" && role === "guest" && <GuestLobby />}
        {phase === "active" && role === "guest" && <GuestActive />}
      </div>
    </div>
  );
}
