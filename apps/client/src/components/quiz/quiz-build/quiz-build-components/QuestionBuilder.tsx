import { useState } from "react";
import { OPTION_IDENTITIES } from "../../../../design/bullets";
import type { Options, Question } from "@common/contracts";
import { Circle, CheckCircle, Sparkles } from "lucide-react";
export const QuestionBuilder = ({
  onClose,
  setQuestions,
}: {
  onClose: () => void;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}) => {
  const [draftQuestion, setDraftQuestion] = useState("");
  const [draftOptions, setDraftOptions] = useState<[string, string, string, string]>(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOption] = useState<Options>(0);

  const isQuestionValid = () => {
    const isTextValid = draftQuestion.trim().length > 0;
    const areOptionsValid = draftOptions.every((opt) => opt.trim().length > 0);
    return isTextValid && areOptionsValid;
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...draftOptions] as [string, string, string, string];
    newOptions[index] = value;
    setDraftOptions(newOptions);
  };

  const handleAddQuestion = () => {
    if (isQuestionValid()) {
      setQuestions((questions) => [
        ...questions,
        { _id: crypto.randomUUID(), correctOptionIndex, options: draftOptions, text: draftQuestion },
      ]);
      onClose();
    }
  };

  const isValid = isQuestionValid();

  return (
    <div className=" animate-fadeIn fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#141821] rounded-xl border border-slate-200 dark:border-white/10 w-full max-w-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10">
          <h3 className="font-sans font-semibold text-lg text-slate-900 dark:text-[#F1F3F7]">Add New Question</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-[#8A93A3] dark:hover:bg-white/5 transition-colors cursor-pointer qz-focusable"
          >
            <i className="ph ph-x text-xl"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
          {/* Question Input */}
          <div className="space-y-2">
            <label className="font-sans font-medium text-sm text-slate-700 dark:text-slate-300">Question Text</label>
            <textarea
              value={draftQuestion}
              onChange={(e) => setDraftQuestion(e.target.value)}
              placeholder="E.g., What is the capital of France?"
              className="w-full bg-slate-50 dark:bg-[#1A1F2A] border border-slate-200 dark:border-white/10 rounded-lg p-3 font-sans text-slate-900 dark:text-[#F1F3F7] placeholder:text-slate-400 dark:placeholder:text-slate-500 qz-focusable min-h-[100px] resize-y"
            />
          </div>

          {/* Options Inputs */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="font-sans font-medium text-sm text-slate-700 dark:text-slate-300">
                Answers (4 required)
              </label>

              <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Correct: Option {correctOptionIndex + 1}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OPTION_IDENTITIES.map((identity, index) => (
                <div key={index} className="relative flex items-center">
                  <div
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 select-none"
                    style={{ color: identity.colorHex }}
                  >
                    <span className="text-lg leading-none">{identity.shape}</span>
                  </div>
                  <input
                    type="text"
                    value={draftOptions[index]}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={identity.placeholder}
                    className="w-full bg-white dark:bg-[#1A1F2A] border border-slate-200 dark:border-white/10 rounded-lg py-3 pr-3 pl-10 font-sans text-sm text-slate-900 dark:text-[#F1F3F7] placeholder:text-slate-400 dark:placeholder:text-slate-500 qz-focusable"
                  />
                  <button
                    type="button"
                    onClick={() => setCorrectOption(index as Options)}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center size-8 rounded-md transition-all cursor-pointer ${
                      correctOptionIndex === index
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                        : "text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                    title="Mark as correct answer"
                  >
                    {correctOptionIndex === index ? (
                      <CheckCircle className="animate-fadeIn" size={16} />
                    ) : (
                      <Circle className="animate-fadeIn" size={16} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-[#1A1F2A]/50 border-t border-slate-200 dark:border-white/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="font-sans font-medium text-sm rounded-lg px-4 py-2 border text-slate-600 border-slate-200 bg-white hover:bg-slate-50 dark:text-[#8A93A3] dark:border-white/10 dark:bg-transparent dark:hover:bg-white/5 transition-all cursor-pointer qz-focusable"
          >
            Cancel
          </button>
          <button
            onClick={handleAddQuestion}
            disabled={!isValid}
            className={`font-sans font-semibold text-sm rounded-lg px-5 py-2 inline-flex items-center gap-2 transition-all qz-focusable shadow-sm ${
              isValid
                ? "text-white bg-emerald-600 hover:brightness-105 active:brightness-95 cursor-pointer dark:bg-emerald-400 dark:text-slate-900 dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),_0_12px_32px_-16px_rgba(0,0,0,0.6)]"
                : "text-slate-400 bg-slate-200 cursor-not-allowed dark:bg-white/5 dark:text-slate-500 shadow-none"
            }`}
          >
            <i className="ph ph-plus-circle text-lg"></i>
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};
