import { useNavigate } from "react-router-dom";
export default function NotFoundPage({ code = 404, message = "Page not found" }) {
  const nav = useNavigate();
  return (
    <div className="relative flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden  h-screen">
      {/* Main Content Area */}
      <div className="z-10 flex flex-col items-center justify-center text-center mt-12 sm:mt-0 max-w-2xl w-full animate-fade-in">
        {/* Error Code Container */}
        <div className="relative mb-6">
          {/* Decorative blur behind the error code */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-rose-500/20 dark:bg-rose-400/20 blur-3xl rounded-full z-0"></div>

          <h1 className="relative z-10 text-8xl sm:text-9xl font-mono font-bold text-slate-900 dark:text-[#F1F3F7] tracking-tighter drop-shadow-sm">
            {code}
          </h1>
        </div>

        {/* Error Text Details */}
        <h2 className="text-2xl sm:text-3xl font-bold font-sans text-slate-800 dark:text-slate-200 mb-3">{message}</h2>
        <p className="text-base sm:text-lg text-slate-500 dark:text-[#8A93A3] font-sans max-w-md mx-auto mb-10 leading-relaxed">
          {"maybe its lost in the void"}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto font-sans font-medium text-sm rounded-lg px-6 py-3 inline-flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#141821] text-slate-700 dark:text-[#F1F3F7] hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all shadow-sm qz-focusable"
          >
            <i className="ph-bold ph-arrow-left text-lg"></i>
            Go Back
          </button>

          <button
            onClick={() => nav("/home")}
            className="w-full sm:w-auto font-sans font-semibold text-sm text-white bg-emerald-600 dark:bg-emerald-400 hover:brightness-105 active:brightness-95 rounded-lg px-6 py-3 inline-flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),_0_12px_32px_-16px_rgba(0,0,0,0.6)] qz-focusable dark:text-slate-900"
          >
            <i className="ph-bold ph-house text-lg"></i>
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
