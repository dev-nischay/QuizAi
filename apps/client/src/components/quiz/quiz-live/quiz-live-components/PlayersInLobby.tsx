import { Users } from "lucide-react";
import { useLiveStore } from "../../../../store/liveStore";
import { getInitials } from "../../../../utils/getInitials";
export const PlayerInLobby = () => {
  const AVATAR_COLORS = [
    "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
    "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
    "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200 dark:border-rose-500/20",
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20",
  ];

  const players = useLiveStore((state) => state.liveUsers);

  return (
    <div className="w-full min-h-[160px] flex flex-col items-center mb-10 sm:mb-14">
      {players.length === 0 ? (
        <div
          className="qz-fade-in flex flex-col items-center justify-center h-full opacity-50 py-10"
          style={{ animationDelay: "200ms" }}
        >
          <i className="ph ph-ghost text-4xl mb-3"></i>
          <p className="text-sm">Waiting for players to join...</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-8 w-full">
          {players.map((name, i) => {
            const colorClass = AVATAR_COLORS[name.length % AVATAR_COLORS.length];

            return (
              <div
                key={`${name}-${i}`}
                className="qz-fade-in flex flex-col items-center gap-2.5 group"
                style={{ animationDelay: `${Math.min(i * 40, 800)}ms` }}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border flex items-center justify-center font-sans font-bold text-lg sm:text-xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md ${colorClass}`}
                >
                  {getInitials(name)}
                </div>
                <span
                  className="font-sans text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 text-center w-full truncate px-1"
                  title={name}
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
