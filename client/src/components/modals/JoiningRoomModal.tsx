// for redirecting guest to main lobby
import { useState, useEffect } from "react";
import { X, Users } from "lucide-react";
import type { JoinQuizModalProps } from "./modal.types";

export function JoinQuizModal({ roomCode, onClose, onJoin }: JoinQuizModalProps) {
  const [countdown, setCountdown] = useState(5);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    if (countdown > 0 && !isJoining) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isJoining) {
      setIsJoining(true);
      setTimeout(() => {
        onJoin?.();
      }, 1000);
    }
  }, [countdown, isJoining, onJoin]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative max-w-md w-full">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-teal-600/20 to-emerald-600/20 rounded-3xl blur-3xl"></div>

        <div className="relative bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-2xl rounded-3xl border border-emerald-500/30 overflow-hidden">
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
            {/* Animated Icon */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-50 animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-400/30 animate-pulse">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-black text-white mb-2">Joining Room</h2>
            <p className="text-gray-400 text-sm mb-8">Get ready for an awesome quiz experience!</p>

            {/* Room Code Display */}
            <div className="bg-black/50 border border-emerald-500/30 rounded-2xl p-6 mb-6">
              <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3">Room Code</div>
              <div className="text-5xl font-black tracking-wider">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                  {roomCode}
                </span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto">
                {/* Circular progress */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-800"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-emerald-500"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - (5 - countdown) / 5)}`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-black text-emerald-400">{countdown}</div>
                    <div className="text-xs text-gray-500 font-mono uppercase mt-1">
                      {countdown === 0 ? "Joining" : "seconds"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            {isJoining && (
              <div className="flex items-center justify-center gap-2 text-emerald-400">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <span className="font-mono text-sm uppercase">Connecting</span>
              </div>
            )}

            {!isJoining && (
              <button
                onClick={() => {
                  setCountdown(0);
                  setIsJoining(true);
                }}
                className="text-emerald-400 hover:text-emerald-300 font-semibold text-sm underline"
              >
                Join now
              </button>
            )}
          </div>

          {/* Bottom border glow */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
