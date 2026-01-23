import type { Features } from "../auth.types";

export default function Feature({ Icon, title, text }: Features) {
  return (
    <div className="flex gap-3 items-center ">
      <div className="size-9 bg-gradient-to-br from-emerald-950 to-transparent flex justify-center items-center rounded-lg border border-emerald-900 hover:border-emerald-700">
        <Icon size={18} color="#11df90" />
      </div>
      <div className="flex flex-col  items-start ">
        <div className="font-bold ">{title}</div>
        <div className="text-xs tracking-wide text-gray-400">{text}</div>
      </div>
    </div>
  );
}
