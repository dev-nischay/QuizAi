import { Brain } from "lucide-react";

export default function Loading() {
  return (
    <div className=" fixed inset-0  bg-black flex items-center justify-center  overflow-hidden">
      {/* Animated background */}

      <div className="relative z-10 text-center">
        {/* Animated Brain Icon */}
        <div className="relative size-24 lg:size-28   mx-auto mb-8">
          <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-50 animate-pulse"></div>
          <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-3xl flex items-center justify-center animate-bounce">
            <Brain className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-3xl font-black mb-4">
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
            Loading
          </span>
        </h2>

        {/* Animated Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"
            style={{ width: "60%" }}
          ></div>
        </div>

        <p className="text-gray-500 text-sm mt-6 font-mono capitalize tracking-wider">This won’t take long . . .</p>
      </div>
    </div>
  );
}
