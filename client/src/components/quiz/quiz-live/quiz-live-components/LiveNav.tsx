import { Brain } from "lucide-react";
import { Users2 } from "lucide-react";
export default function LiveNavbar() {
  return (
    <div className=" z-10 fixed inset-x-0 top-0 lg:relative w-full h-20 lg:h-28  border-b bg-black/50 border-b-emerald-950  flex justify-between  px-4 lg:pl-20 lg:pr-10">
      <div className=" flex items-center">
        <div className="flex gap-2 items-center ">
          <div className="bg-gradient-to-br from-emerald-600 via-teal-400 to-emerald-600  p-3 rounded-2xl   ">
            <Brain size={30} />
          </div>
          <div className="flex flex-col ml-1   ">
            <div className="font-black text-2xl lg:text-3xl">
              <span className="bg-gradient-to-r tracking-tight from-emerald-500 via-teal-300 to bg-emerald-500 bg-clip-text text-transparent ">
                Quiz
              </span>
              <span className="text-white">AI</span>
            </div>
            <div className="font-mono text-[0.62rem] lg:text-x  tracking-normal  text-gray-400 uppercase">
              host control panel
            </div>
          </div>
        </div>
      </div>

      <div className=" hidden lg:flex  justify-center items-center  gap-3">
        <div className="flex justify-center gap-3 items-center  px-5 py-3  rounded-xl   bg-emerald-950/40 border border-emerald-950 font-mono text-sm">
          <div>
            <Users2 size={20} className="text-emerald-600" />
          </div>
          <div className="text-neutral-300">12 Players</div>
        </div>
        <div className="text-4xl animate-pulse text-emerald-500 pb-2">•</div>
      </div>
    </div>
  );
}
