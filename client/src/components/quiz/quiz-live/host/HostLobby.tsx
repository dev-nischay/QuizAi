import { Trophy, Play } from "lucide-react";
import Leaderboard from "../quiz-live-components/Leaderboard";

export default function HostLobby() {
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
            <span>ready to start</span>
          </div>
        </div>

        {/* quiz lobby state */}
        <div className="bg-gradient-to-br  from-gray-900/90 to-black/90 border border-emerald-500/30 rounded-2xl p-6 flex flex-col items-center  justify-center gap-4 py-14">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-5 ">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="font-black text-3xl capitalize">ready to start?</div>
          <div className="text-sm text-gray-500">12 participants are waiting. Start the quiz when ready</div>
          <div className="bg-emerald-950/40 border border-emerald-950  py-2  px-5 flex flex-col items-center  gap-1 rounded-lg ">
            <div className="text-xs font-mono font-thin text-gray-600 uppercase ">quiz code</div>
            <div className=" text-lg font-bold font-mono  text-emerald-600 ">JKL-945</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 hover:scale-105 to-teal-600 flex justify-center py-4 mt-2 rounded-xl gap-2 items-center transition-all z-10">
          <div>
            <Play size={20} />
          </div>
          <button className=" uppercase font-bold cursor-pointer">start quiz</button>
        </div>
      </div>

      {/*  leaderboard stats */}
      <Leaderboard />
    </div>
  );
}
