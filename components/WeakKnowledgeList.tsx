import Link from "next/link";
import { getWeakKnowledge } from "@/lib/data";
import { getMasteryStatus } from "@/lib/mastery";
import { ProgressBar } from "./ProgressBar";

export function WeakKnowledgeList() {
  const weak = getWeakKnowledge(10);

  return (
    <div className="card p-5">
      <h2 className="card-title">7. 薄弱知识 Top 10</h2>
      <div className="mt-4 space-y-3">
        {weak.map((item, index) => (
          <Link key={item.mastery.knowledge_id} href={`/knowledge/${item.mastery.knowledge_id}`} className="grid grid-cols-[24px_1fr_120px_42px] items-center gap-3 text-sm">
            <span className="font-bold text-slate-500">{index + 1}</span>
            <span className="font-bold">{item.knowledge?.title}</span>
            <ProgressBar value={item.mastery.mastery_score} status={getMasteryStatus(item.mastery.mastery_score)} />
            <span className="text-right font-bold text-slate-600">{item.mastery.mastery_score}%</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
