import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { allLessons, getKnowledgeForLesson, getMasteryByKnowledgeId } from "@/lib/data";
import { getMasteryStatus, masteryColors, masteryLabels } from "@/lib/mastery";
import { cn } from "@/lib/utils";

export default function LessonsPage() {
  return (
    <AppShell>
      <div className="mb-5">
        <h1 className="text-2xl font-black">Lesson Browser</h1>
        <p className="mt-1 text-sm text-slate-500">标准日本语第三版 初级下 第 24-30 课，课次只是路径，知识点才是源数据。</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {allLessons.map((lesson) => {
          const knowledge = getKnowledgeForLesson(lesson.id);
          const average = knowledge.length
            ? Math.round(knowledge.reduce((sum, item) => sum + (getMasteryByKnowledgeId(item.id)?.mastery_score ?? 0), 0) / knowledge.length)
            : 0;
          const status = lesson.status === "upcoming" ? "upcoming" : getMasteryStatus(average);
          const color = masteryColors[status];

          return (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`} className={cn("card block p-5 transition hover:-translate-y-0.5", color.border)}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-slate-500">第 {lesson.lesson_number} 课</div>
                  <div className="mt-2 text-lg font-black">{lesson.lesson_title}</div>
                </div>
                <span className={cn("rounded-md border px-2 py-1 text-xs font-bold", color.bg, color.text, color.border)}>
                  {lesson.status === "current" ? "当前课" : masteryLabels[status]}
                </span>
              </div>
              <div className="mt-5 text-sm text-slate-500">{knowledge.length} 个映射知识点 · 平均 {average}%</div>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
