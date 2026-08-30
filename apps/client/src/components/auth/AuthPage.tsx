import { useRef, useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../services/createAccount";
import { loginAccount } from "../../services/loginAccount";
import { useNavigate } from "react-router-dom";
import { BRAND_BULLETS } from "../../design/bullets";
import type { AuthFormData } from "./auth.types";
import { useAuthStore } from "../../store/authStore";
import { type ApiResponse, type ApiError } from "../../services/api";
import { SubmitButton } from "../globals/LoadingButton";
import { Toast } from "../../utils/customToast";
import { ErrorModal } from "../globals/Error";
export default function AuthPage() {
  const setUsername = useAuthStore((state) => state.setUsername);
  const setToken = useAuthStore((state) => state.setToken);
  const nav = useNavigate();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const usernameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signupMutation = useMutation<ApiResponse<AuthFormData>, ApiError<AuthFormData>, AuthFormData>({
    mutationFn: createAccount,
    onSuccess: (_data, { username }) => {
      setUsername(username ?? "");
      setTab("login");
      usernameRef.current && (usernameRef.current.value = "");
    },
    onError: (err) => {
      console.log(err);

      Toast.err(err.error);
    },
  });

  const loginMutation = useMutation<
    ApiResponse<{ token: string; username: string }>,
    ApiError<AuthFormData>,
    AuthFormData
  >({
    mutationFn: loginAccount,
    onSuccess: ({ data }) => {
      Toast.success("login succesfull");

      const token = data?.token;
      const username = data?.username;
      if (token) setToken(token);
      if (username) setUsername(username);
      nav("/home");
      passwordRef.current && (passwordRef.current.value = "");
    },
    onError: (err) => {
      Toast.err(err.error);
    },
  });

  const isPending = signupMutation.isPending || loginMutation.isPending;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value ?? "";
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    if (tab === "signup") {
      signupMutation.mutate({ username, email, password });
    } else {
      loginMutation.mutate({ email, password });
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Main Layout Grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center z-10 mt-16 sm:mt-0">
        {/* Hero / Brand Section */}
        <div className="hidden lg:block order-2 lg:order-1 space-y-8 animate-fade-in ">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans text-slate-900 dark:text-[#F1F3F7] leading-tight tracking-tight">
              The ultimate quiz <br className="hidden sm:block" />
              building experience.
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 font-sans max-w-md leading-relaxed">
              Create, share, and analyze quizzes in real-time. Built for educators, creators, and dynamic teams.
            </p>
          </div>

          {/* Brand Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {BRAND_BULLETS.map((bullet, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-[#1A1F2A] border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-sm">
                  <span className="text-xl leading-none select-none" style={{ color: bullet.colorHex }}>
                    {bullet.shape}
                  </span>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-sm text-slate-900 dark:text-[#F1F3F7] mb-1">
                    {bullet.title}
                  </h3>
                  <p className="font-sans text-xs text-slate-500 dark:text-[#8A93A3] leading-relaxed">{bullet.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="w-full max-w-md mx-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#141821]/80 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
            {/* Segmented Toggle */}
            <div className="mb-8">
              <div className="inline-flex p-[3px] rounded-[9px] bg-slate-100 dark:bg-[#1A1F2A] border border-slate-200 dark:border-white/10 w-full relative">
                <button
                  onClick={() => setTab("login")}
                  className={`w-1/2 font-sans text-sm font-semibold px-4 py-2 rounded-md cursor-pointer transition-all duration-200 qz-focusable ${
                    tab === "login"
                      ? "bg-white dark:bg-[#141821] text-slate-900 dark:text-[#F1F3F7] shadow-sm dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),_0_8px_24px_-12px_rgba(0,0,0,0.6)]"
                      : "bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => setTab("signup")}
                  className={`w-1/2 font-sans text-sm font-semibold px-4 py-2 rounded-md cursor-pointer transition-all duration-200 qz-focusable ${
                    tab === "signup"
                      ? "bg-white dark:bg-[#141821] text-slate-900 dark:text-[#F1F3F7] shadow-sm dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),_0_8px_24px_-12px_rgba(0,0,0,0.6)]"
                      : "bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Conditional Name Field for Signup */}
              <div
                className={`space-y-4 transition-all duration-300 overflow-hidden ${tab === "signup" ? "max-h-24 opacity-100" : "max-h-0 opacity-0 m-0"}`}
              >
                <div className="space-y-1.5">
                  <label className="font-sans font-medium text-xs text-slate-700 dark:text-slate-300">Full Name</label>
                  <input
                    type="text"
                    ref={usernameRef}
                    placeholder="John Doe"
                    required={tab === "signup"}
                    className="w-full bg-slate-50 dark:bg-[#1A1F2A] border border-slate-200 dark:border-white/10 rounded-lg p-3 font-sans text-sm text-slate-900 dark:text-[#F1F3F7] placeholder:text-slate-400 dark:placeholder:text-slate-600 qz-focusable transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-sans font-medium text-xs text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  ref={emailRef}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-slate-50 dark:bg-[#1A1F2A] border border-slate-200 dark:border-white/10 rounded-lg p-3 font-sans text-sm text-slate-900 dark:text-[#F1F3F7] placeholder:text-slate-400 dark:placeholder:text-slate-600 qz-focusable transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="font-sans font-medium text-xs text-slate-700 dark:text-slate-300">Password</label>
                  {tab === "login" && (
                    <a
                      href="#"
                      className="font-sans font-medium text-xs text-emerald-600 dark:text-emerald-400 hover:underline qz-focusable rounded"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  ref={passwordRef}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50 dark:bg-[#1A1F2A] border border-slate-200 dark:border-white/10 rounded-lg p-3 font-sans text-sm text-slate-900 dark:text-[#F1F3F7] placeholder:text-slate-400 dark:placeholder:text-slate-600 qz-focusable transition-colors tracking-widest"
                />
              </div>

              <SubmitButton isLoading={isPending} tab={tab} />
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white dark:bg-[#141821] text-slate-500 dark:text-slate-400 font-sans">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-6 font-sans font-medium text-sm rounded-lg px-4 py-3 inline-flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-all qz-focusable"
              >
                <i className="ph-fill ph-google-logo text-xl text-rose-500"></i>
                Google
              </button>
            </div>
          </div>

          <p className="text-center font-sans text-xs text-slate-500 dark:text-slate-400 mt-6">
            By proceeding, you agree to our{" "}
            <a href="#" className="underline hover:text-slate-700 dark:hover:text-slate-200">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-slate-700 dark:hover:text-slate-200">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
