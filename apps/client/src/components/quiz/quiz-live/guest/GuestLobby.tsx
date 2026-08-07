import { Users, Zap } from "lucide-react";
import { useLiveStore } from "../../../../store/liveStore";
import { useShallow } from "zustand/shallow";
import { PlayerInLobby } from "../quiz-live-components/PlayersInLobby";
export default function GuestLobby() {
  const quizDetails = useLiveStore(useShallow((state) => state.quizDetails));



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
                <h2 className="text-3xl font-black text-white mb-2">{quizDetails?.title}</h2>
                <p className="text-gray-400">Hosted by {quizDetails?.host}</p>
              </div>

              <div className="w-full mx-auto max-w-60 justify-center  ">
                <div className="p-4 bg-black/50 border border-gray-800 rounded-xl">
                  <div className="text-2xl font-black text-emerald-400">{quizDetails?.totalQuestionCount}</div>
                  <div className="text-xs text-gray-500 font-mono mt-1">QUESTIONS</div>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-mono">Waiting for host to start...</span>
              </div>

              <button
                className="w-full relative group overflow-hidden rounded-xl mt-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600" />
                <div className="relative px-6 py-4 font-black text-white uppercase tracking-wider flex items-center justify-center gap-3">
                  <Zap className="w-5 h-5" />
                  Ready to Play
                </div>
              </button>
            </div>
          </div>

          <PlayerInLobby />
        </div>
      </div>
    </div>
  );
}
