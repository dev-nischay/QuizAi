type SubmitButtonProps = {
  isLoading: boolean;
  tab: "login" | "signup";
};

export function SubmitButton({ isLoading, tab }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full font-sans font-semibold text-sm text-white bg-emerald-600 dark:bg-emerald-400 dark:text-slate-900 hover:brightness-105 active:brightness-95 rounded-lg px-5 py-3 mt-4 inline-flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),_0_12px_32px_-16px_rgba(0,0,0,0.6)] qz-focusable"
    >
      {isLoading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Loading...
        </>
      ) : tab === "login" ? (
        "Sign In to Account"
      ) : (
        "Create Account"
      )}
    </button>
  );
}
