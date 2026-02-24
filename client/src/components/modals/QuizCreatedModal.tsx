// for redirecting host to main lobby

import { useState } from "react";
import { Check, Copy, Radio, X } from "lucide-react";
import type { QuizCreateModalProps } from "./modal.types";

export function QuizCreatedModal({ roomCode, questionCount, onClose, onGoToLobby }: QuizCreateModalProps) {
  const [copied, setCopied] = useState(false);
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative max-w-lg w-full">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 via-teal-600/30 to-emerald-600/30 rounded-3xl blur-3xl animate-pulse"></div>

        <div className="relative bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-2xl rounded-3xl border border-emerald-500/40 overflow-hidden">
          {/* Top border glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 text-center">
            {/* Success Icon */}
            <div className="relative w-28 h-28 mx-auto mb-6">
              <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-60 animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-full flex items-center justify-center border-4 border-emerald-400/50">
                <Check className="w-14 h-14 text-white" />
              </div>
            </div>

            {/* Success Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/50 px-4 py-2 rounded-full mb-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 font-bold uppercase text-sm tracking-wider">Quiz Created</span>
            </div>

            <h2 className="text-4xl font-black text-white mb-2">Ready to Go Live!</h2>
            <p className="text-gray-400 text-sm mb-8">Your quiz is ready. Head to the lobby to start.</p>

            {/* Room Code */}
            <div className="bg-black/50 border border-emerald-500/30 rounded-2xl p-6 mb-6">
              <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3">Room Code</div>
              <div className="flex items-center justify-center gap-4">
                <div className="text-5xl font-black tracking-widest">
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                    {roomCode}
                  </span>
                </div>
                <button
                  onClick={copyRoomCode}
                  className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/20 transition-all text-emerald-400"
                  title="Copy room code"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Quiz Info */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                <div className="text-3xl font-black text-emerald-400">{questionCount}</div>
                <div className="text-xs text-gray-500 font-mono mt-1">Questions</div>
              </div>
              <div className="bg-teal-500/5 border border-teal-500/20 rounded-xl p-4">
                <div className="text-3xl font-black text-teal-400">0</div>
                <div className="text-xs text-gray-500 font-mono mt-1">Players</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button onClick={onGoToLobby} className="w-full relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                <div className="relative px-6 py-4 font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2">
                  <Radio className="w-5 h-5" />
                  Go to Lobby
                </div>
              </button>

              <p className="text-xs text-gray-600">You'll be able to go live once you're in the lobby</p>
            </div>
          </div>

          {/* Bottom border glow */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
