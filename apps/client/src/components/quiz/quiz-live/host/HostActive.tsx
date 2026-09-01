import Leaderboard from "../quiz-live-components/Leaderboard";
import { useRef, useState } from "react";
import { useLiveStore } from "../../../../store/liveStore";
import { endQuiz } from "../../../../live/handlers/host/stopQuiz";
import { showQuestion } from "../../../../live/handlers/host/showQuestion";
import { socketService } from "../../../../live/socket-client";
import { useShallow } from "zustand/shallow";
import { RealTimePoll } from "../quiz-live-components/LivePolls";
import { LiveAnswerKey } from "../quiz-live-components/LiveAnswerKey";
export default function HostLive() {
  const [currentQuestion, quizDetails] = useLiveStore(
    useShallow((state) => [state.currentQuestion, state.quizDetails]),
  );

  const [showResult, setShowResult] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleResult = () => {
    setShowResult(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowResult(false);
    }, 3000);
  };

  return (
    <div className="w-full lg:max-w-6xl  2xl:max-w-[96rem] mx-auto flex flex-col lg:flex-row gap-6 pt-24 pb-12 px-6  2xl:mt-36 ">
      {/* Left: Main Question Area (hero) */}
      <div className="flex-1 flex flex-col gap-6 animate-fadeIn ">
        <RealTimePoll />

        <div className="bg-white/80 dark:bg-[#141821]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => socketService.sendMessage(endQuiz())}
              className="font-sans font-medium text-sm text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-rose-400 hover:bg-red-50 dark:hover:bg-rose-500/10 px-3.5 py-3 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <i className="ph-bold ph-x-circle text-base"></i>
              End Quiz Early
            </button>

            <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1"></div>

            <button
              onClick={toggleResult}
              className={`font-sans font-semibold text-sm rounded-lg px-5 py-3 flex items-center gap-2 transition-all shadow-sm ${
                showResult
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-500/25"
                  : "text-white bg-emerald-600 dark:bg-emerald-400 dark:text-slate-900 hover:brightness-105 active:brightness-95"
              }`}
            >
              <i className={`ph-bold ${showResult ? "ph-eye-slash" : "ph-eye"} text-base`}></i>
              {showResult ? "Hide Answer" : "Show Answer"}
            </button>
          </div>

          <button
            onClick={() => socketService.sendMessage(showQuestion())}
            className="group font-sans font-semibold text-sm text-white bg-emerald-600 dark:bg-emerald-400 dark:text-slate-900 hover:brightness-105 active:brightness-95 rounded-lg px-6 py-3 flex items-center gap-2 transition-all shadow-sm"
          >
            {currentQuestion?.currentQuestionIndex! < quizDetails?.totalQuestionCount! - 1
              ? "Next Question"
              : "Finish Quiz"}
            <i className="ph-bold ph-arrow-right text-base transition-transform group-hover:translate-x-0.5"></i>
          </button>
        </div>
      </div>

      {/* Right: Leaderboard + tiny answer key */}
      <div className="lg:w-80 2xl:w-[30%] flex flex-col gap-4 ">
        <Leaderboard />
        <LiveAnswerKey
          options={currentQuestion!.options}
          correctOptionIndex={currentQuestion!.correctOptionIndex!}
          revealed={showResult}
        />
      </div>
    </div>
  );
}
