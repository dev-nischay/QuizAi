import type { HTMLProps } from "react";
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: HTMLProps<HTMLElement>["className"];
  Icon: null | any;
};

export const PrimaryButton = ({ children, Icon = null, ...props }: ButtonProps) => (
  <button
    {...props}
    className={`font-sans font-semibold text-sm md:text-base text-white bg-emerald-600 dark:bg-emerald-400 dark:text-slate-900 hover:brightness-105 active:brightness-95 rounded-xl px-6 py-3.5 inline-flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),_0_12px_32px_-16px_rgba(0,0,0,0.6)] qz-focusable w-full sm:w-auto min-w-[200px] `}
  >
    {Icon !== null && <Icon />}
    {children}
  </button>
);
