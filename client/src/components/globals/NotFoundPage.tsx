import { Zap, Home, RefreshCw } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className=" min-h-screen  bg-transparent flex justify-center items-center relative overflow-hidden">
      <div>
        <div className="relative z-10 first-letter: max-w-4xl mx-auto px-6 text-center">
          {/* Large 404 */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[200px] font-black leading-none mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                404
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-500"></div>
              <Zap className="w-6 h-6 text-emerald-500 animate-pulse" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-500"></div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-2xl rounded-3xl border border-emerald-500/30 p-12 mb-8">
            <h2 className="text-4xl font-black text-white mb-4">Page Not Found</h2>
            <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
              The page you're looking for seems to have vanished into the digital void. It might have been moved,
              deleted, or never existed in the first place.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => (window.location.href = "/")}
                className="relative group overflow-hidden px-8 py-4 rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                <div className="relative font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2">
                  <Home className="w-5 h-5" />
                  Back to Home
                </div>
              </button>

              <button
                onClick={() => window.history.back()}
                className="px-8 py-4 bg-black/30 border border-emerald-500/30 rounded-xl hover:bg-black/50 hover:border-emerald-500/50 transition-all text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
