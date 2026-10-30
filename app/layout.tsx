import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = { title: { default: "雙和醫訊", template: "%s｜雙和醫訊" }, description: "雙和醫院健康資訊與歷期醫訊。" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-Hant"><body><GoogleAnalytics />{children}</body></html>; }
