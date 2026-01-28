import { useState } from "react";
import LiveNav from "./quiz-live-components/LiveNav";
import HostLobby from "./host/HostLobby";
import HostActive from "./host/HostActive";
import HostResult from "./host/HostResult";
import GuestLobby from "./guest/GuestLobby";
import GuestActive from "./guest/GuestActive";
import GuestResult from "./guest/GuestResult";
export default function QuizLivePage() {
  const [quizState, setQuizState] = useState<"lobby" | "active" | "result">("result");
  const [role, setRole] = useState<"host" | "guest">("guest");
  return (
    <div className="w-full min-h-screen   ">
      <LiveNav />
      <div className=" mt-28 lg:mt-0 max-w-7xl mx-auto  lg:px-4 lg:py-2">
        {quizState === "lobby" && role === "host" && <HostLobby />}
        {quizState === "active" && role === "host" && <HostActive />}
        {quizState === "result" && role === "host" && <HostResult />}

        {quizState === "lobby" && role === "guest" && <GuestLobby />}
        {quizState === "active" && role === "guest" && <GuestActive />}
        {quizState === "result" && role === "guest" && <GuestResult />}
      </div>
    </div>
  );
}
