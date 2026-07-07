import { masteryColors } from "@/lib/mastery";
import type { MasteryStatus } from "@/lib/types";

export function ProgressBar({ value, status }: { value: number; status: MasteryStatus }) {
  const color = masteryColors[status].bar;
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div className={`${color} h-full rounded-full transition-all`} style={{ width: `${Math.max(4, Math.min(value, 100))}%` }} />
    </div>
  );
}
