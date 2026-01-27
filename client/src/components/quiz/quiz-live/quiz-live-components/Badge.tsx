export default function Badge({ text }: { text: string }) {
  return (
    <div className=" w-fit uppercase text-xs font-mono text-emerald-400 bg-emerald-950/50 border rounded-md border-emerald-950 px-3 py-1">
      {text}
    </div>
  );
}
