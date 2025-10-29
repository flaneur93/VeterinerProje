import React from "react";
import { BubbleHeader } from "@/components/ui/bubble-header";

export type BlankPageProps = {
  title: string;
  subtitle?: string;
};

export default function BlankPage({ title, subtitle }: BlankPageProps) {
  return (
    <div className="h-full w-full p-4">
      <section className="relative h-full rounded-[32px] border border-[#cdbbe3] bg-white/95 pt-8 pb-6 shadow-[0_20px_40px_rgba(182,167,209,0.18)]">
        <BubbleHeader>{title}</BubbleHeader>
        <div className="flex h-full items-center justify-center px-6 py-6 text-sm leading-relaxed text-[#9a92b5]">
          {subtitle ?? "Bu sayfa için içerik henüz eklenmedi."}
        </div>
      </section>
    </div>
  );
}


