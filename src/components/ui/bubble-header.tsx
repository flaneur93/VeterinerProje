import React from "react";

type BubbleHeaderProps = {
  children?: React.ReactNode;
  text?: string;
  className?: string;
};

export function BubbleHeader({ children, text, className }: BubbleHeaderProps) {
  return (
    <div className={`absolute -top-4 left-8 rounded-full border border-[#cdbbe3] bg-[#f2ecfc] px-5 py-1 text-sm font-semibold text-[#5e4b73] shadow-[0_6px_14px_rgba(182,167,209,0.35)] ${className ?? ""}`.trim()}>
      {children ?? text}
    </div>
  );
}
