import { AppShell } from "@/components/AppShell";
import { KnowledgeCard } from "@/components/KnowledgeCard";
import { allKnowledge } from "@/lib/data";

export default function KnowledgePage() {
  const domains = Array.from(new Set(allKnowledge.map((item) => item.domain)));

  return (
    <AppShell>
      <div className="mb-5">
        <h1 className="text-2xl font-black">Knowledge Browser</h1>
        <p className="mt-1 text-sm text-slate-500">按领域浏览所有 seed knowledge。筛选功能会在下一轮继续增强。</p>
      </div>

      <div className="card mb-5 grid gap-3 p-4 md:grid-cols-4">
        <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Search by title" disabled />
        <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm" disabled>
          <option>JLPT level</option>
        </select>
        <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm" disabled>
          <option>Mastery status</option>
        </select>
        <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm" disabled>
          <option>Textbook lesson</option>
        </select>
      </div>

      <div className="space-y-6">
        {domains.map((domain) => (
          <section key={domain}>
            <h2 className="mb-3 text-lg font-black">{domain}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {allKnowledge.filter((item) => item.domain === domain).map((item) => (
                <KnowledgeCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
