import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { MasteryBadge } from "@/components/MasteryBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { getKnowledgeById, getLessonsForKnowledge, getMasteryByKnowledgeId, getRelationshipsForKnowledge, allWrongQuestions } from "@/lib/data";
import { getMasteryStatus } from "@/lib/mastery";

export default async function KnowledgeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getKnowledgeById(id);
  if (!item) notFound();

  const mastery = getMasteryByKnowledgeId(id);
  const status = getMasteryStatus(mastery?.mastery_score ?? 0, mastery?.status ?? "not_started");
  const relationships = getRelationshipsForKnowledge(id);
  const lessons = getLessonsForKnowledge(id);
  const wrongQuestions = allWrongQuestions.filter((question) => question.mock_analysis.related_knowledge_ids.includes(id));

  return (
    <AppShell>
      <Link href="/knowledge" className="mb-4 inline-flex text-sm font-bold text-matcha">← Knowledge Browser</Link>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-sm font-bold text-matcha">{item.jlpt_level} · {item.domain} · {item.group}</div>
              <h1 className="mt-2 text-4xl font-black">{item.title}</h1>
              <p className="mt-2 text-lg text-slate-600">{item.title_cn}</p>
            </div>
            <MasteryBadge status={status} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="text-sm font-black">用法概要</div>
              <p className="mt-2 text-sm text-slate-600">{item.description_cn}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="text-sm font-black">形式</div>
              <p className="mt-2 text-sm text-slate-600">{item.form}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-black">例句</h2>
            <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4">
              <div className="text-lg font-bold">{item.example_jp}</div>
              <div className="mt-1 text-slate-500">{item.example_cn}</div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <section>
              <h2 className="text-lg font-black">注意点</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {item.usage_notes.map((note) => <li key={note}>• {note}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-black">常见错误</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {item.common_mistakes.map((note) => <li key={note}>• {note}</li>)}
              </ul>
            </section>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="card-title">掌握度</h2>
            <div className="mt-4 text-3xl font-black text-matcha">{mastery?.mastery_score ?? 0}%</div>
            <div className="mt-3"><ProgressBar value={mastery?.mastery_score ?? 0} status={status} /></div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
              <div>复习 {mastery?.review_count ?? 0}</div>
              <div>正确 {mastery?.correct_count ?? 0}</div>
              <div>错误 {mastery?.wrong_count ?? 0}</div>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="card-title">关联知识</h2>
            <div className="mt-4 space-y-2">
              {relationships.map((relationship) => {
                const other = relationship.from_knowledge_id === id ? relationship.to : relationship.from;
                return (
                  <Link key={relationship.id} href={`/knowledge/${other?.id}`} className="block rounded-lg border border-slate-200 bg-white p-3 text-sm hover:border-matcha/40">
                    <div className="font-bold text-slate-500">{relationship.relationship_type}</div>
                    <div className="font-black">{other?.title}</div>
                    <div className="mt-1 text-xs text-slate-500">{relationship.description}</div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="card-title">教材位置</h2>
            <div className="mt-4 space-y-2">
              {lessons.map((lesson) => (
                <Link key={lesson.id} href={`/lessons/${lesson.id}`} className="block rounded-lg bg-slate-50 p-3 text-sm font-bold">
                  {lesson.book_level} 第 {lesson.lesson_number} 课
                  <div className="font-normal text-slate-500">{lesson.lesson_title}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="card-title">相关错题</h2>
            <div className="mt-4 space-y-2 text-sm">
              {wrongQuestions.length ? wrongQuestions.map((question) => (
                <Link key={question.id} href="/wrong-questions" className="block rounded-lg bg-red-50 p-3 text-red-700">
                  {question.question}
                </Link>
              )) : <div className="text-slate-500">暂无错题记录</div>}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
