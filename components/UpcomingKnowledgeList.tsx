import Link from "next/link";
import { getUpcomingKnowledge } from "@/lib/data";

export function UpcomingKnowledgeList() {
  const upcoming = getUpcomingKnowledge(6);

  return (
    <div className="card p-5">
      <h2 className="card-title">8. 即将学习的知识</h2>
      <div className="mt-4 space-y-3">
        {upcoming.map((item) => (
          <Link key={`${item.lesson?.id}-${item.knowledge?.id}`} href={`/knowledge/${item.knowledge?.id}`} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm hover:border-ai/40">
            <span className="font-black">{item.knowledge?.title}</span>
            <span className="text-slate-500">第 {item.lesson?.lesson_number} 课</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
