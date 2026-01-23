import { Brain } from "lucide-react";
export default function MobileLogo() {
  return (
    <div className="flex flex-col mb-5 gap-3 items-center  lg:hidden  ">
      <div className="flex gap-2 items-center pt-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl max-w-12">
          <Brain />
        </div>
        <div className="text-3xl  font-extrabold ">
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Quiz</span>
          <span className="text-white">AI</span>
        </div>
      </div>
    </div>
  );
}
