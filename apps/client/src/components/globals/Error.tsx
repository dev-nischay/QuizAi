import { TriangleAlert } from "lucide-react";

export function ErrorModal({ onClose, onHome }: { onClose: () => void; onHome: () => void }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#141821] rounded-2xl border border-slate-200 dark:border-white/10 w-full max-w-md shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative animate-pop-in">
        {/* Top Accent Bar */}
        <div className="w-full h-1.5 bg-rose-500 dark:bg-rose-400"></div>

        <div className="p-8 pb-6 flex flex-col items-center text-center">
          {/* Error Icon Wrapper */}
          <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-6 shadow-sm relative">
            <div className="absolute inset-0 rounded-2xl bg-rose-500/20 dark:bg-rose-400/20 animate-ping opacity-50"></div>
            <i className="relative z-10">
              <TriangleAlert size={15} />
            </i>
          </div>

          <h3 className="font-sans font-bold text-2xl text-slate-900 dark:text-[#F1F3F7] mb-2 tracking-tight">
            Something went wrong
          </h3>

          <p className="font-sans text-sm text-slate-500 dark:text-[#8A93A3] leading-relaxed mb-2">
            We encountered an unexpected error while processing your request. Please try again or return to the
            dashboard.
          </p>

          <div className="bg-slate-50 dark:bg-[#1A1F2A] border border-slate-200 dark:border-white/10 rounded-lg py-2 px-4 mt-4 w-full text-left">
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400">Error Code: ERR_NETWORK_503</p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-5 bg-slate-50 dark:bg-[#1A1F2A]/50 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-1/2 font-sans font-medium text-sm rounded-lg px-4 py-2.5 border text-slate-700 border-slate-200 bg-white hover:bg-slate-50 dark:text-[#F1F3F7] dark:border-white/10 dark:bg-[#141821] dark:hover:bg-white/5 transition-all cursor-pointer qz-focusable shadow-sm flex items-center justify-center gap-2"
          >
            <i className="ph-bold ph-arrow-left text-lg"></i>
            Go Back
          </button>

          <button
            onClick={onHome}
            className="w-full sm:w-1/2 font-sans font-semibold text-sm text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 rounded-lg px-4 py-2.5 inline-flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm qz-focusable"
          >
            <i className="ph-bold ph-house text-lg"></i>
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
