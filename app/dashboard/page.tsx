import { AppShell } from "@/components/AppShell";
import { KnowledgeGraph } from "@/components/KnowledgeGraph";
import { KnowledgeTree } from "@/components/KnowledgeTree";
import { LessonHeatmap } from "@/components/LessonHeatmap";
import { RadarOverview } from "@/components/RadarOverview";
import { StatCard } from "@/components/StatCard";
import { UpcomingKnowledgeList } from "@/components/UpcomingKnowledgeList";
import { WeakKnowledgeList } from "@/components/WeakKnowledgeList";
import { appStats, getKnowledgeById, getMasteryByKnowledgeId } from "@/lib/data";
import { getMasteryStatus } from "@/lib/mastery";
import { MasteryBadge } from "@/components/MasteryBadge";
import { ProgressBar } from "@/components/ProgressBar";
import Link from "next/link";

export default function DashboardPage() {
  const featured = getKnowledgeById("K-GRA-CON-NAGARA");
  const featuredMastery = getMasteryByKnowledgeId("K-GRA-CON-NAGARA");
  const featuredStatus = getMasteryStatus(featuredMastery?.mastery_score ?? 0, featuredMastery?.status ?? "not_started");

  return (
    <AppShell>
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-black text-sumi">Kotoba 学习总览</h1>
          <p className="mt-1 text-sm text-slate-500">当前课次：第27课「子供の時、大きな地震がありました」</p>
        </div>
        <div className="text-sm text-slate-500">今日：2026-07-04</div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <RadarOverview />
        <KnowledgeTree />
        <KnowledgeGraph />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_0.8fr_1.2fr]">
        <LessonHeatmap />
        <div className="card p-5">
          <h2 className="card-title">5. 学习时间线</h2>
          <div className="mt-5 space-y-4">
            {[
              ["今天", "第 27 课学习中"],
              ["昨天", "复习：〜ている（状态）"],
              ["前天", "学习：〜ながら"],
              ["3 天前", "复习：〜ば"],
              ["4 天前", "学习：小句 + 時"]
            ].map(([date, text]) => (
              <div key={date} className="flex gap-3">
                <div className="mt-1 h-3 w-3 rounded-full bg-matcha" />
                <div>
                  <div className="text-xs font-bold text-slate-500">{date}</div>
                  <div className="text-sm font-medium">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="card-title">6. 知识详情预览</h2>
          {featured ? (
            <div className="mt-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-2xl font-black">{featured.title}</div>
                  <div className="text-sm text-slate-500">{featured.title_cn}</div>
                </div>
                <MasteryBadge status={featuredStatus} />
              </div>
              <div className="mt-4 text-sm text-slate-600">{featured.description_cn}</div>
              <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm">
                <div className="font-bold">例句</div>
                <div className="mt-1">{featured.example_jp}</div>
                <div className="text-slate-500">{featured.example_cn}</div>
              </div>
              <div className="mt-4">
                <ProgressBar value={featuredMastery?.mastery_score ?? 0} status={featuredStatus} />
                <div className="mt-2 text-sm font-bold text-matcha">{featuredMastery?.mastery_score ?? 0}%</div>
              </div>
              <Link href={`/knowledge/${featured.id}`} className="mt-4 inline-flex rounded-lg border border-matcha/30 px-4 py-2 text-sm font-bold text-matcha hover:bg-matcha-soft">
                查看详情
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_0.8fr_1.2fr]">
        <WeakKnowledgeList />
        <UpcomingKnowledgeList />
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="已学知识点" value={appStats.known_knowledge_count} accent="text-matcha" />
          <StatCard label="掌握知识点" value={appStats.mastered_knowledge_count} accent="text-matcha" />
          <StatCard label="薄弱知识点" value={appStats.weak_knowledge_count} accent="text-beniiro" />
          <StatCard label="今日复习" value={appStats.today_review_count} accent="text-ai" />
          <StatCard label="连续学习" value={`${appStats.learning_streak_days} 天`} accent="text-kohaku" />
          <StatCard label="总学习时长" value={`${appStats.total_learning_hours}h`} accent="text-sumi" />
        </div>
      </div>
    </AppShell>
  );
}
