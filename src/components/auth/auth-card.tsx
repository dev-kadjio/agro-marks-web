import type { ReactNode } from "react";
import { Notice } from "@/components/ui/notice";

export function AuthCard({ title, intro, notice, children }: { title: string; intro: string; notice: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-md py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-3 text-base leading-relaxed text-muted">{intro}</p>
      <Notice className="mt-6">{notice}</Notice>
      <div className="mt-8 rounded-card border border-line bg-white p-6 sm:p-8">{children}</div>
    </div>
  );
}
