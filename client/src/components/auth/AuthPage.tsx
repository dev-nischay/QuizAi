import { useRef, useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../services/createAccount";
import { loginAccount } from "../../services/loginAccount";
import { useNavigate } from "react-router-dom";
import { Zap, Brain, Users, TrendingUp } from "lucide-react";
import Feature from "./authComponents/Feature";
import Badge from "./authComponents/Badge";
import Input from "./authComponents/Input";
import MobileLogo from "./authComponents/MobileLogo";
import TabSwitcher from "./authComponents/TabSwitcher";
import Button from "../globals/Button";
import type { AuthFormData } from "./auth.types";
import { useFormSubmit } from "../../hooks/form-submit";
import { loginSchema, signupSchema } from "../../validation/auth-schema";
import { useAuthStore } from "../../store/authStore";
import Loading from "../globals/Loading";
import type { AxiosError } from "axios";
import { type ApiResponse, type ApiError } from "../../services/api";

export default function AuthPage() {
  const setUsername = useAuthStore((state) => state.setUsername);
  const setToken = useAuthStore((state) => state.setToken);
  const nav = useNavigate();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signupMutation = useMutation<ApiResponse<AuthFormData>, AxiosError<ApiError<AuthFormData>>, AuthFormData>({
    mutationFn: createAccount,
    onSuccess: (_data, { username }) => {
      setUsername(username ?? "");
      setTab("login");
      usernameRef.current && (usernameRef.current.value = "");
    },
    onError: (err) => {
      setFieldErrors(err.response?.data.fieldErrors);
    },
  });

  const loginMutation = useMutation<ApiResponse<{ token: string }>, AxiosError<ApiError<AuthFormData>>, AuthFormData>({
    mutationFn: loginAccount,
    onSuccess: ({ data }) => {
      const token = data?.token;
      if (token) setToken(token);
      nav("/home");
      passwordRef.current && (passwordRef.current.value = "");
      emailRef.current && (emailRef.current.value = "");
    },
    onError: (err) => {
      setFieldErrors(err.response?.data.fieldErrors);

      // only setting field errors as there would be no point in using generic error
    },
  });

  const { fieldErrors, validator, submitCount, setFieldErrors } = useFormSubmit<AuthFormData>();

  const isPending = signupMutation.isPending || loginMutation.isPending;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value ?? "";
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    if (tab === "signup") {
      const isValid = validator({ username, email, password }, signupSchema);
      if (isValid) signupMutation.mutate({ username, email, password });
    } else {
      const isValid = validator({ email, password }, loginSchema);
      if (isValid) loginMutation.mutate({ email, password });
    }
  };

  if (isPending) return <Loading />;

  return (
    <div>
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
          <TabSwitcher tab={tab} setTab={setTab} setFieldError={setFieldErrors} />

          {/* input area */}
          <div className="w-full mt-2 font-mono ">
            <form onSubmit={handleSubmit} className="flex flex-col px-7 py-8 gap-7">
              {tab === "signup" && (
                <Input
                  id="username"
                  placeholder="eg.jackphin"
                  ref={usernameRef}
                  errCounter={submitCount}
                  error={fieldErrors?.username ?? ""}
                />
              )}

              <Input
                id="email address"
                placeholder="name@example.com"
                ref={emailRef}
                errCounter={submitCount}
                error={fieldErrors?.email ?? ""}
              />

              <Input
                id="password"
                placeholder="....."
                ref={passwordRef}
                className=" border border-blue-900 hover:border-blue-700 focus:border-blue-700 "
                error={fieldErrors?.password ?? ""}
                errCounter={submitCount}
              />

              <div className="flex gap-1 items-center mt-4">
                <input type="checkbox" className="size-4" />
                <label htmlFor="check" className="text-sm text-gray-400   tracking-wider  font-semibold ">
                  Remebmer me
                </label>
              </div>

              <Button type="submit" className="hover:scale-105">
                <span>
                  <Zap />
                </span>
                <span className="3xl:text-xl animate-pulse ">
                  {tab === "login" ? "ACCESS SYSTEM" : "INITIALIZE ACCOUNT"}
                </span>
                <span>
                  <Zap />
                </span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
