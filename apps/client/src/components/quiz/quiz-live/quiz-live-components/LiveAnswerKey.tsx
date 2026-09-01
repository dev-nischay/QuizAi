import { OPTION_IDENTITIES_LIVE } from "./LiveDot";

export function LiveAnswerKey({
  options,
  correctOptionIndex,
  revealed,
}: {
  options: string[];
  correctOptionIndex: number;
  revealed: boolean;
}) {
  return (
    <div className="bg-white/80 dark:bg-[#141821]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-sans font-semibold text-xs text-slate-500 dark:text-[#8A93A3] uppercase tracking-widest flex items-center gap-2">
          <i className="ph-bold ph-key"></i> Answer Key
        </h3>
        <span
          className={`font-sans text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full transition-colors ${
            revealed
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500"
          }`}
        >
          {revealed ? "Revealed" : "Hidden"}
        </span>
      </div>

      <div className="space-y-1.5">
        {options.map((optText, index) => {
          const identity = OPTION_IDENTITIES_LIVE[index];
          const isCorrect = index === correctOptionIndex;
          const highlight = revealed && isCorrect;

          return (
            <div
              key={index}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 border transition-all duration-300 ${
                highlight
                  ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30"
                  : "bg-slate-50/60 border-transparent dark:bg-white/[0.02]"
              }`}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-md text-[11px] shrink-0 ${
                  highlight ? "bg-emerald-500 text-white" : `${identity.barBg} ${identity.colorHex}`
                }`}
              >
                {highlight ? <i className="ph-bold ph-check"></i> : identity.shape}
              </span>
              <span
                className={`font-sans text-sm truncate ${
                  highlight
                    ? "font-semibold text-emerald-700 dark:text-emerald-400"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {optText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
