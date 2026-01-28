import { Eye, Play, EyeOff } from "lucide-react";
import Leaderboard from "../quiz-live-components/Leaderboard";
import Badge from "../quiz-live-components/Badge";
import type { HostOptionProps, OptionIndex } from "../../quiz.types";
import { useState } from "react";
export default function HostActive() {
  const correctOptionIndex = 0;
  const [showAnswer, setShowAnswer] = useState(false);
  const options = [
    "Enforces stricter parsing and error handling",
    "Makes code run faster",
    "Enables ES6 features",
    "Compiles code to machine language",
  ];

  return (
    <div className="w-full flex lg:flex-row flex-col 2xl:mt-20 mt-4 gap-4">
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-4">
        {/* quiz detals */}
        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-emerald-500/30 rounded-2xl p-6">
          <div className="capitalize font-bold pt-2  text-2xl">advanced javascript concepts</div>
          <div className="font-mono capitalize text-sm text-gray-500 tracking-wider flex items-center gap-3 mt-2 pb-5">
            <span>5 Questions</span>
            <span>•</span>
            <span>In Progress</span>
          </div>
        </div>

        {/* quiz lobby state */}
        <div className="bg-gradient-to-br  from-gray-900/90 to-black/90 border border-emerald-500/30 rounded-2xl p-6  ">
          <Badge text={"question 1"} />
          <div className="font-bold text-xl mt-4 ">
            What is the purpose of the 'use strict' directive in JavaScript?
          </div>

          {options.map((e, index) => (
            <HostOption
              correctOptionIndex={correctOptionIndex}
              text={e}
              optionIndex={index as OptionIndex}
              show={showAnswer}
            />
          ))}
        </div>

        <div className="w-full flex gap-2">
          <button
            onClick={() => setShowAnswer((prev) => !prev)}
            className="bg-black w-1/2 border-2 border-emerald-950 flex justify-center py-4  rounded-xl gap-2 items-center transition-all z-10"
          >
            <div>{showAnswer ? <Eye size={20} /> : <EyeOff size={20} />}</div>
            <div className="text-sm lg:text-base uppercase font-bold cursor-pointer">
              {showAnswer ? "show answer" : "hide answer"}
            </div>
          </button>

          <button className="bg-gradient-to-br w-1/2 from-emerald-600 hover:scale-105 to-teal-600 flex justify-center py-4  rounded-xl gap-2 items-center transition-all z-10">
            <div>
              <Play size={20} />
            </div>
            <div className=" text-sm lg:text-base uppercase font-bold cursor-pointer">next question</div>
          </button>
        </div>

        <button className="w-full bg-red-950/50 border-red-900/50 hover:border-red-800/50 hover:bg-red-900/50  border  flex justify-center py-4 mt-2 rounded-xl gap-2 items-center transition-all z-10">
          <div className=" text-red-400 font-bold cursor-pointer capitalize">end quiz early</div>
        </button>
      </div>

      {/*  leaderboard stats */}
      <Leaderboard />
    </div>
  );
}

const HostOption = ({ text, optionIndex, correctOptionIndex, show }: HostOptionProps) => {
  return (
    <div className="relative">
      <div
        className={`w-full text-sm  px-4 py-4 capitalize   rounded-lg outline-none mt-3  ring-0  border-2  placeholder:text-gray-500 focus:ring-2 flex gap-3 items-center transition-all ${
          optionIndex === correctOptionIndex && show
            ? "border-emerald-400 bg-emerald-900 "
            : optionIndex !== correctOptionIndex && show
            ? "bg-red-500/20 border-gray-700 "
            : "border-gray-700 bg-black  hover:border-gray-500"
        }`}
      >
        <span
          className={`px-2 py-1 rounded-md my-auto  font-mono text-xs transition-all ${
            optionIndex === correctOptionIndex && show ? "bg-emerald-500 text-white" : "bg-gray-800 text-neutral-400"
          } `}
        >
          {String.fromCharCode(65 + optionIndex)}
        </span>
        <span>{text}</span>
      </div>
    </div>
  );
};
