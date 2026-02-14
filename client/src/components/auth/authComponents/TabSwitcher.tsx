import { Dot } from "lucide-react";
import type { TabSwitcherProps } from "../auth.types";
import Button from "../../globals/Button";
import type { AuthFormData } from "../auth.types";
export default function TabSwitcher({ tab, setTab, setFieldError }: TabSwitcherProps<AuthFormData>) {
  return (
    <div className="max-w-full h-16 bg-black/30 px-3 flex gap-2 mt-2  ">
      <Button
        onClick={() => {
          setTab("login");
          setFieldError(undefined);
        }}
        className={` mt-0 ml-0 rounded-2xl h-full text-base lg:h-[80%] w-1/2 flex justify-center items-center font-bold transition-all    ${
          tab === "login" ? " scale-110 " : " bg-none bg-transparent "
        }`}
      >
        <span className="transition-all ">{tab === "login" ? <Dot size={30} /> : <Dot size={30} color="grey" />}</span>
        <span className={`transition-all  ${tab === "login" ? "text-white" : "text-gray-400"}`}>LOGIN</span>
      </Button>

      <Button
        onClick={() => {
          setTab("signup");
          setFieldError(undefined);
        }}
        className={`mt-0 rounded-2xl h-full lg:h-[80%] w-1/2 flex justify-center items-center font-bold py-0  ${
          tab === "signup" ? " transition-all scale-110" : "bg-none bg-transparent  "
        }`}
      >
        <span className="transition-all ">
          {tab === "signup" ? <Dot size={30} /> : <Dot size={30} className=" text-gray-400 hover:text-gray-200" />}
        </span>
        <span className={`transition-all  ${tab === "signup" ? "text-white" : "text-gray-400 hover:text-gray-200"}`}>
          SIGNUP
        </span>
      </Button>
    </div>
  );
}
// fix text to single property dry fix
