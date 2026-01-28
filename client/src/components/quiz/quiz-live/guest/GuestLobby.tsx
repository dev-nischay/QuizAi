import { Users, Zap } from "lucide-react";

export default function GuestLobby() {
  // Mock data for lobby view only
  const quizData = {
    title: "Advanced JavaScript Concepts",
    hostName: "Sarah Chen",
    totalQuestions: 5,
  };

  const players = ["You", "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "john smith"];

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Lobby Header / Status */}
          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-emerald-500/30 rounded-2xl p-8 text-center">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="w-10 h-10" />
              </div>

              <div>
                <h2 className="text-3xl font-black text-white mb-2">{quizData.title}</h2>
                <p className="text-gray-400">Hosted by {quizData.hostName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="p-4 bg-black/50 border border-gray-800 rounded-xl">
                  <div className="text-2xl font-black text-emerald-400">{quizData.totalQuestions}</div>
                  <div className="text-xs text-gray-500 font-mono mt-1">QUESTIONS</div>
                </div>
                <div className="p-4 bg-black/50 border border-gray-800 rounded-xl">
                  <div className="text-2xl font-black text-teal-400">12</div>
                  <div className="text-xs text-gray-500 font-mono mt-1">PLAYERS</div>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-mono">Waiting for host to start...</span>
              </div>

              <button className="w-full relative group overflow-hidden rounded-xl mt-4">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600" />
                <div className="relative px-6 py-4 font-black text-white uppercase tracking-wider flex items-center justify-center gap-3">
                  <Zap className="w-5 h-5" />
                  Ready to Play
                </div>
              </button>
            </div>
          </div>

          {/* Players in Lobby */}
          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-emerald-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              Players in Lobby
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {players.map((name, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-black/50 border border-gray-800 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-sm font-bold">
                    {name[0]}
                  </div>
                  <span className="text-sm text-white font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
