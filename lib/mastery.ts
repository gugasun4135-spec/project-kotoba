import type { MasteryStatus } from "./types";

export const masteryLabels: Record<MasteryStatus, string> = {
  mastered: "已掌握",
  good: "较好",
  medium: "一般",
  weak: "薄弱",
  not_started: "未学习",
  upcoming: "即将学习"
};

export const masteryColors: Record<MasteryStatus, { bg: string; text: string; bar: string; border: string }> = {
  mastered: { bg: "bg-emerald-100", text: "text-emerald-800", bar: "bg-matcha", border: "border-emerald-200" },
  good: { bg: "bg-green-50", text: "text-green-700", bar: "bg-green-300", border: "border-green-200" },
  medium: { bg: "bg-amber-100", text: "text-amber-800", bar: "bg-kohaku", border: "border-amber-200" },
  weak: { bg: "bg-red-100", text: "text-red-700", bar: "bg-beniiro", border: "border-red-200" },
  not_started: { bg: "bg-slate-100", text: "text-slate-600", bar: "bg-slate-400", border: "border-slate-200" },
  upcoming: { bg: "bg-blue-100", text: "text-blue-700", bar: "bg-ai", border: "border-blue-200" }
};

export function getMasteryStatus(score: number, fallback: MasteryStatus = "not_started"): MasteryStatus {
  if (fallback === "upcoming") return "upcoming";
  if (score >= 85) return "mastered";
  if (score >= 70) return "good";
  if (score >= 50) return "medium";
  if (score > 0) return "weak";
  return "not_started";
}
