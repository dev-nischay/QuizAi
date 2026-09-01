import { Rocket } from "lucide-react";
import { OPTION_IDENTITIES_LIVE } from "./LiveDot";
import { LiveDot } from "./LiveDot";
import { useLiveStore } from "../../../../store/liveStore";
import { useShallow } from "zustand/shallow";

export function RealTimePoll() {
  const [currentQuestion, quizDetails, votes] = useLiveStore(
    useShallow((state) => [state.currentQuestion, state.quizDetails, state.votes]),
  );

  const totalVotes = votes.length;

  // Calculate distribution
  const voteCounts = [0, 0, 0, 0];
  votes.forEach((vote) => {
    if (vote.selectedOptionIndex >= 0 && vote.selectedOptionIndex <= 3) {
      voteCounts[vote.selectedOptionIndex]++;
    }
  });

  // Get recently voted (last 6) for activity feed
  const recentVotes = [...votes].reverse().slice(0, 6);

  return (
    <div className="w-full bg-white/80 dark:bg-[#141821]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden animate-fade-in flex flex-col lg:flex-row">
      {/* Main Poll Area */}
      <div className="flex-1 p-8  border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
            <LiveDot />
            <span className="font-sans font-semibold text-xs text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
              Live Poll
            </span>
          </div>
          {typeof currentQuestion?.currentQuestionIndex === "number" &&
            typeof quizDetails?.totalQuestionCount === "number" &&
            quizDetails?.totalQuestionCount > 0 && (
              <span className="font-mono text-xs font-semibold text-slate-400 dark:text-[#8A93A3] uppercase tracking-wider">
                Question {currentQuestion?.currentQuestionIndex + 1} of {quizDetails?.totalQuestionCount}
              </span>
            )}
        </div>

        <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
          <h1 className="font-sans font-bold sm:text-2xl  leading-tight text-slate-900 dark:text-white max-w-2xl">
            {currentQuestion?.text}
          </h1>

          <div className="hidden sm:flex flex-col items-end shrink-0">
            <span className="font-mono text-4xl font-bold text-slate-900 dark:text-white leading-none">
              {totalVotes}
            </span>
            <span className="font-sans text-xs font-medium text-slate-500 dark:text-[#8A93A3] uppercase tracking-wide mt-1">
              {totalVotes === 1 ? "Vote" : "Votes"}
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {currentQuestion!.options.map((optText, index) => {
            const identity = OPTION_IDENTITIES_LIVE[index];
            const count = voteCounts[index];
            const percentage = totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100);

            return (
              <div
                key={index}
                className="relative w-[35rem] h-20  rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1A1F2A] overflow-hidden flex items-center px-5 sm:px-6 z-0 transition-colors"
              >
                {/* Dynamic Progress Fill Background */}
                <div
                  className={`absolute left-0 top-0 h-full ${identity.fill} opacity-15 dark:opacity-20 z-[-1] transition-all duration-700 ease-out`}
                  style={{ width: `${percentage}%` }}
                ></div>

                {/* Highlight border on the left matching progress */}
                <div
                  className={`absolute left-0 top-0 h-full w-2 ${identity.fill} transition-all duration-700 ease-out`}
                ></div>

                {/* Content Wrapper */}
                <div className="flex w-full justify-between items-center z-10">
                  <div className="flex items-center gap-4 sm:gap-5 truncate pr-4 min-w-0">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${identity.barBg} ${identity.border} border shadow-sm shrink-0">
                      <span className={`text-xl sm:text-2xl leading-none ${identity.colorHex}`}>{identity.shape}</span>
                    </div>
                    <span className="font-sans font-semibold text-lg 2xl:text-xl text-slate-800 dark:text-[#F1F3F7] truncate min-w-0 flex-1">
                      {optText}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                    <span className="hidden sm:block font-sans text-md font-medium text-slate-500 dark:text-slate-400">
                      {count} <span className="opacity-70">votes</span>
                    </span>
                    <span className="font-mono font-bold text-2xl s text-slate-900 dark:text-white w-14 sm:w-16 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Activity Feed Area */}
      <div className="w-full lg:w-52 bg-slate-50/50 dark:bg-[#0B0E14]/30 p-6 sm:p-8 flex flex-col h-56 lg:h-auto">
        <h3 className="font-sans font-semibold text-xs text-slate-500 dark:text-[#8A93A3] uppercase tracking-widest mb-5 flex items-center gap-2">
          <i className="ph-bold ph-activity"></i> Live Activity
        </h3>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
          {recentVotes.length === 0 ? (
            <p className="text-sm font-sans text-slate-400 dark:text-slate-500 italic">Waiting for responses...</p>
          ) : (
            recentVotes.map((vote, idx) => {
              const identity = OPTION_IDENTITIES_LIVE[vote.selectedOptionIndex];
              return (
                <div key={idx} className="flex items-center gap-3 animate-fade-in text-sm">
                  <div className={`w-2.5 h-2.5 rounded-full ${identity.fill}`}></div>
                  <span className="font-sans font-medium text-slate-700 dark:text-slate-300 truncate">{vote.name}</span>
                  <span className="font-sans text-slate-400 dark:text-slate-500">
                    <Rocket size={14} />
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
