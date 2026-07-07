import Link from "next/link";
import { allLessons, getKnowledgeForLesson, getMasteryByKnowledgeId } from "@/lib/data";
import { getMasteryStatus, masteryColors, masteryLabels } from "@/lib/mastery";
import { cn } from "@/lib/utils";

export function LessonHeatmap() {
  return (
    <div className="card p-5">
      <h2 className="card-title">4. 课次掌握度热力图</h2>
      <div className="mt-5 flex flex-wrap gap-3">
        {allLessons.map((lesson) => {
          const items = getKnowledgeForLesson(lesson.id);
          const average = items.length
            ? Math.round(items.reduce((sum, item) => sum + (getMasteryByKnowledgeId(item.id)?.mastery_score ?? 0), 0) / items.length)
            : 0;
          const status = lesson.status === "upcoming" ? "upcoming" : getMasteryStatus(average);
          const color = masteryColors[status];

          return (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`} className={cn("w-[72px] rounded-lg border p-3 text-center", color.bg, color.text, color.border)}>
              <div className="text-lg font-black">{lesson.lesson_number}</div>
              <div className="mt-1 text-xs font-bold">{lesson.status === "current" ? "当前课" : masteryLabels[status]}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
