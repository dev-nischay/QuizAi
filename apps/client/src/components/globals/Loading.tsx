export function Loading({ message = "Processing..." }) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50/80 dark:bg-[#0B0E14]/80 backdrop-blur-md animate-fade-in">
      {/* Branded Loader Animation */}
      <div className="relative flex items-center justify-center mb-6 animate-pulse-glow">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-500 border-r-emerald-500 opacity-60 animate-spin-slow h-20 w-20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-b-emerald-400 border-l-emerald-400 opacity-40 animate-[spin_2s_linear_infinite_reverse] h-20 w-20"></div>

        {/* Inner Logo */}
        <div className="w-14 h-14 rounded-xl bg-emerald-600 dark:bg-emerald-400 flex items-center justify-center shadow-lg dark:shadow-[0_0_20px_rgba(52,211,153,0.3)] z-10">
          <i className="ph-bold ph-lightning text-white dark:text-slate-900 text-3xl"></i>
        </div>
      </div>

      <h3 className="font-sans font-semibold text-lg text-slate-900 dark:text-[#F1F3F7] tracking-tight">{message}</h3>
      <p className="font-sans text-sm text-slate-500 dark:text-[#8A93A3] mt-1 animate-pulse">Please wait a moment.</p>
    </div>
  );
}
