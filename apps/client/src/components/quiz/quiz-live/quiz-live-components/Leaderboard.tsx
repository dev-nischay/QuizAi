import { useLayoutEffect, useMemo, useRef } from "react";
import { useAuthStore } from "../../../../store/authStore";
import { useLiveStore } from "../../../../store/liveStore";

type Player = { name: string; score: number };

export default function Leaderboard() {
  const players = useLiveStore((state) => state.leaderBoard) ?? [];
  const liveUsers = useLiveStore((state) => state.liveUsers);

  const currentUsername = useAuthStore((state) => state.username);

  const sorted = useMemo(() => [...players].sort((a, b) => b.score - a.score), [players]);

  const topFive = sorted.slice(0, 5);

  const youIndex = sorted.findIndex((p) => p.name.toLowerCase() === currentUsername.toLowerCase());
  const you = youIndex !== -1 ? sorted[youIndex] : null;

  const rowRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const metaRef = useRef<Map<string, { rank: number; score: number }>>(new Map());
  const positionsRef = useRef<Map<string, DOMRect>>(new Map());
  const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const setRowRef = (rowKey: string) => (node: HTMLDivElement | null) => {
    if (node) rowRefs.current.set(rowKey, node);
    else rowRefs.current.delete(rowKey);
  };

  const signature = useMemo(() => sorted.map((p) => `${p.name}:${p.score}`).join("|"), [sorted]);

  useLayoutEffect(() => {
    const entries: Array<{ rowKey: string; player: Player; rank: number }> = [];
    topFive.forEach((player, index) =>
      entries.push({ rowKey: `top-${player.name.toLowerCase()}`, player, rank: index }),
    );
    if (you) entries.push({ rowKey: `you-${you.name.toLowerCase()}`, player: you, rank: youIndex });

    entries.forEach(({ rowKey, player, rank }) => {
      const node = rowRefs.current.get(rowKey);
      if (!node) return;

      const newRect = node.getBoundingClientRect();
      const oldRect = positionsRef.current.get(rowKey);
      const prevMeta = metaRef.current.get(rowKey);

      if (oldRect) {
        const deltaY = oldRect.top - newRect.top;
        if (Math.abs(deltaY) > 0.5) {
          node.style.transition = "none";
          node.style.transform = `translateY(${deltaY}px)`;
          node.getBoundingClientRect(); // force reflow
          requestAnimationFrame(() => {
            node.style.transition = "transform 420ms cubic-bezier(0.4, 0, 0.2, 1)";
            node.style.transform = "";
          });
        }
      }

      let direction: "up" | "down" | "new" | "flash" | null = null;
      if (!prevMeta) {
        direction = "new";
      } else if (prevMeta.rank !== rank) {
        direction = prevMeta.rank > rank ? "up" : "down";
      } else if (prevMeta.score !== player.score) {
        direction = "flash";
      }

      if (direction) {
        const pending = timeoutsRef.current.get(rowKey);
        if (pending) clearTimeout(pending);

        node.dataset.direction = direction;
        node.classList.add("lb-row-active");

        const timeoutId = setTimeout(() => {
          node.classList.remove("lb-row-active");
          delete node.dataset.direction;
        }, 900);
        timeoutsRef.current.set(rowKey, timeoutId);
      }

      metaRef.current.set(rowKey, { rank, score: player.score });
      positionsRef.current.set(rowKey, newRect);
    });
  }, [signature]);

  const renderRow = (player: Player, index: number, isYou = false) => {
    const rowKey = isYou ? `you-${player.name.toLowerCase()}` : `top-${player.name.toLowerCase()}`;
    const { rankColor, rankBg } = getRankStyles(index);

    return (
      <div
        key={rowKey}
        ref={setRowRef(rowKey)}
        className={`lb-row flex items-center justify-between px-4 py-2 rounded-xl border will-change-transform ${
          isYou
            ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20"
            : "border-transparent hover:bg-slate-50 dark:hover:bg-white/5 hover:border-slate-100 dark:hover:border-white/5"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm transition-colors duration-300 ${rankBg} ${rankColor}`}
          >
            {index + 1}
          </div>
          <span className="font-sans font-medium text-sm text-slate-700 dark:text-slate-200 truncate max-w-[140px]">
            {player.name}
            {isYou && (
              <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-indigo-500 dark:text-indigo-400">
                You
              </span>
            )}
          </span>
          <span className="lb-arrow lb-arrow-up text-emerald-500 text-sm">▲</span>
          <span className="lb-arrow lb-arrow-down text-rose-400 text-sm">▼</span>
        </div>
        <span className="lb-score font-mono font-semibold text-base text-emerald-600 dark:text-emerald-400">
          {player.score}
        </span>
      </div>
    );
  };

  return (
    <div className="animate-fadeIn flex flex-col h-full bg-white/80 dark:bg-[#141821]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden animate-fade-in">
      <style>{`
        .lb-arrow { opacity: 0; transform: translateY(2px); transition: opacity 200ms ease, transform 200ms ease; }
        [data-direction="up"] .lb-arrow-up { opacity: 1; transform: translateY(0); }
        [data-direction="down"] .lb-arrow-down { opacity: 1; transform: translateY(0); }

        .lb-row-active[data-direction="up"] { animation: lbGlowUp 900ms ease; }
        .lb-row-active[data-direction="down"] { animation: lbGlowDown 900ms ease; }
        .lb-row-active[data-direction="new"] { animation: lbGlowNew 900ms ease; }
        .lb-row-active[data-direction="flash"] { animation: lbGlowFlash 900ms ease; }

        .lb-row-active .lb-score { animation: lbScoreBump 500ms ease; }

        @keyframes lbGlowUp {
          0%   { background-color: rgba(16,185,129,0.28); box-shadow: 0 0 0 2px rgba(16,185,129,0.55) inset; }
          100% { background-color: transparent; box-shadow: 0 0 0 0 rgba(16,185,129,0) inset; }
        }
        @keyframes lbGlowDown {
          0%   { background-color: rgba(244,63,94,0.22); box-shadow: 0 0 0 2px rgba(244,63,94,0.45) inset; }
          100% { background-color: transparent; box-shadow: 0 0 0 0 rgba(244,63,94,0) inset; }
        }
        @keyframes lbGlowNew {
          0%   { background-color: rgba(99,102,241,0.22); box-shadow: 0 0 0 2px rgba(99,102,241,0.45) inset; }
          100% { background-color: transparent; box-shadow: 0 0 0 0 rgba(99,102,241,0) inset; }
        }
        @keyframes lbGlowFlash {
          0%   { background-color: rgba(148,163,184,0.25); }
          100% { background-color: transparent; }
        }
        @keyframes lbScoreBump {
          0%   { transform: scale(1); }
          35%  { transform: scale(1.22); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div className="px-6 py-3 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <i className="ph-fill ph-trophy text-amber-500 text-2xl"></i>
          <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-[#F1F3F7]">Leaderboard</h3>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Live: <span className="animate-pulse text-emerald-400 font-semibold">{liveUsers.length}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
        {topFive.map((player, index) => renderRow(player, index))}

        {sorted.length === 0 && (
          <div className="text-center p-8 text-sm text-slate-500 dark:text-slate-400 font-sans">No players yet.</div>
        )}

        {sorted.length > 0 && (
          <>
            <div className=" pb-1.5 px-1">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                You
              </span>
            </div>
            {you ? (
              renderRow(you, youIndex, true)
            ) : (
              <div className="text-center p-4 text-xs text-slate-500 dark:text-slate-400 font-sans">
                You haven't played yet.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const getRankStyles = (index: number) => {
  let rankColor = "text-slate-400 dark:text-slate-500";
  let rankBg = "bg-slate-100 dark:bg-white/5";

  if (index === 0) {
    rankColor = "text-amber-600 dark:text-amber-400";
    rankBg = "bg-amber-100 dark:bg-amber-500/20";
  } else if (index === 1) {
    rankColor = "text-slate-600 dark:text-slate-300";
    rankBg = "bg-slate-200 dark:bg-slate-500/30";
  } else if (index === 2) {
    rankColor = "text-orange-700 dark:text-orange-400";
    rankBg = "bg-orange-100 dark:bg-orange-500/20";
  }

  return { rankColor, rankBg };
};
