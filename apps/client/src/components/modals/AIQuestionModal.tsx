import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import type { AIQuestionModalProps } from "../quiz/quiz.types";
const apiKey = import.meta.env.VITE_API_KEY;

export const AIQuestionModal = ({ setQuestions, setQuizTitle, onClose }: AIQuestionModalProps) => {
  const [aiTopic, setAiTopic] = useState("");
  const [aiNumQuestions, setAiNumQuestions] = useState(3);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const handleGenerateAiQuiz = async () => {
    if (!aiTopic.trim()) {
      setAiError("Please enter a topic.");
      return;
    }

    setIsAiLoading(true);
    setAiError("");

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const payload = {
        contents: [
          {
            parts: [
              {
                text: `Generate a multiple choice quiz about: "${aiTopic}". Generate exactly ${aiNumQuestions} questions. Each question must have exactly 4 options. Make sure the options include one correct answer and three plausible distractors.`,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING" },
              questions: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    text: { type: "STRING" },
                    options: {
                      type: "ARRAY",
                      items: { type: "STRING" },
                      description: "Exactly 4 options.",
                    },
                    correctOptionIndex: { type: "NUMBER", description: "index in range 0-3 " },
                  },
                  required: ["text", "options", "correctOptionIndex"],
                },
              },
            },
            required: ["title", "questions"],
          },
        },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts.length > 0
      ) {
        const jsonStr = result.candidates[0].content.parts[0].text;
        const parsed = JSON.parse(jsonStr);

        setQuizTitle(parsed.title || aiTopic + " Quiz");

        const formattedQuestions = (parsed.questions || []).map((q: any) => {
          const opts = [...(q.options || [])];
          while (opts.length < 4) opts.push(`Option ${opts.length + 1}`);
          return {
            _id: crypto.randomUUID(),
            text: q.text || "Untitled Question",
            options: opts.slice(0, 4),
            correctOptionIndex: q.correctOptionIndex,
          };
        });

        setQuestions(formattedQuestions);
        onClose();
        setAiTopic("");
        setAiNumQuestions(3);
      } else {
        throw new Error("Invalid response format from AI.");
      }
    } catch (err) {
      console.error(err);
      setAiError("Failed to generate quiz. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className=" animate-fadeIn fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#141821] rounded-xl border border-slate-200 dark:border-white/10 w-full max-w-md shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10">
          <h3 className="font-sans font-semibold text-lg text-slate-900 dark:text-[#F1F3F7] flex items-center gap-2">
            <i className="ph-fill ph-magic-wand text-purple-500"></i>
            Generate with AI
          </h3>
          <button
            onClick={() => onClose()}
            disabled={isAiLoading}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-[#8A93A3] dark:hover:bg-white/5 transition-colors cursor-pointer qz-focusable disabled:opacity-50"
          >
            <i className="ph ph-x text-xl"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5">
          {aiError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg text-sm font-medium border border-rose-100 dark:border-rose-500/20">
              {aiError}
            </div>
          )}

          <div className="space-y-2">
            <label className="font-sans font-medium text-sm text-slate-700 dark:text-slate-300">Quiz Topic</label>
            <input
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              disabled={isAiLoading}
              placeholder="e.g., The Solar System, React.js basics..."
              className="w-full bg-slate-50 dark:bg-[#1A1F2A] border border-slate-200 dark:border-white/10 rounded-lg p-3 font-sans text-slate-900 dark:text-[#F1F3F7] placeholder:text-slate-400 dark:placeholder:text-slate-500 qz-focusable"
            />
          </div>

          <div className="space-y-2">
            <label className="font-sans font-medium text-sm text-slate-700 dark:text-slate-300">
              Number of Questions: {aiNumQuestions}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={aiNumQuestions}
              onChange={(e) => setAiNumQuestions(parseInt(e.target.value))}
              disabled={isAiLoading}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
              <span>1</span>
              <span>10</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-[#1A1F2A]/50 border-t border-slate-200 dark:border-white/10 flex justify-end gap-3">
          <button
            onClick={() => onClose()}
            disabled={isAiLoading}
            className="font-sans font-medium text-sm rounded-lg px-4 py-2 border text-slate-600 border-slate-200 bg-white hover:bg-slate-50 dark:text-[#8A93A3] dark:border-white/10 dark:bg-transparent dark:hover:bg-white/5 transition-all cursor-pointer qz-focusable disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerateAiQuiz}
            disabled={isAiLoading || !aiTopic.trim()}
            className="font-sans font-semibold text-sm rounded-lg px-5 py-2 inline-flex items-center gap-2 transition-all qz-focusable shadow-sm text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:bg-purple-400 cursor-pointer dark:bg-purple-500 dark:hover:bg-purple-400 dark:disabled:bg-purple-500/50"
          >
            {isAiLoading ? (
              <i className="animate-spin">
                <Loader2 size={14} />
              </i>
            ) : (
              <i>
                <Sparkles size={14} />
              </i>
            )}
            {isAiLoading ? "Generating..." : "Generate Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
};
