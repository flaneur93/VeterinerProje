import React from "react";
import { LayoutGrid, SearchIcon, Bell } from "@/icons/lucide";

export default function WorkspaceHeader() {
  return (
    <header className="flex items-center justify-end border-b border-[#d7caed] bg-white/80 px-8 py-4 backdrop-blur">
      <div className="flex items-center gap-3 text-[#7a7295]">
        <button
          aria-label="Paneli Izgara Gorunumune Al"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dcd0eb] bg-white/90 shadow-[0_6px_14px_rgba(195,182,216,0.35)] transition hover:bg-[#f5f2fb]"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
        <button
          aria-label="Kayitlarda Ara"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dcd0eb] bg-white/90 shadow-[0_6px_14px_rgba(195,182,216,0.35)] transition hover:bg-[#f5f2fb]"
        >
          <SearchIcon className="h-4 w-4" />
        </button>
        <button
          aria-label="Bildirimler"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dcd0eb] bg-white/90 shadow-[0_6px_14px_rgba(195,182,216,0.35)] transition hover:bg-[#f5f2fb]"
        >
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}


