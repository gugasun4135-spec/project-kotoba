import Link from "next/link";
import { appStats } from "@/lib/data";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/knowledge", label: "Knowledge" },
  { href: "/lessons", label: "Lessons" },
  { href: "/wrong-questions", label: "Wrong Questions" },
  { href: "/settings", label: "Settings" }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center gap-4 px-4 py-3">
          <Link href="/dashboard" className="flex min-w-[180px] items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-matcha text-lg font-black text-white">K</div>
            <div>
              <div className="text-xl font-black leading-none text-sumi">Kotoba</div>
              <div className="text-xs text-slate-500">Japanese Knowledge OS</div>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-sumi">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-3 md:flex">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm">
              当前教材：<strong>{appStats.current_textbook}</strong>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm">
              当前阶段：<strong>{appStats.current_level}</strong>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-4 py-4">{children}</main>
    </div>
  );
}
