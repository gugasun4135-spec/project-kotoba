import { masteryColors, masteryLabels } from "@/lib/mastery";
import type { MasteryStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MasteryBadge({ status }: { status: MasteryStatus }) {
  const color = masteryColors[status];
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-1 text-xs font-bold", color.bg, color.text, color.border)}>
      {masteryLabels[status]}
    </span>
  );
}
