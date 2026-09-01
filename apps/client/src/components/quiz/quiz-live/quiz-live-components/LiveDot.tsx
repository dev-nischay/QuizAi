export const LiveDot = () => (
  <span className="relative flex h-2.5 w-2.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
  </span>
);

export const OPTION_IDENTITIES_LIVE = [
  {
    id: 0,
    shape: "▲",
    colorHex: "#5EEAD4",
    tailwindText: "text-teal-500 dark:text-teal-400",
    tailwindBg: "bg-teal-50 dark:bg-teal-500/10",
    fill: "bg-teal-500",
    barBg: "bg-teal-50 dark:bg-teal-500/10",
    border: "border-teal-200 dark:border-teal-500/30",
  },
  {
    id: 1,
    shape: "◆",
    colorHex: "#FBBF24",
    tailwindText: "text-amber-500 dark:text-amber-400",
    tailwindBg: "bg-amber-50 dark:bg-amber-500/10",
    fill: "bg-amber-500",
    barBg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/30",
  },
  {
    id: 2,
    shape: "●",
    colorHex: "#FB7185",
    tailwindText: "text-rose-500 dark:text-rose-400",
    tailwindBg: "bg-rose-50 dark:bg-rose-500/10",
    fill: "bg-rose-500",
    barBg: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-200 dark:border-rose-500/30",
  },
  {
    id: 3,
    shape: "■",
    colorHex: "#818CF8",
    fill: "bg-indigo-500",
    barBg: "bg-indigo-50 dark:bg-indigo-500/10",
    tailwindText: "text-indigo-500 dark:text-indigo-400",
    tailwindBg: "bg-indigo-50 dark:bg-indigo-500/10",
    border: "border-indigo-200 dark:border-indigo-500/30",
  },
];
