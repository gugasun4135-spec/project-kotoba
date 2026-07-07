import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kotoba - Japanese Knowledge OS",
  description: "A local JSON-driven Japanese knowledge system MVP."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
