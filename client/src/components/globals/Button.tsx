import type { HTMLProps } from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: HTMLProps<HTMLElement>["className"];
};

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`bg-gradient-to-r mt-4    transition-all  flex justify-center gap-3  font-extrabold font-sans  tracking-wider from-emerald-600 via-teal-600 to-emerald-600 py-3 ${className} `}
      {...props}
    >
      {children}
    </button>
  );
}
