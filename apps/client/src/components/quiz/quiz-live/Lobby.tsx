import { useLiveStore } from "../../../store/liveStore";
import { useShallow } from "zustand/shallow";
import { LiveDot } from "./quiz-live-components/LiveDot";
import { PrimaryButton } from "../../globals/Button";
import { PlayerInLobby } from "./quiz-live-components/PlayersInLobby";
import { socketService } from "../../../live/socket-client";
import { showQuestion } from "../../../live/handlers/host/showQuestion";

export default function Lobby({ role }: { role: string | null }) {
  const onStart = () => {
    if (role === "host") {
      socketService.sendMessage(showQuestion());
      console.log("starting quiz");
    }
  };

  return (
    <div className="mt-16">
      <main className="flex-grow flex items-center justify-center w-full mt-16 sm:mt-0 pb-24 sm:pb-0">
        <LobbySection />
      </main>
      <footer>
        <div
          className="animate-fadeIn flex flex-col items-center justify-center w-full"
          style={{ animationDelay: "300ms" }}
        >
          {role === "host" ? (
            <PrimaryButton Icon={() => <i className="ph-fill ph-play text-xl" />} onClick={onStart}>
              Start session
            </PrimaryButton>
          ) : (
            <div className="flex items-center gap-3 font-sans font-medium text-sm sm:text-base text-slate-600 dark:text-[#8A93A3] bg-white dark:bg-[#1A1F2A] border border-slate-200 dark:border-white/10 px-6 py-4 rounded-xl shadow-sm">
              <LiveDot />
              Waiting for host to start...
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}

function LobbySection() {
  const quizDetails = useLiveStore(useShallow((state) => state.quizDetails));
  const liveUsers = useLiveStore(useShallow((state) => state.liveUsers));
  return (
    <div className="flex flex-col items-center  w-full max-w-5xl mx-auto mt-16 ">
      <div className="animate-fadeIn flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 mb-6 sm:mb-8 shadow-sm">
        <LiveDot />
        <span className="font-sans font-semibold text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
          Room open
        </span>
      </div>

      <div
        className="animate-fadeIn font-mono-plex font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-[0.15em] text-slate-900 dark:text-[#F1F3F7] mb-6 sm:mb-8 drop-shadow-sm select-all text-center"
        style={{ animationDelay: "50ms" }}
      >
        <span className="text-emerald-600 dark:text-emerald-400">{quizDetails?.roomCode}</span>
      </div>

      {/* Quiz Title */}
      <h1
        className="animate-fadeIn font-sans font-bold text-2xl sm:text-3xl text-slate-900 dark:text-[#F1F3F7] mb-3 text-center px-4"
        style={{ animationDelay: "100ms" }}
      >
        {quizDetails?.title}
      </h1>

      <p
        className="animate-fadeIn font-sans text-sm text-slate-500 dark:text-[#8A93A3] mb-3 text-center"
        style={{ animationDelay: "125ms" }}
      >
        Hosted by <span className="font-semibold text-slate-700 dark:text-[#F1F3F7]">{quizDetails?.host}</span>
      </p>

      <p
        className="animate-fadeIn font-sans text-sm text-slate-500 dark:text-[#8A93A3] mb-3 text-center"
        style={{ animationDelay: "125ms" }}
      >
        total questions:
        <span className="font-semibold text-slate-700 dark:text-[#F1F3F7]">{quizDetails?.totalQuestionCount}</span>
      </p>

      {/* Participant Count */}
      <div
        className="animate-fadeIn flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-slate-500 dark:text-[#8A93A3] mb-10 sm:mb-12 bg-white/50 dark:bg-[#1A1F2A]/50 px-4 py-1.5 rounded-lg border border-slate-200 dark:border-white/5"
        style={{ animationDelay: "150ms" }}
      >
        <i className="ph-fill ph-users w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500"></i>
        {liveUsers.length} participant{liveUsers.length !== 1 && "s"} joined
      </div>

      <PlayerInLobby />
    </div>
  );
}
