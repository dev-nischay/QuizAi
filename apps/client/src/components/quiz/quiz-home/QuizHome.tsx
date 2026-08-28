import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { Rocket, Users } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import type { ApiError, ApiResponse } from "@common/contracts";
import { checkQuiz } from "../../../services/checkQuiz";

export type RoomProps = {
  roomCode: string;
  onClose: () => void;
};

export default function QuizHomePage() {
  const [roomCode, setRoomCode] = useState("");
  const [joinStatus, setJoinStatus] = useState({ type: "", message: "" });
  const setRole = useAuthStore((state) => state.setRole);
  const nav = useNavigate();
  const [isJoining, setIsJoining] = useState<boolean>(false);

  const checkMutation = useMutation<
    ApiResponse<{
      success: true;
      quiz: {
        _id: string;
      };
    }>,
    ApiError,
    {
      roomCode: string;
    }
  >({
    mutationFn: checkQuiz,
    onSuccess: () => {
      if (roomCode.trim().length >= 5) {
        console.log("Joining room:", roomCode);
        setRole("guest");
        setJoinStatus({ type: "success", message: "Connecting to room..." });

        // nav("/live") uncomment this when live page is completed
        alert("redirect to live page now ");

        setTimeout(() => {
          setIsJoining(false);
          setJoinStatus({ type: "", message: "" });
          setRoomCode("");
        }, 1500);
      }
    },
    onError: (err) => {
      console.log(err);
      setJoinStatus({ type: "error", message: err.error });
      setIsJoining(false);
      setTimeout(() => setJoinStatus({ type: "", message: "" }), 3000);
    },
  });

  const handleCreateQuiz = () => {
    console.log("redirecting to quiz builder");
    setRole("host");
    nav("/build");
  };

  const handleJoinQuiz = (e: any) => {
    e.preventDefault();

    const code = roomCode.trim().toUpperCase();

    if (code.length < 6) {
      setJoinStatus({ type: "error", message: "Room code must be at least 6 characters." });
      setTimeout(() => setJoinStatus({ type: "", message: "" }), 3000);
      return;
    }

    setIsJoining(true);
    setJoinStatus({ type: "", message: "" });

    checkMutation.mutate({ roomCode });
    return;
  };

  const handleCodeChange = (e: any) => {
    const val = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6);
    setRoomCode(val);
  };

  return (
    <div className="relative flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden min-h-screen">
      {/* Main Content */}
      <div className="w-full max-w-4xl z-10 flex flex-col items-center mt-16 ">
        {/* Header Text */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-slate-900 dark:text-[#F1F3F7] leading-tight tracking-tight mb-4">
            Welcome back to the arena.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-sans max-w-xl mx-auto leading-relaxed">
            Are you ready to host the next big event, or dive into a live session? Choose your path below.
          </p>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          {/* Create Quiz Card */}
          <div className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#141821]/80 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-emerald-500/30 dark:hover:border-emerald-400/30 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
            {/* Background flare */}
            <div className="absolute  -top-24 -right-24 w-48 h-48 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

            <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 shadow-sm border border-emerald-200 dark:border-emerald-500/30 relative z-10">
              <i className="ph-fill ph-rocket-launch text-2xl  group-hover:scale-110 transition-transform p-2.5 flex justify-center items-center size-10">
                <Rocket />
              </i>
            </div>

            <h2 className="text-xl font-bold font-sans text-slate-900 dark:text-[#F1F3F7] mb-2 relative z-10">
              Create a Quiz
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-sans mb-8 flex-grow relative z-10">
              Build an interactive quiz from scratch or use AI to generate questions in seconds. Host it live for your
              audience.
            </p>

            <button
              onClick={handleCreateQuiz}
              className="w-full font-sans font-semibold text-sm text-white bg-emerald-600 dark:bg-emerald-400 dark:text-slate-900 hover:brightness-105 active:brightness-95 rounded-lg px-5 py-3 inline-flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),_0_12px_32px_-16px_rgba(0,0,0,0.6)] qz-focusable relative z-10"
            >
              New Quiz
            </button>
          </div>

          {/* Join Quiz Card */}
          <div className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#141821]/80 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-indigo-500/30 dark:hover:border-indigo-400/30 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

            <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 shadow-sm border border-indigo-200 dark:border-indigo-500/30 relative z-10">
              <i className="ph-fill ph-users-three text-2xl group-hover:scale-110 transition-transform flex justify-center items-center p-2.5 size-10">
                <Users />
              </i>
            </div>

            <h2 className="text-xl font-bold font-sans text-slate-900 dark:text-[#F1F3F7] mb-2 relative z-10">
              Join a Quiz
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-sans mb-6 relative z-10">
              Got a room code from your host? Enter it below to join the live session immediately.
            </p>

            <form onSubmit={handleJoinQuiz} className="mt-auto relative z-10 flex flex-col gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"></div>
                <input
                  type="text"
                  value={roomCode}
                  onChange={handleCodeChange}
                  placeholder="Enter 6-digit code"
                  className="w-full bg-slate-50 dark:bg-[#1A1F2A] border border-slate-200 dark:border-white/10 rounded-lg py-3 pl-10 pr-4 font-mono font-medium text-lg text-slate-900 dark:text-[#F1F3F7] placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-sans placeholder:text-sm qz-focusable transition-colors text-center tracking-widest"
                />
              </div>

              {/* Status Message */}
              {joinStatus.message && (
                <div
                  className={`text-xs font-sans font-medium px-1 animate-fadeIn ${joinStatus.type === "error" ? "text-rose-500" : "text-emerald-500"}`}
                >
                  {joinStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isJoining || roomCode.length === 0}
                className="w-full font-sans font-medium text-sm rounded-lg px-5 py-3 inline-flex items-center justify-center gap-2 border transition-all cursor-pointer qz-focusable bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 border-transparent shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isJoining ? (
                  <i className="ph-bold ph-spinner animate-spin text-lg"></i>
                ) : (
                  <i className="ph-bold ph-arrow-right text-lg"></i>
                )}
                {isJoining ? "Connecting..." : "Join Room"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
