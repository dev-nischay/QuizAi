export type Stats = {
  value: string;
  domain: string;
};

export default function Badge({ value, domain }: Stats) {
  return (
    <div className="w-44 h-20 bg-gradient-to-br from-emerald-950/10 to-transparent border border-emerald-500/20 backdrop-blur-sm    rounded-xl   border-emerald-900 p-2 pl-4 flex flex-col justify-start gap-1 hover:border-emerald-500/40 ">
      <div className="text-3xl font-black  text-emerald-400">{value}</div>
      <div className="text-gray-400 font-semibold text-xs font-mono tracking-wider">{domain}</div>
    </div>
  );
}
