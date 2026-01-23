import { Dot } from "lucide-react";
import type { TabSwitcherProps } from "../auth.types";

export default function TabSwitcher({ tab, setTab }: TabSwitcherProps) {
  return (
    <div className="max-w-full h-16 bg-black/30 px-3 flex gap-2 mt-2 ">
      <button
        onClick={() => setTab("login")}
        className={`rounded-2xl h-full lg:h-[80%] w-1/2 flex justify-center items-center font-bold transition-all  ${
          tab === "login"
            ? "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-800 scale-110 "
            : "bg-transparent hover:bg-black/20"
        }`}
      >
        <span className="transition-all ">{tab === "login" ? <Dot size={30} /> : <Dot size={30} color="grey" />}</span>
        <span className={`transition-all  ${tab === "login" ? "text-white" : "text-gray-400"}`}>LOGIN</span>
      </button>
      <button
        onClick={() => setTab("signup")}
        className={`rounded-2xl h-full lg:h-[80%] w-1/2 flex justify-center items-center font-bold   ${
          tab === "signup"
            ? "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-800 transition-all scale-110"
            : "bg-transparent hover:bg-black/20"
        }`}
      >
        <span className="transition-all ">{tab === "signup" ? <Dot size={30} /> : <Dot size={30} color="grey" />}</span>
        <span className={`transition-all  ${tab === "signup" ? "text-white" : "text-gray-400"}`}>SIGNUP</span>
      </button>
    </div>
  );
}
