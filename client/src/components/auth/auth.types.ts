import type { HTMLProps } from "react";
import type { LucideProps } from "lucide-react";
export type AuthFormData = {
  username?: string;
  email: string;
  password: string;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  id: string;
  ref: React.RefObject<HTMLInputElement | null>;
  className?: HTMLProps<HTMLElement>["className"];
  error?: string;
  errCounter: number;
};

export type TabSwitcherProps<T> = {
  tab: "login" | "signup";
  setTab: React.Dispatch<React.SetStateAction<"login" | "signup">>;
  setFieldError: React.Dispatch<React.SetStateAction<T | undefined>>;
};

export type Features = {
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  title: string;
  text: string;
};
