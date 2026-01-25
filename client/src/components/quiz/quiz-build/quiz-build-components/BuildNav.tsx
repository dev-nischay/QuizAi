import { Brain } from "lucide-react";

export default function BuildNavbar() {
  return (
    <div className="w-full h-28  border-b bg-black/50 border-b-emerald-950  flex justify-start pl-20">
      <div className=" w-80 flex items-center">
        <div className="flex gap-2 items-center ">
          <div className="bg-gradient-to-br from-emerald-600 via-teal-400 to-emerald-600  p-3 rounded-2xl   ">
            <Brain size={30} />
          </div>
          <div className="flex flex-col ml-1   ">
            <div className="font-black text-3xl">
              <span className="bg-gradient-to-r tracking-tight from-emerald-500 via-teal-300 to bg-emerald-500 bg-clip-text text-transparent ">
                Quiz
              </span>
              <span className="text-white">AI</span>
            </div>
            <div className="font-mono text-xs tracking-wider  text-gray-400 uppercase">creator studio</div>
          </div>
        </div>
      </div>
    </div>
  );
}
