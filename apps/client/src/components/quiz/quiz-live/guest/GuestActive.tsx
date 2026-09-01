import { useEffect, useState } from "react";
import { useLiveStore } from "../../../../store/liveStore";
import { Loader2 } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { socketService } from "../../../../live/socket-client";
import { submitAnswer } from "../../../../live/handlers/guest/submitAnswer";
import type { Options } from "@common/contracts";
import Leaderboard from "../quiz-live-components/Leaderboard";
import { OPTION_IDENTITIES_LIVE } from "../quiz-live-components/LiveDot";

// export default function GuestActive() {
//   const [gameState, setGameState] = useState<"active" | "answered">("active");
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
//   const [counter, setCoutner] = useState(1);
//   const [question, answer, liveUsers, quizDetails] = useLiveStore(
//     useShallow((state) => [state.currentQuestion, state.currentAnswer, state.liveUsers, state.quizDetails]),
//   );

//   const handleAnswerSelect = (index: number) => {
//     if (gameState !== "active") return;
//     socketService.sendMessage(submitAnswer(index as Options)!);
//     setSelectedAnswer(index);
//     setGameState("answered");
//     setCoutner((counter) => counter + 1);
//   };

//   useEffect(() => {
//     setGameState("active");
//     setSelectedAnswer(null);
//   }, [question]);

//   const showResult = gameState === "answered";

//   return (
//     <div className="min-h-screen text-white">
//       <div className="max-w-4xl mx-auto px-6 py-8">
//         <div className="space-y-6">
//           {/* Question Header */}
//           <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-emerald-500/30 rounded-2xl p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-xs font-mono text-emerald-400 mb-2">
//                   QUESTION {counter} OF {quizDetails?.totalQuestionCount}
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-400 text-sm">
//                   <Users className="w-4 h-4" />
//                   <span className="font-mono pt-2">{liveUsers.length} players answering</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Question */}
//           <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-emerald-500/30 rounded-2xl p-8">
//             <h2 className="text-2xl sm:text-3xl font-bold text-white leading-relaxed mb-8">{question?.text}</h2>

//             {/* Answer Options */}
//             <div className="grid gap-4">
//               {question!.options.map((option, index) => {
//                 const isSelected = selectedAnswer === index;
//                 const isCorrect = index === answer?.correctAnswerIndex;

//                 return (
//                   <button
//                     key={index}
//                     onClick={() => handleAnswerSelect(index)}
//                     disabled={showResult}
//                     className={`p-6 rounded-xl border-2 transition-all text-left ${
//                       showResult && isCorrect
//                         ? "bg-emerald-500/20 border-emerald-500"
//                         : showResult && isSelected && !isCorrect
//                           ? "bg-red-500/20 border-red-500"
//                           : isSelected && !showResult
//                             ? "bg-emerald-500/20 border-emerald-500 scale-[1.02]"
//                             : "bg-black/50 border-gray-700 hover:border-emerald-500/50 hover:bg-black/70"
//                     } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
//                   >
//                     <div className="flex items-center gap-4">
//                       <div
//                         className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono transition-all ${
//                           showResult && isCorrect
//                             ? "bg-emerald-500 text-white"
//                             : showResult && isSelected && !isCorrect
//                               ? "bg-red-500 text-white"
//                               : isSelected && !showResult
//                                 ? "bg-emerald-500 text-white"
//                                 : "bg-gray-800 text-gray-400"
//                         }`}
//                       >
//                         {String.fromCharCode(65 + index)}
//                       </div>
//                       <span className="text-white font-medium text-base sm:text-lg flex-1">{option}</span>
//                       {showResult && isCorrect && <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />}
//                       {showResult && isSelected && !isCorrect && (
//                         <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
//                       )}
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Answer Status */}
//             {showResult && (
//               <div className="mt-6 p-4 bg-black/50 border border-gray-800 rounded-xl">
//                 <div className="flex items-center justify-center gap-2 text-gray-400">
//                   <Clock className="w-5 h-5" />
//                   <span className="font-mono text-sm">Waiting for host to display next question </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export function GuestLive() {
  const [selectedOption, setSelectedOption] = useState<Options | null>(null);
  const [answerState, setAnswerState] = useState("idle"); // 'idle', 'submitting', 'revealed'
  const [isCorrect, setIsCorrect] = useState(false);

  const [currentQuestion, answer, quizDetails] = useLiveStore(
    useShallow((state) => [state.currentQuestion, state.currentAnswer, state.quizDetails]),
  );

  // Reset guest state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setAnswerState("idle");
    setIsCorrect(false);
  }, [currentQuestion?.text]);

  const handleGuestAnswer = (index: Options) => {
    if (answerState !== "idle") return;

    setSelectedOption(index);
    setAnswerState("submitting");

    socketService.sendMessage(submitAnswer(index)!);
  };

  useEffect(() => {
    if (
      answerState === "submitting" &&
      answer?.correctAnswerIndex !== undefined &&
      answer.correctAnswerIndex !== null
    ) {
      // Now evaluate and reveal
      const correct = answer.correct ?? false;
      setIsCorrect(correct);
      setAnswerState("revealed");
    }
  }, [answer?.correctAnswerIndex, answerState, selectedOption]);

  return (
    <div className="w-full max-w-6xl h-fit mx-auto flex flex-col lg:flex-row gap-6 pt-24 pb-12 px-6 min-h-screen ">
      {/* Left: Main Question Area */}
      <div className="flex-1 flex flex-col gap-6 animate-fadeIn">
        {/* Question Header */}
        <div className="bg-white/80 dark:bg-[#141821]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-white/5">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{
                width: `${((currentQuestion?.currentQuestionIndex! + 1) / quizDetails?.totalQuestionCount!) * 100}%`,
              }}
            ></div>
          </div>

          <span className=" animate- font-mono text-sm font-bold text-slate-400 dark:text-[#8A93A3] mb-3">
            QUESTION {currentQuestion?.currentQuestionIndex! + 1} OF {quizDetails?.totalQuestionCount}
          </span>

          <h2
            key={currentQuestion?.currentQuestionIndex!}
            className="font-sans animate-fadeIn font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-[#F1F3F7] leading-tight max-w-2xl"
          >
            {currentQuestion!.text}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="  grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 ">
          {currentQuestion!.options.map((opt: string, idx: number) => {
            const identity = OPTION_IDENTITIES_LIVE[idx];

            // Guest Styling Logic
            let guestStyles = "hover:scale-[1.02] cursor-pointer";
            let overlay = null;

            if (answerState === "idle") {
              guestStyles = "hover:scale-[1.02] hover:border-emerald-500/50 cursor-pointer shadow-sm";
            } else {
              guestStyles = "opacity-50 cursor-not-allowed scale-[0.98]"; // Dim unselected
              if (selectedOption === idx) {
                guestStyles =
                  "opacity-100 ring-2 ring-offset-2 ring-offset-slate-50 dark:ring-offset-[#0B0E14] ring-emerald-500 scale-100 shadow-md";
                if (answerState === "submitting") {
                  overlay = (
                    <div className="absolute inset-0 bg-white/50 dark:bg-[#141821]/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <i className=" animate-spin  text-emerald-600">
                        <Loader2 size={15} />
                      </i>
                    </div>
                  );
                } else if (answerState === "revealed") {
                  guestStyles = isCorrect
                    ? "opacity-100  bg-green-500/30 dark:bg-green-500/10"
                    : "opacity-100 bg-red-500/50 dark:bg-red-500/10";
                }
              }

              // If revealed, highlight the correct answer for the guest regardless of choice
              if (answerState === "revealed" && idx === answer?.correctAnswerIndex && !isCorrect) {
                guestStyles = "opacity-100er-green-500 bg-green-500/30 dark:bg-green-500/20";
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleGuestAnswer(idx as Options)}
                className={`relative   bg-white dark:bg-[#141821] border border-slate-200 dark:border-white/10 rounded-xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-center items-center text-center gap-3 qz-focusable ${guestStyles}`}
                tabIndex={answerState === "idle" ? 0 : -1}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-2 ${identity.tailwindBg} ${identity.tailwindText} ${identity.border} border`}
                >
                  {identity.shape}
                </div>
                <span className="font-sans font-medium text-lg sm:text-xl text-slate-800 dark:text-[#F1F3F7]">
                  {opt}
                </span>
                {overlay}
              </div>
            );
          })}
        </div>

        {/* Guest Feedback Banner */}
        {answerState === "revealed" && (
          <div
            className={` animate-fadeIn rounded-xl p-4 flex items-center justify-center gap-3 ${isCorrect ? "bg-green-200 text-green-800 dark:bg-green-500/20 dark:text-green-300" : "bg-red-200 text-red-800 dark:bg-red-500/20 dark:text-red-300"}`}
          >
            <i className={`ph-fill text-2xl ${isCorrect ? "ph-check-circle" : "ph-x-circle"}`}></i>
            <span className="font-sans font-bold text-lg">{isCorrect ? "Correct! +100 pts" : "Incorrect!"}</span>
            <span className="text-sm opacity-75 ml-2 font-medium">Waiting for host to proceed...</span>
          </div>
        )}
      </div>

      {/* Right: Leaderboard */}
      <div className="lg:w-80 h-[400px] lg:h-auto">
        <Leaderboard />
      </div>
    </div>
  );
}
