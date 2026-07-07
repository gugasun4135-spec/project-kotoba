import Link from "next/link";
import { getLessonsForKnowledge, getMasteryByKnowledgeId } from "@/lib/data";
import { getMasteryStatus } from "@/lib/mastery";
import type { Knowledge } from "@/lib/types";
import { MasteryBadge } from "./MasteryBadge";
import { ProgressBar } from "./ProgressBar";

export function KnowledgeCard({ item }: { item: Knowledge }) {
  const mastery = getMasteryByKnowledgeId(item.id);
  const status = getMasteryStatus(mastery?.mastery_score ?? 0, mastery?.status ?? "not_started");
  const lessons = getLessonsForKnowledge(item.id);

  return (
    <Link href={`/knowledge/${item.id}`} className="card block p-4 transition hover:-translate-y-0.5 hover:border-matcha/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-black">{item.title}</div>
          <div className="mt-1 text-sm text-slate-500">{item.title_cn}</div>
        </div>
        <MasteryBadge status={status} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
        <span>{item.domain}</span>
        <span>{item.group}</span>
        <span>{item.jlpt_level}</span>
        <span>难度 {item.difficulty}/5</span>
      </div>
      <div className="mt-4">
        <ProgressBar value={mastery?.mastery_score ?? 0} status={status} />
        <div className="mt-2 text-xs text-slate-500">{mastery?.mastery_score ?? 0}% · {lessons.map((lesson) => `第${lesson.lesson_number}课`).join(" / ") || "未映射课次"}</div>
      </div>
    </Link>
  );
}
