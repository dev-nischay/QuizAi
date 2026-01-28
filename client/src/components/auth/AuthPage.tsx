import { useRef, useState, type FormEvent } from "react";
import { Zap, Brain, Users, TrendingUp } from "lucide-react";
import Feature from "./authComponents/Feature";
import Badge from "./authComponents/Badge";
import Input from "./authComponents/Input";
import MobileLogo from "./authComponents/MobileLogo";
import TabSwitcher from "./authComponents/TabSwitcher";
export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  let usernameRef = useRef<HTMLInputElement>(null);
  let emailRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let username = usernameRef.current?.value;
    let email = emailRef.current?.value;
    let password = passwordRef.current?.value;

    if (tab === "signup") {
      if (username && email && password) {
        console.log({ username, email, password }); // logic
        usernameRef.current!.value = "";
      }
    } else {
      if (email && password) {
        console.log({ email, password });
      }
    }

    emailRef.current!.value = "";
    passwordRef.current!.value = "";
  };

  return (
    <div className="  w-full lg:max-w-6xl 2xl:mt-44   mx-auto  grid grid-cols-1  lg:grid-cols-2  mt-20 lg:mt-28    ">
      {/* Quiz Content Full Screen */}
      <div className=" hidden h-fit lg:flex w-full flex-col    p-2 gap-6   ">
        {/* logo */}
        <div className="flex gap-2 items-center">
          <div className="bg-gradient-to-br from-emerald-600 via-teal-400 to-emerald-600  p-5 rounded-2xl   ">
            <Brain size={50} />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="font-black text-7xl">
              <span className="bg-gradient-to-r tracking-tight from-emerald-500 via-teal-300 to bg-emerald-500 bg-clip-text text-transparent ">
                Quiz
              </span>
              <span className="text-white">AI</span>
            </div>
            <div className="flex items-center gap-2 ">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-gray-400 font-mono">AI-POWERED SYSTEM ONLINE</p>
            </div>
          </div>
        </div>

        {/*  short description */}
        <div className="flex flex-col gap-2 ml-8 relative">
          <div className="absolute border border-emerald-800 bg-white inset-y-0 -left-8"></div>
          <div className="text-2xl font-bold">The Future of Learning</div>
          <div className="text-gray-400 tracking-wide">
            Experience next-generation quiz creation powered by aritifical intelligence. Create, compete, and conquer
            with cutting-edge technology.
          </div>
        </div>

        {/*stats*/}
        <div className="flex gap-2 items-center mt-2">
          <Badge value="1M+" domain="QUIZZES" />
          <Badge value="500K+" domain="USERS" />
          <Badge value="99.9%" domain="UPTIME" />
        </div>

        {/* features */}
        <Feature Icon={Zap} title="Instant Generation" text="AI creates quizzes in milliseconds" />
        <Feature Icon={Users} title="Real-time Multiplayer" text="Complete with players worldwide" />
        <Feature Icon={TrendingUp} title="Advanced Analytics" text="Track perfomance with AI insights" />
      </div>

      {/* auth card */}
      <div className="w-full h-fit max-w-3xl  lg:max-w-lg mx-auto    px-2 py-2  bg-transparent border   relative rounded-3xl border-emerald-950 bg-gradient-to-br from-slate-900  via-black to-slate-900 ">
        {/* Borders */}

        <div className="absolute -top-[1px] inset-x-0 h-[1px] max-w-52 mx-auto  bg-gradient-to-r from-emerald-950 via-teal-500 to-emerald-950" />
        <div className="absolute -bottom-[1px] inset-x-0 h-[1px] max-w-52 mx-auto  bg-gradient-to-r from-emerald-950 via-teal-500 to-emerald-950" />
        <div className="absolute w-[1px] max-h-52 top-20 bottom-0 -right-[1px]    bg-gradient-to-b from-emerald-950 via-teal-500 to-emerald-950" />
        <div className="absolute w-[1px] max-h-52 bottom-0 top-48  -left-[1px]   bg-gradient-to-b from-emerald-950 via-teal-500 to-emerald-950" />

        {/* mobile logo */}
        <MobileLogo />

        {/* tab switcher */}
        <TabSwitcher tab={tab} setTab={setTab} />

        {/* input area */}
        <div className="w-full mt-2 font-mono ">
          <form onSubmit={handleSubmit} className="flex flex-col px-7 py-8 gap-2">
            {tab == "signup" && <Input id="username" placeholder="eg.jackphin" ref={usernameRef} />}

            <Input id="email address" placeholder="name@example.com" ref={emailRef} />

            <Input
              id="password"
              placeholder="....."
              ref={passwordRef}
              className="border-blue-950 hover:border-blue-800 focus:border-blue-800 "
            />

            <div className="flex gap-1 items-center mt-4">
              <input type="checkbox" className="size-4" />
              <label htmlFor="check" className="text-sm text-gray-400   tracking-wider  font-semibold ">
                Remebmer me
              </label>
            </div>

            <button
              className="bg-gradient-to-r mt-4   hover:scale-105 transition-all  flex justify-center gap-3  font-extrabold font-sans  tracking-wider from-emerald-600 via-teal-600 to-emerald-600 py-3 "
              type="submit"
            >
              <span>
                <Zap />
              </span>
              <span className="3xl:text-xl animate-pulse ">
                {tab === "login" ? "ACCESS SYSTEM" : "INITIALIZE ACCOUNT"}
              </span>
              <span>
                <Zap />
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
