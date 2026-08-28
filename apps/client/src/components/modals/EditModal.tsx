import type { Options } from "@common/contracts";
import { forwardRef, useRef, useState } from "react";
import { OPTION_IDENTITIES } from "../../design/bullets";
import { CheckCircle, Circle } from "lucide-react";
import type { EditModalProps, OptionEditProps } from "../quiz/quiz.types";

export const EditModal = ({ saveEditing, cancelEditing, editQuestion, index }: EditModalProps) => {
  const questionRef = useRef<HTMLTextAreaElement | null>(null);
  const optionsText = editQuestion?.options;
  const optionsRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [correctOptionIndex, setCorrectOption] = useState(editQuestion.correctOptionIndex);
  const handleEdit = () => {
    const text = questionRef.current?.value;
    const options = optionsRefs.current.map((input) => input?.value.trim() ?? "") as [string, string, string, string];

    if (text && options.length === 4) {
      saveEditing({
        _id: editQuestion._id,
        correctOptionIndex: correctOptionIndex,
        text,
        options,
      });
    }
  };

  return (
    <div
      key={index}
      className="  rounded-xl border-2 border-emerald-500/50 dark:border-emerald-400/50 bg-white dark:bg-[#141821] p-[18px] shadow-sm transition-all animate-fade-in relative"
    >
      <div className="flex items-start gap-4">
        <span className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-3">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 space-y-4">
          <textarea
            ref={questionRef}
            defaultValue={editQuestion.text}
            className="w-full bg-slate-50 dark:bg-[#1A1F2A] border border-slate-200 dark:border-white/10 rounded-lg p-3 font-sans text-slate-900 dark:text-[#F1F3F7] placeholder:text-slate-400 dark:placeholder:text-slate-500 qz-focusable min-h-[80px] resize-y"
            placeholder="Question Text"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {optionsText &&
              optionsText.map((text, optIdx) => (
                <Option
                  colorHex={OPTION_IDENTITIES[optIdx].colorHex}
                  shape={OPTION_IDENTITIES[optIdx].shape}
                  optIdx={optIdx}
                  text={text}
                  key={optIdx}
                  ref={(el) => {
                    optionsRefs.current[optIdx] = el;
                  }}
                  correctOptionIndex={correctOptionIndex}
                  onCorrect={() => setCorrectOption(optIdx as Options)}
                />
              ))}
          </div>
          <div className="flex justify-end gap-2  border-t border-slate-100 dark:border-white/5 mt-4 pt-4">
            <button
              onClick={cancelEditing}
              className="font-sans font-medium text-xs rounded-lg px-3 py-1.5 text-slate-500 hover:bg-slate-100 dark:text-[#8A93A3] dark:hover:bg-white/5 transition-colors qz-focusable cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="font-sans font-medium text-xs rounded-lg px-4 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:hover:bg-emerald-500/30 transition-colors qz-focusable inline-flex items-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="ph ph-check-circle text-sm"></i> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Option = forwardRef<
  HTMLInputElement,
  {
    optIdx: number;
    colorHex: string;
    shape: string;
    text: string;
    correctOptionIndex: Options;
    onCorrect: () => void;
  }
>(({ optIdx, shape, colorHex, text, correctOptionIndex, onCorrect }: OptionEditProps, ref) => {
  return (
    <div key={optIdx} className="relative flex items-center">
      <div
        className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 select-none"
        style={{ color: colorHex }}
      >
        <span className="text-lg leading-none">{shape}</span>
      </div>
      <input
        type="text"
        ref={ref}
        defaultValue={text}
        className="w-full bg-white dark:bg-[#1A1F2A] border border-slate-200 dark:border-white/10 rounded-lg py-2.5 pr-3 pl-10 font-sans text-sm text-slate-900 dark:text-[#F1F3F7] placeholder:text-slate-400 dark:placeholder:text-slate-500 qz-focusable"
      />

      <button
        type="button"
        onClick={() => onCorrect()}
        className={`absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center size-8 rounded-md transition-all cursor-pointer ${
          correctOptionIndex === optIdx
            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
            : "text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
        }`}
        title="Mark as correct answer"
      >
        {correctOptionIndex === optIdx ? (
          <CheckCircle className="animate-fadeIn" size={16} />
        ) : (
          <Circle className="animate-fadeIn" size={16} />
        )}
      </button>
    </div>
  );
});
