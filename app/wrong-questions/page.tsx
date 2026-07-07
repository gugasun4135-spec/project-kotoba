import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { allWrongQuestions, getKnowledgeById } from "@/lib/data";

export default function WrongQuestionsPage() {
  const question = allWrongQuestions[0];

  return (
    <AppShell>
      <div className="mb-5">
        <h1 className="text-2xl font-black">Wrong Questions</h1>
        <p className="mt-1 text-sm text-slate-500">AI 分析占位演示：本页只展示 mock 流程，不调用真实 AI、OCR 或数据库。</p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <div className="card p-5">
          <div className="text-sm font-black text-red-600">Card 1 · Wrong Question</div>
          <h2 className="mt-4 text-lg font-black">错题</h2>
          <div className="mt-3 rounded-lg bg-red-50 p-3 text-red-700">{question.question}</div>
          <div className="mt-4 text-sm text-slate-500">你的答案：{question.user_answer}</div>
          <div className="mt-2 text-sm text-matcha">正确答案：{question.correct_answer}</div>
        </div>

        <div className="card p-5">
          <div className="text-sm font-black text-ai">Card 2 · Mock AI Analysis</div>
          <h2 className="mt-4 text-lg font-black">AI 分析占位演示</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{question.mock_analysis.summary}</p>
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm">
            Error type: <span className="font-bold">{question.mock_analysis.error_type}</span>
          </div>
        </div>

        <div className="card p-5">
          <div className="text-sm font-black text-matcha">Card 3 · Related Knowledge</div>
          <h2 className="mt-4 text-lg font-black">关联知识点</h2>
          <div className="mt-3 space-y-3">
            {question.mock_analysis.related_knowledge_ids.map((id) => {
              const item = getKnowledgeById(id);
              return (
                <Link key={id} href={`/knowledge/${id}`} className="block rounded-lg border border-slate-200 bg-white p-3 text-sm hover:border-matcha/40">
                  <div className="font-black">{item?.title}</div>
                  <div className="text-slate-500">{id}</div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="card p-5">
          <div className="text-sm font-black text-kohaku">Card 4 · Mock Mastery Change</div>
          <h2 className="mt-4 text-lg font-black">模拟掌握度变化</h2>
          <div className="mt-3 space-y-3">
            {question.mock_analysis.mastery_effect.map((effect) => {
              const item = getKnowledgeById(effect.knowledge_id);
              return (
                <div key={effect.knowledge_id} className="rounded-lg bg-slate-50 p-3">
                  <div className="text-sm font-black">{item?.title}</div>
                  <div className="mt-1 text-sm text-slate-600">{effect.before}% → <span className="font-black text-red-600">{effect.after}%</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
