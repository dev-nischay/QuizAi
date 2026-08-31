import { QuestionBuilder } from "./quiz-build-components/QuestionBuilder";
import { useState } from "react";
import { QuestionList } from "./quiz-build-components/QuestionList";
import { type Question } from "@common/contracts";
import { LoaderCircle, Plus, RocketIcon, Wand } from "lucide-react";
import { EditModal } from "../../modals/EditModal";
import { AIQuestionModal } from "../../modals/AIQuestionModal";
import { usePublishQuiz } from "../../../hooks/PublishQuizHook";
import { useNavigate } from "react-router-dom";

export default function QuizBuilderPage() {
  const nav = useNavigate();

  // Quiz Data State
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const { publishQuiz, error, loading } = usePublishQuiz(quizTitle, questions);

  // UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [publishStatus, setPublishStatus] = useState({ type: "", message: "" });

  // Inline Editing State
  const [editingIndex, setEditingIndex] = useState<string | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const startEditing = (_id: string) => {
    setEditingIndex(_id);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
  };

  const saveEditing = (update: Question) => {
    setQuestions((prev) => prev.map((e) => (e._id === editingIndex ? update : e)));
    setEditingIndex(null);
  };

  const handlePublish = async () => {
    if (quizTitle.trim() === "") {
      setPublishStatus({ type: "error", message: "Please enter a Quiz Title before publishing." });

      // Clear error after 3 seconds
      setTimeout(() => setPublishStatus({ type: "", message: "" }), 3000);
      return;
    }

    if (questions.length === 0) {
      setPublishStatus({ type: "error", message: "Please add at least one question." });
      setTimeout(() => setPublishStatus({ type: "", message: "" }), 3000);
      return;
    }

    // Simulate publish success
    await publishQuiz();

    if (error) {
      setPublishStatus({ type: "error", message: error });
      setTimeout(() => setPublishStatus({ type: "", message: "" }), 3000);
      return;
    }

    setPublishStatus({ type: "success", message: "Quiz Published Successfully! Redirecting..." });

    nav("/live");

    setTimeout(() => setPublishStatus({ type: "", message: "" }), 3000);
    setQuestions([]);
    setQuizTitle("");
  };

  return (
    <div className="max-w-4xl mt-16 mx-auto p-4 sm:p-8 pt-12 sm:pt-16 pb-24">
      {/* Theme Toggle (Utility for preview purposes) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button
          className="p-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#141821] text-slate-500 dark:text-[#8A93A3] hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-sm qz-focusable cursor-pointer"
          title="Toggle Theme"
        ></button>
      </div>

      {/* Header Section */}
      <header className="mb-10 space-y-4 animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 inline-block animate-pulse shadow-[0_0_0_4px_rgba(5,150,105,0.2)] dark:shadow-[0_0_0_4px_rgba(52,211,153,0.2)]"></span>
          <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Draft Mode
          </span>
        </div>

        <input
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          placeholder="Enter Quiz Title..."
          className="w-full bg-transparent text-4xl sm:text-5xl font-bold font-sans text-slate-900 dark:text-[#F1F3F7] placeholder:text-slate-300 dark:placeholder:text-[#8A93A3]/50 border-none outline-none focus:ring-0 px-0 py-2 qz-focusable border-b-2 border-transparent focus:border-emerald-500/30 dark:focus:border-emerald-400/30 transition-all rounded-none"
        />
      </header>

      {/* Main Content Area */}
      <main className="space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        {/* Questions List */}
        <div className="space-y-4">
          {questions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-white/20 bg-white/50 dark:bg-[#1A1F2A]/30 p-12 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-400/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
                <i>
                  <Plus size={14} />
                </i>
              </div>
              <h3 className="font-sans font-medium text-slate-700 dark:text-[#F1F3F7]">No questions added yet</h3>
              <p className="font-sans text-sm text-slate-500 dark:text-[#8A93A3] max-w-sm">
                Start building your quiz by adding your first question and options below.
              </p>
            </div>
          ) : (
            questions.map((q, idx) => {
              if (editingIndex === q._id) {
                const editQuestion = questions.find((e) => e._id === editingIndex);
                return (
                  <EditModal
                    index={idx}
                    cancelEditing={cancelEditing}
                    editQuestion={editQuestion!}
                    key={idx}
                    saveEditing={saveEditing}
                  />
                );
              }

              return (
                <QuestionList
                  text={q.text}
                  _id={q._id}
                  correctOptionIndex={q.correctOptionIndex}
                  startEditing={startEditing}
                  options={q.options}
                  i={idx}
                  key={idx}
                  // remove a question needed here also correctOption index not taking input
                />
              );
            })
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={openModal}
              className="w-full sm:w-auto font-sans font-medium text-sm rounded-lg px-4 py-2.5 inline-flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#141821] text-slate-700 dark:text-[#F1F3F7] hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all shadow-sm qz-focusable"
            >
              <i className="ph ph-plus text-lg"></i>
              Add Question
            </button>

            {}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="w-full sm:w-auto font-sans font-medium text-sm rounded-lg px-4 py-2.5 inline-flex items-center justify-center gap-2 border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-500/20 cursor-pointer transition-all shadow-sm qz-focusable"
            >
              Generate with AI
              <i>
                <Wand size={14} />
              </i>
            </button>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            {publishStatus.message && (
              <span
                className={` animate-fadeIn font-sans text-sm font-medium animate-fade-in ${
                  publishStatus.type === "error"
                    ? "text-red-600 dark:text-rose-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {publishStatus.message}
              </span>
            )}
            <button
              onClick={handlePublish}
              className="w-full sm:w-auto font-sans font-semibold text-sm text-white bg-emerald-600 dark:bg-emerald-400 hover:brightness-105 active:brightness-95 rounded-lg px-6 py-2.5 inline-flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),_0_12px_32px_-16px_rgba(0,0,0,0.6)] qz-focusable dark:text-slate-900 ml-auto"
            >
              {loading ? (
                <>
                  Publishing...
                  <i className="animate-spin ">
                    <LoaderCircle size={14} />
                  </i>
                </>
              ) : (
                <>
                  Publish Quiz
                  <i>
                    {" "}
                    <RocketIcon size={14} />
                  </i>
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {isModalOpen && <QuestionBuilder onClose={closeModal} setQuestions={setQuestions} />}

      {isAiModalOpen && (
        <AIQuestionModal
          onClose={() => setIsAiModalOpen(false)}
          setQuestions={setQuestions}
          setQuizTitle={setQuizTitle}
        />
      )}
    </div>
  );
}
