import type { QuestionListProps } from "../../quiz.types";
import { Pen } from "lucide-react";
import { OPTION_IDENTITIES } from "../../../../design/bullets";

export const QuestionList = ({ text, correctOptionIndex, options, _id, startEditing, i }: QuestionListProps) => {
  return (
    <div
      key={i}
      className=" animate-fadeIn group relative rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#141821] p-[18px] shadow-sm transition-all hover:shadow-md dark:hover:border-white/20 animate-fade-in pr-14"
    >
      {/* Hover Action Button */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
        <button
          onClick={() => startEditing(_id)}
          className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-emerald-100 hover:text-emerald-600 dark:bg-white/5 dark:text-[#8A93A3] dark:hover:bg-emerald-500/20 dark:hover:text-emerald-400 transition-colors shadow-sm cursor-pointer qz-focusable"
          title="Edit Question"
        >
          <i>
            <Pen size={15} />
          </i>
        </button>
      </div>

      <div className="flex items-start gap-4">
        <span className="font-mono text-sm font-semibold text-slate-400 dark:text-[#8A93A3] mt-1">
          {String(i + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 space-y-4">
          <h4 className="font-sans font-medium text-slate-900 dark:text-[#F1F3F7] text-lg pr-4">{text}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options.map((opt, optIdx) => (
              <OptionList
                color={OPTION_IDENTITIES[optIdx].colorHex}
                shape={OPTION_IDENTITIES[optIdx].shape}
                index={optIdx}
                opt={opt}
                key={optIdx}
                correctOptionIndex={correctOptionIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const OptionList = ({
  index,
  color,
  shape,
  correctOptionIndex,
  opt,
}: {
  index: number;
  color: string;
  shape: string;
  opt: string;
  correctOptionIndex: number;
}) => {
  return (
    <div
      key={index}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#1A1F2A] border  ${correctOptionIndex === index ? "border-emerald-600 dark:border-emerald-400" : " border-slate-100 dark:border-white/5"}`}
    >
      <span className="text-sm select-none" style={{ color }}>
        {shape}
      </span>
      <span className="font-sans text-sm text-slate-600 dark:text-[#8A93A3] truncate">{opt}</span>
    </div>
  );
};
