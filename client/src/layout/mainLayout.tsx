import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen  relative bg-black text-white  px-4 py-2 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-black to-teal-950"></div>

        {/* Animated lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-teal-500 to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent animate-pulse"></div>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
          linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
        `,
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
