import { Outlet } from "react-router-dom";
import { toggleTheme } from "../utils/toggleTheme";
import { Moon, RadioTower } from "lucide-react";
import { Toaster } from "react-hot-toast";

export default function MainLayout() {
  return (
    <div className="antialiased text-slate-900  min-h-screen  px-2 lg:px-5 py-2  dark:text-[#F1F3F7] transition-colors duration-300 relative overflow-hidden">
      <AmbientBackground />
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-2.5 animate-fade-in">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-400 flex items-center justify-center shadow-sm">
            <i className="ph-bold ph-lightning text-white dark:text-slate-900 text-lg p-2 size-8 flex justify-center items-center">
              <RadioTower />
            </i>
          </div>
          <span className="font-sans font-bold text-xl tracking-tight text-slate-900 dark:text-[#F1F3F7]">
            Quiz<span className="text-emerald-600 dark:text-emerald-400">Live</span>
          </span>
        </div>
        <button
          onClick={() => toggleTheme()}
          className=" p-2 size-8 flex justify-center items-center rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-[#141821] text-slate-500 dark:text-[#8A93A3] hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-sm qz-focusable cursor-pointer animate-fade-in"
          title="Toggle Theme"
        >
          <Moon />
        </button>
      </nav>
      <Outlet />
      <Toaster position="bottom-left" reverseOrder={true} />
    </div>
  );
}

function AmbientBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none overflow-hidden transition-opacity duration-500">
      {/* Violet Blob */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-50 dark:opacity-20 animate-blob bg-violet-300 dark:bg-violet-700"></div>
      {/* Cyan Blob */}
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-50 dark:opacity-20 animate-blob animation-delay-2000 bg-cyan-300 dark:bg-cyan-700"></div>
      {/* Teal Blob */}
      <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-40 dark:opacity-[0.15] animate-blob animation-delay-4000 bg-teal-300 dark:bg-teal-600"></div>
    </div>
  );
}
