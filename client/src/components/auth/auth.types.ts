import type { HTMLProps } from "react";
import type { LucideProps } from "lucide-react";
export type loginInput = {
  username: string;
  email: string;
  password: string;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  id: string;
  ref: React.RefObject<HTMLInputElement | null>;
  className?: HTMLProps<HTMLElement>["className"];
  error?: string;
};

export type TabSwitcherProps = {
  tab: "login" | "signup";
  setTab: React.Dispatch<React.SetStateAction<"login" | "signup">>;
};

export type Features = {
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  title: string;
  text: string;
};
