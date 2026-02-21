import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function Error({ message = "Something went wrong" }: { message: string }) {
  return (
    <div className=" bg-black/60  flex items-center justify-center fixed inset-0 overflow-hidden">
      {/* Animated background */}
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-2xl rounded-3xl border border-red-500/30 overflow-hidden">
          {/* Top border glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>

          <div className="p-12 text-center">
            {/* Error Icon */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-red-500 blur-3xl opacity-50 animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center border border-red-400/30">
                <AlertCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Error Message */}
            <h2 className="text-3xl font-black text-white mb-3">Oops! Error Detected</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto capitalize">{message}</p>

            {/* Error Code Display */}
            <div className="bg-black/50 border border-red-500/20 rounded-xl p-4 mb-8 font-mono text-red-400 text-sm ">
              ERROR_CODE: SYSTEM_FAILURE_001
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="relative group overflow-hidden px-8 py-4 rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                <div className="relative font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </div>
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-800 transition-all text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Go Home
              </button>
            </div>
          </div>

          {/* Bottom border glow */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
