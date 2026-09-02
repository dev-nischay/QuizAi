import { useNavigate } from "react-router-dom";
import { useResultStore } from "../../store/resultStore";
import { Trophy, Medal, Crown, LogOut } from "lucide-react";
import { resetQuizState } from "../../utils/resetQuizState";

export default function ResultsPage() {
  const nav = useNavigate();
  const finalResult = useResultStore((state) => state.finalResult);

  const sortedResults = [...finalResult].sort((a, b) => b.score - a.score);

  const handleExit = () => {
    resetQuizState();
    nav("/home");
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return {
          icon: <Crown className="w-5 h-5 text-amber-500" />,
          bg: "bg-amber-500/10 border-amber-500/30",
          text: "text-amber-600 dark:text-amber-400",
        };
      case 1:
        return {
          icon: <Medal className="w-5 h-5 text-slate-400" />,
          bg: "bg-slate-500/10 border-slate-500/30",
          text: "text-slate-600 dark:text-slate-300",
        };
      case 2:
        return {
          icon: <Medal className="w-5 h-5 text-orange-500" />,
          bg: "bg-orange-500/10 border-orange-500/30",
          text: "text-orange-600 dark:text-orange-400",
        };
      default:
        return {
          icon: <span className="font-mono text-sm font-bold">{index + 1}</span>,
          bg: "bg-slate-100 dark:bg-white/5 border-transparent",
          text: "text-slate-500 dark:text-slate-400",
        };
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B0E14] -z-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-2xl bg-white/70 dark:bg-[#141821]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-8 text-center border-b border-slate-200 dark:border-white/10 relative">
          <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-emerald-200 dark:border-emerald-500/30">
            <Trophy className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="font-sans font-bold text-3xl text-slate-900 dark:text-[#F1F3F7] tracking-tight">
            Final Standings
          </h1>
          <p className="text-slate-500 dark:text-[#8A93A3] mt-2 text-sm font-medium">
            The live session has ended. Here is how everyone performed.
          </p>
        </div>

        {/* Leaderboard List */}
        <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto space-y-3 custom-scrollbar">
          {sortedResults.length > 0 ? (
            sortedResults.map((player, index) => {
              const badge = getRankBadge(index);
              const isTop3 = index < 3;

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    isTop3
                      ? `${badge.bg} shadow-sm`
                      : "bg-white dark:bg-[#1A1F2A] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center border ${badge.bg} ${badge.text}`}
                    >
                      {badge.icon}
                    </div>
                    <span
                      className={`font-sans font-semibold text-lg ${isTop3 ? badge.text : "text-slate-700 dark:text-slate-200"}`}
                    >
                      {player.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl font-bold text-slate-900 dark:text-[#F1F3F7]">
                      {player.score.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      pts
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-500 dark:text-[#8A93A3] font-medium">
              No results data available.
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 sm:px-8 sm:py-6 bg-slate-50/50 dark:bg-[#0B0E14]/50 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <button
            onClick={handleExit}
            className="w-full sm:w-auto font-sans font-medium text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-4 py-2.5 flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
