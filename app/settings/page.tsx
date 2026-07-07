import { AppShell } from "@/components/AppShell";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="card p-6">
        <h1 className="text-2xl font-black">Settings</h1>
        <p className="mt-3 text-sm text-slate-500">
          占位页面。SPRINT-001 不实现登录、数据库、Supabase 或持久化个人记录。
        </p>
      </div>
    </AppShell>
  );
}
