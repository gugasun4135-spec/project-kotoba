import { getJlptSummary } from "@/lib/data";
import { percent } from "@/lib/utils";

export function KnowledgeTree() {
  const summary = getJlptSummary();

  return (
    <div className="card p-5">
      <h2 className="card-title">2. 知识树（按 JLPT 级别）</h2>
      <div className="mt-4 space-y-4">
        {summary.map((level) => {
          const parts = [
            { key: "learned", value: level.learned, className: "bg-matcha" },
            { key: "good", value: level.good, className: "bg-green-300" },
            { key: "medium", value: level.medium, className: "bg-kohaku" },
            { key: "weak", value: level.weak, className: "bg-beniiro" },
            { key: "not", value: Math.max(level.seedCount - level.learned - level.good - level.medium - level.weak, level.notStarted), className: "bg-slate-300" }
          ];

          return (
            <div key={level.level}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-black">{level.level}</span>
                <span className="text-slate-500">{level.seedCount} seed / 目标 {level.total}</span>
              </div>
              <div className="flex h-7 overflow-hidden rounded-md bg-slate-100">
                {parts.map((part) => (
                  <div key={part.key} className={part.className} style={{ width: `${Math.max(part.value ? 8 : 0, percent(part.value, Math.max(level.seedCount, 1)))}%` }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-xs text-slate-500">当前展示 seed catalog，N3-N1 保留为未来扩展层级。</div>
    </div>
  );
}
