import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { KnowledgeCard } from "@/components/KnowledgeCard";
import { allLessons, getKnowledgeForLesson, getLessonById } from "@/lib/data";

export default async function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLessonById(id);
  if (!lesson) notFound();

  const knowledge = getKnowledgeForLesson(id);
  const upcoming = allLessons.filter((item) => item.lesson_number > lesson.lesson_number).slice(0, 3);

  return (
    <AppShell>
      <Link href="/lessons" className="mb-4 inline-flex text-sm font-bold text-matcha">← Lesson Browser</Link>
      <div className="card p-6">
        <div className="text-sm font-bold text-matcha">{lesson.textbook_name}{lesson.edition} · {lesson.book_level}</div>
        <h1 className="mt-2 text-3xl font-black">第 {lesson.lesson_number} 课：{lesson.lesson_title}</h1>
        <div className="mt-3 text-sm text-slate-500">状态：{lesson.status === "current" ? "当前课" : lesson.status === "completed" ? "已学过" : "即将学习"}</div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
        <section>
          <h2 className="mb-3 text-lg font-black">本课知识点</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {knowledge.map((item) => <KnowledgeCard key={item.id} item={item} />)}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="card-title">课次摘要</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              本页展示 Lesson → Knowledge Items 的学习路径，但每个项目的定义、关系和掌握度都来自 Knowledge Catalog。
            </p>
          </div>
          <div className="card p-5">
            <h2 className="card-title">接下来三课</h2>
            <div className="mt-3 space-y-2">
              {upcoming.map((item) => (
                <Link key={item.id} href={`/lessons/${item.id}`} className="block rounded-lg border border-slate-200 bg-white p-3 text-sm">
                  <div className="font-black">第 {item.lesson_number} 课</div>
                  <div className="text-slate-500">{item.lesson_title}</div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
