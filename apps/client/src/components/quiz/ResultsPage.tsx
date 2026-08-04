import { Trophy, Zap, Award } from "lucide-react";
import { useLiveStore } from "../../store/liveStore";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function QuizResultsPage() {
  const username = useAuthStore((state) => state.username);
  // const leaderboard = useLiveStore((state) => state.leaderBoard);
  const leaderboard = [
    {
      name: "nischay",
      score: 200,
    },
    {
      name: "dhwanit",
      score: 400,
    },
    {
      name: "anonymous12",
      score: 800,
    },
    {
      name: "random123",
      score: 900,
    },
    {
      name: "him",
      score: 100,
    },
  ];
  const nav = useNavigate();

  const sortedLeaderboard = [...leaderboard]
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

  const userData = sortedLeaderboard.find((user) => user.name === username);

  return (
    <div className=" text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Your Stats */}
          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-emerald-500/30 rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Quiz Complete!</h2>
            <p className="text-gray-400 mb-6">Great job! Here&apos;s how you performed</p>

            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              <div className="p-4 bg-black/50 border border-gray-800 rounded-xl">
                <div className="text-3xl font-black text-emerald-400">{userData?.score}</div>
                <div className="text-xs text-gray-500 font-mono mt-1">FINAL SCORE</div>
              </div>
              <div className="p-4 bg-black/50 border border-gray-800 rounded-xl">
                <div className="text-3xl font-black text-teal-400">{userData?.rank}</div>
                <div className="text-xs text-gray-500 font-mono mt-1">PLACE</div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-emerald-500/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-400" />
              Final Leaderboard
            </h3>

            <div className="space-y-3">
              {sortedLeaderboard.map((player, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    player.name === username
                      ? "bg-emerald-500/20 border-2 border-emerald-500"
                      : "bg-black/50 border border-gray-800"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                      player.rank === 1
                        ? "bg-yellow-500 text-black"
                        : player.rank === 2
                          ? "bg-gray-400 text-black"
                          : player.rank === 3
                            ? "bg-amber-700 text-white"
                            : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {player.rank}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">{player.name}</span>
                      {player.name === username && (
                        <span className="px-2 py-0.5 bg-emerald-500/30 border border-emerald-500/50 rounded text-xs font-mono text-emerald-400">
                          YOU
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-black text-emerald-400 font-mono">{player.score}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid sm:grid-cols-2 gap-4">
            <button onClick={() => nav("/home")} className="relative group overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600" />
              <div className="relative px-6 py-4 font-bold text-white flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Play Again
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
