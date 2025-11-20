import type { Metadata } from "next";
import { Staatliches, Chivo } from "next/font/google";
import "./globals.css";

const display = Staatliches({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const body = Chivo({ subsets: ["latin"], weight: ["300", "400", "600", "700"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Reco Preview Codex",
  description: "Interactive Retail Rocket playground with vivid merch cards"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased bg-[var(--bg)] text-slate-50">
        {children}
      </body>
    </html>
  );
}
