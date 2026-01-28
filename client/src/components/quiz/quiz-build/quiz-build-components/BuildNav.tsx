import { Brain, Zap } from "lucide-react";

export default function BuildNavbar({ questionsLength }: { questionsLength: number }) {
  return (
    <div className=" z-10 backdrop-blur-sm  fixed inset-x-0 top-0 lg:relative w-full h-20 lg:h-24  border-b bg-black/50 border-b-emerald-950  flex justify-between items-center  pl-4 pr-4 lg:pl-20 lg:pr-10 ">
      <div className="  flex items-center ">
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
            <div className="font-mono text-[0.62rem] lg:text-xs tracking-wider  text-gray-400 uppercase">
              creator studio
            </div>
          </div>
        </div>
      </div>

      {questionsLength > 0 && (
        <button className="bg-gradient-to-br from-emerald-600 to-teal-600  px-5 py-3 lg:px-8 lg:py-3 rounded-xl text-xs lg:text-sm  font-bold uppercase flex items-center justify-center gap-2">
          <span>
            <Zap size={18} />
          </span>
          <span>publish quiz</span>
        </button>
      )}
    </div>
  );
}
