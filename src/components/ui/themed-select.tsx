import React from "react";
import { ChevronDown } from "@/icons/lucide";

export type ThemedSelectOption = { value: string; label: string; disabled?: boolean };

export type ThemedSelectProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: ThemedSelectOption[];
  disabled?: boolean;
  className: string;
};

export default function ThemedSelect({ id, value, onChange, placeholder, options, disabled, className }: ThemedSelectProps) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const handlePointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (buttonRef.current?.contains(target)) return;
      if (listRef.current?.contains(target)) return;
      setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const selected = options.find((opt) => opt.value === value);
  const displayLabel = selected?.label ?? placeholder;
  const optionList = options.filter((opt) => !opt.disabled);

  const toggle = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  const pick = (nextValue: string) => {
    onChange(nextValue);
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div className="relative">
      <button
        type="button"
        id={id}
        ref={buttonRef}
        className={`${className} flex items-center justify-between gap-3 text-left ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
        onClick={toggle}
        onKeyDown={(event) => {
          if (disabled) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggle();
          }
          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
      >
        <span className={value ? "text-[#5b5171]" : "text-[#a8a1bf]"}>{displayLabel}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180 text-[#8c74c0]" : "text-[#a8a1bf]"}`} />
      </button>
      {open && !disabled ? (
        <div
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          className="absolute left-0 top-full z-30 mt-2 w-full overflow-hidden rounded-2xl border border-[#d9cfeb] bg-white shadow-[0_18px_35px_rgba(137,115,180,0.25)]"
        >
          <div className="max-h-48 overflow-y-auto py-1">
            {optionList.length === 0 ? (
              <div className="px-4 py-3 text-sm text-[#a8a1bf]">Secenek bulunmuyor</div>
            ) : (
              optionList.map((opt, idx) => (
                <button
                  key={opt.value}
                  role="option"
                  type="button"
                  className={`flex w-full items-center justify-between px-4 py-2 text-sm transition ${
                    opt.value === value ? "bg-[#f2ecfc] text-[#5b5171] font-semibold" : "text-[#5b5171] hover:bg-[#f7f3ff]"
                  }`}
                  onClick={() => pick(opt.value)}
                  data-index={idx}
                >
                  {opt.label}
                  {opt.value === value ? <span className="text-xs text-[#8c74c0]">Secildi</span> : null}
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
