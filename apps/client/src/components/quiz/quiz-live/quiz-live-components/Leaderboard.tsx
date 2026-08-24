import { useAuthStore } from "../../../../store/authStore";
import { useLiveStore } from "../../../../store/liveStore";

export default function Leaderboard() {
  // const players = useLiveStore((state) => state.leaderBoard) ?? [];
  const players = [
    { name: "nischay", score: 400 },
    { name: "nischay", score: 200 },
    { name: "nischay", score: 200 },
    { name: "nischayUser", score: 100 },
  ];
  // const questionCount = useLiveStore((state) => state.quizDetails?.totalQuestionCount);
  // Local state for "who is the current user" — swap for real auth later
  const currentUsername = useAuthStore((state) => state.username);

  const sorted = [...players].sort((a, b) => b.score - a.score);

  const topFive = sorted.slice(0, 5);

  const youIndex = sorted.findIndex((p) => p.name.toLowerCase() === currentUsername.toLowerCase());
  const you = youIndex !== -1 ? sorted[youIndex] : null;
  const youRank = youIndex + 1; // 0 if not found

  return (
    <div className="flex flex-col h-50 bg-white/80 dark:bg-[#141821]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden animate-fade-in">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex items-center gap-2">
        <i className="ph-fill ph-trophy text-amber-500 text-xl"></i>
        <h3 className="font-sans font-bold text-slate-900 dark:text-[#F1F3F7]">Leaderboard</h3>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
        {topFive.map((player, index) => renderRow(player, index))}

        {sorted.length === 0 && (
          <div className="text-center p-6 text-sm text-slate-500 dark:text-slate-400 font-sans">No players yet.</div>
        )}

        {sorted.length > 0 && (
          <>
            <div className="pt-2 pb-1 px-1">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                You
              </span>
            </div>
            {you ? (
              renderRow(you, youIndex, true)
            ) : (
              <div className="text-center p-3 text-xs text-slate-500 dark:text-slate-400 font-sans">
                You haven't played yet.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
const getRankStyles = (index: number) => {
  let rankColor = "text-slate-400 dark:text-slate-500";
  let rankBg = "bg-slate-100 dark:bg-white/5";

  if (index === 0) {
    rankColor = "text-amber-600 dark:text-amber-400";
    rankBg = "bg-amber-100 dark:bg-amber-500/20";
  } else if (index === 1) {
    rankColor = "text-slate-600 dark:text-slate-300";
    rankBg = "bg-slate-200 dark:bg-slate-500/30";
  } else if (index === 2) {
    rankColor = "text-orange-700 dark:text-orange-400";
    rankBg = "bg-orange-100 dark:bg-orange-500/20";
  }

  return { rankColor, rankBg };
};

const renderRow = (player: { name: string; score: number }, index: number, isYou = false) => {
  const { rankColor, rankBg } = getRankStyles(index);

  return (
    <div
      key={index}
      className={`flex items-center justify-between p-2.5 rounded-lg transition-colors border group ${
        isYou
          ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20"
          : "border-transparent hover:bg-slate-50 dark:hover:bg-white/5 hover:border-slate-100 dark:hover:border-white/5"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-7 h-7 rounded-md flex items-center justify-center font-mono font-bold text-xs ${rankBg} ${rankColor}`}
        >
          {index + 1}
        </div>
        <span className="font-sans font-medium text-sm text-slate-700 dark:text-slate-200 truncate max-w-[120px]">
          {player.name}
          {isYou && (
            <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wide text-indigo-500 dark:text-indigo-400">
              You
            </span>
          )}
        </span>
      </div>
      <span className="font-mono font-semibold text-sm text-emerald-600 dark:text-emerald-400">{player.score}</span>
    </div>
  );
};
