import React from "react";
import { createPortal } from "react-dom";
import {
  Calendar,
  Users,
  FilePlus2,
  Stethoscope,
  BedDouble,
  FolderOpen,
  ChevronDown,
  Timer,
  Boxes,
  FlaskConical,
  Wallet,
  BarChart2,
  Syringe,
  Pill,
  LayoutGrid,
  Clock,
  MapPin,
  LogOut,
  UserCircle2,
  X,
  Lock as LockIcon,
  ShieldSolid as Shield,
  Phone,
  Mail,
  Plus,
  SearchIcon,
  Bell,
} from "@/icons/lucide";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const reminders = [
  { id: 1, patientId: "11158", time: "08:00 - 09:00 AM", room: "Room 01" },
  { id: 2, patientId: "11159", time: "09:00 - 10:00 AM", room: "Room 02" },
  { id: 3, patientId: "11160", time: "10:00 - 11:00 AM", room: "Room 03" },
  { id: 4, patientId: "11161", time: "11:00 - 12:00 AM", room: "Room 01" },
  { id: 5, patientId: "11162", time: "12:00 - 01:00 PM", room: "Room 02" },
  { id: 6, patientId: "11163", time: "01:00 - 02:00 PM", room: "Room 03" },
];

const menu = [
  { key: "hasta-kabul", label: "Hasta Kabul", icon: LayoutGrid, active: true },
  { key: "yeni-musteri", label: "Yeni Müşteri Kayıt", icon: Users },
  { key: "belge-ekle", label: "Belge Ekle", icon: FilePlus2 },
  { key: "online-randevular", label: "Online Randevular", icon: Calendar, badge: 9 },
  { key: "muayeneler", label: "Muayeneler", icon: Stethoscope },
  { key: "yatan-hasta", label: "Yatan Hasta", icon: BedDouble },
  { key: "kayitlar", label: "Kayıtlar", icon: FolderOpen, trailing: ChevronDown },
  { key: "takvim", label: "Takvim", icon: Timer },
  { key: "stoklar", label: "Stoklar", icon: Boxes },
  { key: "lab-istekleri", label: "Lab İstekleri", icon: FlaskConical },
  { key: "finansal-durum", label: "Finansal Durum", icon: Wallet },
  { key: "raporlar", label: "Raporlar", icon: BarChart2 },
  { key: "asi-takip", label: "Aşı Takip Sistemi", icon: Syringe },
  { key: "ilac-takip", label: "İlaç Takip Sistemi", icon: Pill },
];

type MenuItem = (typeof menu)[number];
type MenuKey = MenuItem["key"];

type SideMenuItemProps = {
  item: MenuItem;
  onClick?: (key: MenuKey) => void;
  collapsed?: boolean;
  active: boolean;
};

function SideMenuItem({ item, onClick, collapsed, active }: SideMenuItemProps) {
  const Icon = item.icon;
  const Trailing = item.trailing as React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined;

  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const [hover, setHover] = React.useState(false);
  const [flyRect, setFlyRect] = React.useState<{ top: number; left: number } | null>(null);

  React.useEffect(() => {
    if (!hover) return;
    const update = () => {
      const el = btnRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setFlyRect({ top: Math.round(r.top), left: Math.round(r.left) });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [hover]);

  if (collapsed) {
    return (
      <div className="relative h-14">
        <button
          ref={btnRef}
          onClick={() => onClick?.(item.key)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`flex h-14 w-14 items-center justify-center rounded-l-none rounded-r-2xl transition-colors ${
            active ? "text-white" : "text-[#565e6c] hover:bg-white"
          }`}
          style={active ? { backgroundColor: "#997ca3" } : undefined}
        >
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${active ? "bg-transparent" : "bg-transparent"}`}>
            <Icon className={`h-8 w-8 ${active ? "text-white" : "text-[#6B6E7E]"}`} />
          </div>
        </button>
        {hover && flyRect
          ? createPortal(
              <button
                onClick={() => onClick?.(item.key)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ position: "fixed", top: flyRect.top, left: flyRect.left, zIndex: 70 }}
                className="flex h-14 items-center rounded-l-none rounded-r-[8px] bg-white px-3 pr-6 shadow-[8px_2px_12px_rgba(0,0,0,0.18)]"
              >
                <div
                  className={`mr-3 ml-1 flex h-11 w-11 items-center justify-center rounded-2xl ${
                    active ? "bg-[#997ca3]" : "bg-transparent"
                  }`}
                >
                  <Icon className={`h-8 w-8 ${active ? "text-white" : "text-[#6B6E7E]"}`} />
                </div>
                <span className="whitespace-nowrap text-[22px] font-medium leading-none text-[#565e6c]">{item.label}</span>
              </button>,
              document.body
            )
          : null}
        <div className="h-14 w-14" />
      </div>
    );
  }

  return (
    <button
      onClick={() => onClick?.(item.key)}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-lg transition ${
        active ? "text-white" : "text-[#565e6c] hover:bg-[#ECE9F1]"
      }`}
      style={active ? { backgroundColor: "#997ca3" } : undefined}
    >
      <Icon className={`h-6 w-6 ${active ? "text-white" : "text-[#6B6E7E]"}`} />
      <span className="flex-1 text-left leading-tight">{item.label}</span>
      {item.badge ? (
        <span
          className={`ml-1 rounded-full px-2 py-0.5 text-[10px] ${
            active ? "bg-white text-[#997ca3]" : "bg-[#E74C3C] text-white"
          }`}
        >
          {item.badge}
        </span>
      ) : null}
      {Trailing ? <Trailing className={`h-4 w-4 ${active ? "text-white/90" : "text-[#9AA0AE]"}`} /> : null}
    </button>
  );
}

type Reminder = (typeof reminders)[number];

type ReminderCardProps = {
  r: Reminder;
  selected?: boolean;
  onSelect?: (id: number) => void;
};

function ReminderCard({ r, selected = false, onSelect }: ReminderCardProps) {
  const [hover, setHover] = React.useState(false);
  const boxShadow = hover
    ? selected
      ? "0 0 0 2px #8C79B6 inset, 6px 2px 12px rgba(0,0,0,0.18)"
      : "6px 2px 12px rgba(0,0,0,0.18)"
    : selected
    ? "0 0 0 2px #8C79B6 inset, 4px 2px 8px rgba(0,0,0,0.14)"
    : "4px 2px 8px rgba(0,0,0,0.14)";

  return (
    <div
      role="button"
      onClick={() => onSelect?.(r.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative h-[120px] w-[225px] rounded-[24px] border ${
        selected ? "border-[#8C79B6]" : "border-transparent"
      } bg-white p-3 transition-transform duration-200 hover:-translate-y-0.5`}
      style={{ boxShadow }}
    >
      <div className="flex items-start justify-between">
        <div className="text-[16px] font-semibold leading-tight text-[#565e6c]">
          Hasta ID: <span className="font-extrabold">{r.patientId}</span>
        </div>
        <div className="h-5 w-5 rounded-md border border-slate-300" />
      </div>
      <div className="mt-2 space-y-1.5">
        <div className="flex items-center gap-2 text-[14px] text-[#565e6c]">
          <Clock className="h-4 w-4" />
          <span>{r.time}</span>
        </div>
        <div className="flex items-center gap-2 text-[14px] text-[#565e6c]">
          <MapPin className="h-4 w-4" />
          <span>{r.room}</span>
        </div>
      </div>
      <span className="absolute bottom-2 right-2 rounded-full bg-[#E55A59] px-3 py-1 text-[12px] font-semibold text-white shadow-md">
        Aşı
      </span>
    </div>
  );
}

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  const root = typeof document !== "undefined" ? document.getElementById("modal-root") : null;
  if (!root) return null;
  return createPortal(
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="max-h-[90vh] w-[min(960px,90vw)] overflow-hidden rounded-2xl border border-[#C9C6D6] bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#E0E1E6] px-4 py-3">
          <div className="text-sm font-semibold">{title ?? "Pencere"}</div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Kapat">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="max-h-[calc(90vh-48px)] overflow-auto p-0 text-sm text-[#565e6c]">{children ?? "İçerik gelecek"}</div>
      </div>
    </div>,
    root
  );
}

type SimpleCalendarProps = {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
};

function SimpleCalendar({ value, onChange, onClose }: SimpleCalendarProps) {
  const [refMonth, setRefMonth] = React.useState<Date>(() => (value ? new Date(value) : new Date()));
  const y = refMonth.getFullYear();
  const m = refMonth.getMonth();
  const first = new Date(y, m, 1);
  const startDay = first.getDay();
  const total = new Date(y, m + 1, 0).getDate();
  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - startDay + 1;
    const inMonth = dayNum >= 1 && dayNum <= total;
    return { inMonth, date: new Date(y, m, Math.max(1, Math.min(total, dayNum))) };
  });
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return (
    <div className="w-[260px] rounded-xl border border-[#E0E1E6] bg-white p-3 shadow-xl">
      <div className="mb-2 flex items-center justify-between text-sm">
        <Button size="sm" variant="ghost" onClick={() => setRefMonth(new Date(y, m - 1, 1))}>
          {"<"}
        </Button>
        <div className="font-semibold">{refMonth.toLocaleString(undefined, { month: "long", year: "numeric" })}</div>
        <Button size="sm" variant="ghost" onClick={() => setRefMonth(new Date(y, m + 1, 1))}>
          {">"}
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-[#565e6c]">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="py-1 font-medium">
            {d}
          </div>
        ))}
        {days.map((d, i) => (
          <button
            key={i}
            disabled={!d.inMonth}
            onClick={() => {
              onChange(fmt(d.date));
              onClose();
            }}
            className={`h-8 rounded-md text-[12px] ${d.inMonth ? "hover:bg-[#ECE9F1]" : "cursor-default opacity-40"}`}
          >
            {d.date.getDate()}
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-end">
        <Button size="sm" variant="outline" onClick={onClose}>
          Kapat
        </Button>
      </div>
    </div>
  );
}

function ThemedSelect({
  id,
  value,
  onChange,
  placeholder,
  options,
  disabled,
  className,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string; disabled?: boolean }[];
  disabled?: boolean;
  className: string;
}) {
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

function NewCustomerForm({ onClose }: { onClose: () => void }) {
  type FormKey =
    | "identity"
    | "name"
    | "surname"
    | "gender"
    | "birthDate"
    | "gsm"
    | "email"
    | "contactName"
    | "contactGsm"
    | "note";

  const identityInputId = "identity-number";
  const foreignCheckboxId = "foreign-citizen";
  const birthDateInputId = "birth-date";
  const noteInputId = "customer-note";
  const nameInputId = "customer-first-name";
  const surnameInputId = "customer-last-name";
  const genderSelectId = "customer-gender";
  const gsmInputId = "customer-gsm";
  const emailInputId = "customer-email";
  const contactNameId = "contact-name";
  const contactGsmId = "contact-gsm";

  const initialForm: Record<FormKey, string> = {
    identity: "",
    name: "",
    surname: "",
    gender: "",
    birthDate: "10.10.1995",
    gsm: "",
    email: "",
    contactName: "",
    contactGsm: "",
    note: "",
  };

  const initialAddress = {
    title: "",
    province: "",
    district: "",
    neighborhood: "",
    street: "",
    buildingNo: "",
    apartmentNo: "",
  };
  type AddressForm = typeof initialAddress;
  type SavedAddress = AddressForm & { id: string };

  const genderOptions = [
    { value: "female", label: "Kadin" },
    { value: "male", label: "Erkek" },
    { value: "other", label: "Diger" },
  ];
  const [isForeign, setIsForeign] = React.useState(false);
  const [form, setForm] = React.useState<Record<FormKey, string>>(initialForm);
  const [errors, setErrors] = React.useState<Partial<Record<FormKey, string>>>({});
  const [addressModalOpen, setAddressModalOpen] = React.useState(false);
  const [addressForm, setAddressForm] = React.useState<AddressForm>(initialAddress);
  const [addressErrors, setAddressErrors] = React.useState<Partial<Record<keyof AddressForm, string>>>({});
  const [addresses, setAddresses] = React.useState<SavedAddress[]>([]);

  const provinceOptions = [
    { value: "istanbul", label: "Istanbul" },
    { value: "ankara", label: "Ankara" },
    { value: "izmir", label: "Izmir" },
  ];
  const districtOptions: Record<string, { value: string; label: string }[]> = {
    istanbul: [
      { value: "besiktas", label: "Besiktas" },
      { value: "kadikoy", label: "Kadikoy" },
      { value: "sisli", label: "Sisli" },
    ],
    ankara: [
      { value: "cankaya", label: "Cankaya" },
      { value: "kecioren", label: "Kecioren" },
      { value: "mamak", label: "Mamak" },
    ],
    izmir: [
      { value: "karsiyaka", label: "Karsiyaka" },
      { value: "bornova", label: "Bornova" },
      { value: "konak", label: "Konak" },
    ],
  };

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("veteriner-addresses");
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setAddresses(
          parsed
            .filter(
              (item): item is SavedAddress =>
                item &&
                typeof item === "object" &&
                "id" in item &&
                typeof item.id === "string"
            )
            .map((item) => ({
              ...initialAddress,
              ...item,
            }))
        );
      }
    } catch (error) {
      console.error("Adresler yüklenemedi:", error);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("veteriner-addresses", JSON.stringify(addresses));
    } catch (error) {
      console.error("Adresler kaydedilemedi:", error);
    }
  }, [addresses]);

  const inputClass =
    "h-11 w-full rounded-2xl border border-[#d9cfeb] bg-white/90 px-4 text-sm text-[#5b5171] placeholder:text-[#a8a1bf] focus:border-[#a78fd3] focus:outline-none focus:ring-2 focus:ring-[#d9cef3]/70";
  const textareaClass =
    "w-full rounded-2xl border border-[#d9cfeb] bg-white/90 px-4 py-3 text-sm text-[#5b5171] placeholder:text-[#a8a1bf] focus:border-[#a78fd3] focus:outline-none focus:ring-2 focus:ring-[#d9cef3]/70 resize-none min-h-[120px] max-h-[120px]";
  const labelClass = "mb-1.5 block text-[11px] font-semibold text-[#6f6787] tracking-[0.04em] uppercase";
  const errorClass = "border-[#d46a6a] focus:border-[#d46a6a] focus:ring-[#f1b1b1]";
  const namePattern = /^[\p{L}\s]+$/u;
  const passportPattern = /^[A-Za-z][A-Za-z0-9]{5,8}$/;

  const identityLabel = isForeign ? "Pasaport No" : "TC Kimlik No";
  const identityPlaceholder = isForeign ? "AA1234567" : "00000000000";
  const districtList = addressForm.province ? districtOptions[addressForm.province] ?? [] : [];

  const sanitizeDigits = (value: string) => value.replace(/\D/g, "");
  const sanitizeLetters = (value: string) => value.replace(/[^\p{L}\s]/gu, "");
  const sanitizePassport = (value: string) => value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  const sanitizeIdentity = (value: string, foreign: boolean) =>
    foreign ? sanitizePassport(value).slice(0, 9) : sanitizeDigits(value).slice(0, 11);
  const limitDigits = (value: string, limit: number) => sanitizeDigits(value).slice(0, limit);

  const isValidTurkishId = (value: string) => {
    if (!/^[1-9]\d{10}$/.test(value)) return false;
    const digits = value.split("").map(Number);
    const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
    const tenth = ((oddSum * 7 - evenSum) % 10 + 10) % 10;
    if (tenth !== digits[9]) return false;
    const eleventh = digits.slice(0, 10).reduce((acc, cur) => acc + cur, 0) % 10;
    return eleventh === digits[10];
  };

  const formatDateInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
  };

  const validateField = React.useCallback(
    (field: FormKey, value: string): string => {
      const trimmed = value.trim();
      switch (field) {
        case "identity":
          if (!trimmed) return "Bu alan zorunlu.";
          if (!isForeign) {
            if (!/^\d{11}$/.test(trimmed) || !isValidTurkishId(trimmed)) return "Gecerli TC Kimlik No girin.";
          } else {
            if (!passportPattern.test(trimmed)) return "6-9 haneli gecerli pasaport no girin.";
          }
          return "";
        case "name":
        case "surname":
          if (!trimmed) return "Bu alan zorunlu.";
          if (!namePattern.test(trimmed)) return "Sadece harf kullanin.";
          return "";
        case "gender":
          if (!trimmed) return "Lutfen secim yapin.";
          return "";
        case "gsm":
          if (!trimmed) return "Bu alan zorunlu.";
          if (!/^\d{10}$/.test(trimmed)) return "10 haneli telefon girin.";
          return "";
        case "birthDate":
          if (!trimmed) return "";
          if (!/^\d{2}\.\d{2}\.\d{4}$/.test(trimmed)) return "Gecerli tarih girin.";
          {
            const [day, month, year] = trimmed.split(".").map(Number);
            const testDate = new Date(year, month - 1, day);
            if (
              testDate.getFullYear() !== year ||
              testDate.getMonth() !== month - 1 ||
              testDate.getDate() !== day
            ) {
              return "Gecerli tarih girin.";
            }
          }
          return "";
        case "email":
          if (!trimmed) return "";
          if (!trimmed.includes("@")) return "E-mail '@' icermeli.";
          return "";
        case "contactName":
          if (!trimmed) return "";
          if (!namePattern.test(trimmed)) return "Sadece harf kullanin.";
          return "";
        case "contactGsm":
          if (!trimmed) return "";
          if (!/^\d{10}$/.test(trimmed)) return "10 haneli telefon girin.";
          return "";
        case "note":
        default:
          return "";
      }
    },
    [isForeign]
  );

  const updateField = (field: FormKey, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      const message = validateField(field, value);
      if (message) {
        next[field] = message;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const handleBirthDateChange = (value: string) => {
    const formatted = formatDateInput(value);
    updateField("birthDate", formatted);
  };

  const handleIdentityChange = (value: string) => {
    const sanitized = sanitizeIdentity(value, isForeign);
    updateField("identity", sanitized);
  };

  const handleForeignToggle = (checked: boolean) => {
    setIsForeign(checked);
    setForm((prev) => {
      const sanitized = sanitizeIdentity(prev.identity, checked);
      if (sanitized === prev.identity) return prev;
      return { ...prev, identity: sanitized };
    });
  };

  React.useEffect(() => {
    if (!form.identity) return;
    setErrors((prev) => {
      const next = { ...prev };
      const message = validateField("identity", form.identity);
      if (message) {
        next.identity = message;
      } else {
        delete next.identity;
      }
      return next;
    });
  }, [isForeign, form.identity, validateField]);

  const validateAll = () => {
    const fields: FormKey[] = [
      "identity",
      "name",
      "surname",
      "gender",
      "birthDate",
      "gsm",
      "email",
      "contactName",
      "contactGsm",
      "note",
    ];
    const next: Partial<Record<FormKey, string>> = {};
    fields.forEach((field) => {
      const message = validateField(field, form[field]);
      if (message) next[field] = message;
    });
    return next;
  };

  const fieldIds: Record<FormKey, string> = {
    identity: identityInputId,
    name: nameInputId,
    surname: surnameInputId,
    gender: genderSelectId,
    birthDate: birthDateInputId,
    gsm: gsmInputId,
    email: emailInputId,
    contactName: contactNameId,
    contactGsm: contactGsmId,
    note: noteInputId,
  };

  const handleSubmit = (action: "save" | "save-new") => {
    const validation = validateAll();
    setErrors(validation);
    const invalidKeys = Object.keys(validation) as FormKey[];
    if (invalidKeys.length > 0) {
      const targetId = fieldIds[invalidKeys[0]];
      if (targetId) {
        requestAnimationFrame(() => document.getElementById(targetId)?.focus());
      }
      return;
    }
    console.log("Form submitted", { action, form });
    if (action === "save-new") {
      setForm(() => ({ ...initialForm }));
      setIsForeign(false);
      setErrors({});
    }
  };

  const inputClassFor = (field: FormKey, extra = "") => {
    const classes = [inputClass, extra, errors[field] ? errorClass : ""].filter(Boolean);
    return classes.join(" ").trim();
  };
  const textareaClassFor = (field: FormKey) => {
    const classes = [textareaClass, errors[field] ? errorClass : ""].filter(Boolean);
    return classes.join(" ").trim();
  };
  const errorText = (field: FormKey) =>
    errors[field] ? <p className="mt-1 text-xs font-medium text-[#d46a6a]">{errors[field]}</p> : null;

  const addressInputClass = (field: keyof AddressForm) =>
    `${inputClass}${addressErrors[field] ? ` ${errorClass}` : ""}`;
  const addressErrorText = (field: keyof AddressForm) =>
    addressErrors[field] ? (
      <p className="mt-1 text-xs font-medium text-[#d46a6a]">{addressErrors[field]}</p>
    ) : null;

  const validateAddressForm = (data: AddressForm) => {
    const errs: Partial<Record<keyof AddressForm, string>> = {};
    if (!data.title.trim()) errs.title = "Adres basligi zorunlu.";
    if (!data.province.trim()) errs.province = "Il secin.";
    if (!data.district.trim()) errs.district = "Ilce secin.";
    if (!data.neighborhood.trim()) errs.neighborhood = "Mahalle veya koy girin.";
    if (!data.street.trim()) errs.street = "Cadde veya sokak girin.";
    if (!data.buildingNo.trim()) errs.buildingNo = "Bina numarasi girin.";
    return errs;
  };

  const formatAddressLine = (address: SavedAddress) => {
    const parts = [
      [address.neighborhood, address.street].filter(Boolean).join(" "),
      address.buildingNo ? `No: ${address.buildingNo}` : null,
      address.apartmentNo ? `Daire: ${address.apartmentNo}` : null,
      [address.district, address.province].filter(Boolean).join(" / "),
    ];
    return parts.filter(Boolean).join(", ");
  };

  const updateAddressField = (field: keyof AddressForm, value: string) => {
    setAddressForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "province") {
        next.district = "";
      }
      return next;
    });
    setAddressErrors((prev) => {
      if (!prev[field] && !(field === "province" && prev.district)) return prev;
      const next = { ...prev };
      delete next[field];
      if (field === "province") {
        delete next.district;
      }
      return next;
    });
  };

  const closeAddressModal = () => {
    setAddressModalOpen(false);
    setAddressErrors({});
  };

  const deleteAddress = (id: string) => {
    const target = addresses.find((address) => address.id === id);
    if (!target) return;
    if (typeof window !== "undefined") {
      const confirmed = window.confirm(
        `"${target.title}" adresini silmek istediğinize emin misiniz?`
      );
      if (!confirmed) return;
    }
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  const saveAddress = () => {
    const sanitized: AddressForm = {
      title: addressForm.title.trim(),
      province: addressForm.province.trim(),
      district: addressForm.district.trim(),
      neighborhood: addressForm.neighborhood.trim(),
      street: addressForm.street.trim(),
      buildingNo: addressForm.buildingNo.trim(),
      apartmentNo: addressForm.apartmentNo.trim(),
    };
    const validation = validateAddressForm(sanitized);
    if (Object.keys(validation).length > 0) {
      setAddressErrors(validation);
      return;
    }
    const newAddress: SavedAddress = {
      ...sanitized,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };
    setAddresses((prev) => [...prev, newAddress]);
    setAddressErrors({});
    setAddressForm(() => ({ ...initialAddress }));
    setAddressModalOpen(false);
  };

  return (
    <div className="flex h-full flex-col bg-[#edf0f8]">
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

      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="grid gap-6 xl:grid-cols-[1.08fr,0.92fr]">
          <section className="relative rounded-[32px] border border-[#cdbbe3] bg-white/95 p-8 shadow-[0_24px_45px_rgba(182,167,209,0.2)]">
            <div className="absolute -top-4 left-8 rounded-full border border-[#cdbbe3] bg-[#f2ecfc] px-5 py-1 text-sm font-semibold text-[#5e4b73] shadow-[0_6px_14px_rgba(182,167,209,0.35)]">
              Yeni Musteri Kayit
            </div>
            <div className="mb-6 flex justify-end">
              <Users className="h-5 w-5 text-[#8c74c0]" />
            </div>
            <div className="space-y-6">
              <div>
                <label className={labelClass} htmlFor={identityInputId}>
                  {identityLabel} <span className="text-[#c45a71]">*</span>
                </label>
                <div className="relative">
                  <input
                    id={identityInputId}
                    className={inputClassFor("identity", "pr-12")}
                    placeholder={identityPlaceholder}
                    inputMode={isForeign ? "text" : "numeric"}
                    value={form.identity}
                    onChange={(e) => handleIdentityChange(e.target.value)}
                  />
                  <Users className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#b1a5cc]" />
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <p
                    className={`text-[11px] font-medium uppercase tracking-[0.08em] ${
                      errors.identity ? "text-[#d46a6a]" : "text-[#c45a71]"
                    }`}
                  >
                    {errors.identity
                      ? errors.identity
                      : isForeign
                      ? "Pasaport numarasi zorunlu."
                      : "Doldurulmasi zorunlu alan."}
                  </p>
                  <label
                    className="inline-flex items-center gap-2 text-[11px] font-medium text-[#7d7396]"
                    htmlFor={foreignCheckboxId}
                  >
                    <input
                      id={foreignCheckboxId}
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-[#cdbbe3] accent-[#8c74c0]"
                      checked={isForeign}
                      onChange={(e) => handleForeignToggle(e.target.checked)}
                    />
                    TC Vatandasi Degil
                  </label>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor={nameInputId}>
                    Adi <span className="text-[#c45a71]">*</span>
                  </label>
                  <input
                    id={nameInputId}
                    className={inputClassFor("name")}
                    placeholder="Ad"
                    value={form.name}
                    onChange={(e) => updateField("name", sanitizeLetters(e.target.value))}
                  />
                  {errorText("name")}
                </div>
                <div>
                  <label className={labelClass} htmlFor={surnameInputId}>
                    Soyadi <span className="text-[#c45a71]">*</span>
                  </label>
                  <input
                    id={surnameInputId}
                    className={inputClassFor("surname")}
                    placeholder="Soyad"
                    value={form.surname}
                    onChange={(e) => updateField("surname", sanitizeLetters(e.target.value))}
                  />
                  {errorText("surname")}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor={genderSelectId}>
                    Cinsiyet <span className="text-[#c45a71]">*</span>
                  </label>
                  <ThemedSelect
                    id={genderSelectId}
                    className={inputClassFor("gender")}
                    value={form.gender}
                    onChange={(val) => updateField("gender", val)}
                    placeholder="Seciniz"
                    options={genderOptions}
                  />
                  {errorText("gender")}
                </div>
                <div>
                  <label className={labelClass} htmlFor={birthDateInputId}>
                    Dogum Tarihi
                  </label>
                  <div className="relative">
                    <input
                      id={birthDateInputId}
                      className={inputClassFor("birthDate", "pr-12")}
                      value={form.birthDate}
                      onChange={(e) => handleBirthDateChange(e.target.value)}
                      inputMode="numeric"
                      placeholder="gg.aa.yyyy"
                    />
                    <Calendar className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b1a5cc]" />
                  </div>
                  {errorText("birthDate")}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor={gsmInputId}>
                    GSM No <span className="text-[#c45a71]">*</span>
                  </label>
                  <input
                    id={gsmInputId}
                    className={inputClassFor("gsm")}
                    placeholder="5XX XXX XX XX"
                    value={form.gsm}
                    inputMode="numeric"
                    onChange={(e) => updateField("gsm", limitDigits(e.target.value, 10))}
                  />
                  {errorText("gsm")}
                </div>
                <div>
                  <label className={labelClass} htmlFor={emailInputId}>
                    E-mail
                  </label>
                  <input
                    id={emailInputId}
                    className={inputClassFor("email")}
                    placeholder="ornek@email.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                  {errorText("email")}
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[1fr_1fr_0.9fr]">
                <div>
                  <label className={labelClass} htmlFor={contactNameId}>
                    Yetkili Ad Soyad
                  </label>
                  <input
                    id={contactNameId}
                    className={inputClassFor("contactName")}
                    placeholder="Ad Soyad"
                    value={form.contactName}
                    onChange={(e) => updateField("contactName", sanitizeLetters(e.target.value))}
                  />
                  {errorText("contactName")}
                </div>
                <div>
                  <label className={labelClass} htmlFor={contactGsmId}>
                    Yetkili GSM
                  </label>
                  <input
                    id={contactGsmId}
                    className={inputClassFor("contactGsm")}
                    placeholder="5XX XXX XX XX"
                    value={form.contactGsm}
                    inputMode="numeric"
                    onChange={(e) => updateField("contactGsm", limitDigits(e.target.value, 10))}
                  />
                  {errorText("contactGsm")}
                </div>
                <div className="rounded-2xl border border-[#d9cfeb] bg-[#f8f6fe] px-4 py-3">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#6f6787]">
                    Iletisim Tercihi
                  </span>
                  <div className="mt-3 space-y-2 text-sm text-[#5b5171]">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-[#cdbbe3] accent-[#8c74c0]" />
                      E-mail
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-[#cdbbe3] accent-[#8c74c0]" />
                      SMS
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor={noteInputId}>
                  Not
                </label>
                <textarea
                  id={noteInputId}
                  className={textareaClassFor("note")}
                  placeholder="Not ekleyin..."
                  value={form.note}
                  onChange={(e) => updateField("note", e.target.value)}
                />
              </div>
            </div>
          </section>

          <div className="relative">
            <div className={`space-y-6 transition ${addressModalOpen ? "pointer-events-none opacity-0" : ""}`} aria-hidden={addressModalOpen}>
              <section className="relative rounded-[32px] border border-[#cdbbe3] bg-white/95 pt-8 pb-8 shadow-[0_20px_40px_rgba(182,167,209,0.18)]">
                <div className="absolute -top-4 left-8 rounded-full border border-[#cdbbe3] bg-[#f2ecfc] px-5 py-1 text-sm font-semibold text-[#5e4b73] shadow-[0_6px_14px_rgba(182,167,209,0.35)]">
                  Adres
                </div>
                <div className="flex items-center justify-between border-b border-[#dcd0eb] px-6 pb-4 pt-6">
                  <div className="flex items-center gap-4 text-sm font-medium text-[#6f6787]">
                    <span className="font-semibold text-[#5e4b73]">Baslik</span>
                    <span className="text-[#c3badb]">|</span>
                    <span className="text-[#8f86a8]">Adres</span>
                  </div>
                  <button
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c74c0] text-white transition hover:bg-[#7b64a9]"
                    onClick={() => setAddressModalOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="px-6 pt-6">
                  {addresses.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#d9cfeb] bg-[#fbf9ff] px-6 py-6 text-sm leading-relaxed text-[#9a92b5]">
                      Adres bilgisi bulunmuyor. Yeni bir adres eklemek icin sag ustteki artiya tiklayin.
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-2xl border border-[#d9cfeb] bg-white">
                      <table className="w-full text-sm">
                        <thead className="bg-[#f7f3ff] text-[#5b5171]">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold">Adres Basligi</th>
                            <th className="px-4 py-3 text-left font-semibold">Adres</th>
                            <th className="px-3 py-3 text-right font-semibold"> </th>
                          </tr>
                        </thead>
                        <tbody>
                          {addresses.map((address) => (
                            <tr key={address.id} className="border-t border-[#ebe4f6] text-[#5b5171]">
                              <td className="px-4 py-3 font-medium">{address.title}</td>
                              <td className="px-4 py-3">{formatAddressLine(address)}</td>
                              <td className="px-3 py-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => deleteAddress(address.id)}
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-[#a988be] transition hover:bg-[#f2ecfc] hover:text-[#7a5fa0]"
                                  aria-label="Adresi sil"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>

              <section className="relative rounded-[32px] border border-[#cdbbe3] bg-white/95 pt-8 pb-8 shadow-[0_20px_40px_rgba(182,167,209,0.18)]">
                <div className="absolute -top-4 left-8 rounded-full border border-[#cdbbe3] bg-[#f2ecfc] px-5 py-1 text-sm font-semibold text-[#5e4b73] shadow-[0_6px_14px_rgba(182,167,209,0.35)]">
                  Kayitli Hasta
                </div>
                <div className="flex items-center justify-between border-b border-[#dcd0eb] px-6 pb-4 pt-6">
                  <div className="flex items-center gap-4 text-sm font-medium text-[#6f6787]">
                    <span className="font-semibold text-[#5e4b73]">Cins</span>
                    <span className="text-[#c3badb]">|</span>
                    <span className="text-[#8f86a8]">Adi</span>
                  </div>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c74c0] text-white transition hover:bg-[#7b64a9]">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="px-6 pt-6">
                  <div className="rounded-2xl border border-dashed border-[#d9cfeb] bg-[#fbf9ff] px-6 py-6 text-sm leading-relaxed text-[#9a92b5]">
                    Kayitli hasta bulunmuyor. Yeni hasta eklemek icin artiya tiklayin.
                  </div>
                </div>
              </section>
            </div>

            {addressModalOpen ? (
              <div className="absolute inset-0 z-10 flex bg-[#edeff7]">
                <div className="relative flex h-full w-full flex-col rounded-[32px] border border-[#cdbbe3] bg-white/98 shadow-[0_24px_45px_rgba(182,167,209,0.28)]">
                  <div className="absolute -top-4 left-8 rounded-full border border-[#cdbbe3] bg-[#f2ecfc] px-5 py-1 text-sm font-semibold text-[#5e4b73] shadow-[0_6px_14px_rgba(182,167,209,0.35)]">
                    Yeni Adres
                  </div>
                  <div className="flex-1 overflow-y-auto px-6 py-8">
                    <div className="mx-auto flex w-full max-w-md flex-col gap-5">
                      <div>
                        <label className={labelClass}>Adres Basligi</label>
                        <input
                          className={addressInputClass("title")}
                          placeholder="Orn. Ev"
                          value={addressForm.title}
                          onChange={(e) => updateAddressField("title", e.target.value)}
                        />
                        {addressErrorText("title")}
                      </div>
                      <div>
                        <label className={labelClass}>Il</label>
                        <ThemedSelect
                          id="address-province"
                          className={addressInputClass("province")}
                          value={addressForm.province}
                          onChange={(val) => updateAddressField("province", val)}
                          placeholder="Il secin"
                          options={provinceOptions}
                        />
                        {addressErrorText("province")}
                      </div>
                      <div>
                        <label className={labelClass}>Ilce</label>
                        <ThemedSelect
                          id="address-district"
                          className={addressInputClass("district")}
                          value={addressForm.district}
                          onChange={(val) => updateAddressField("district", val)}
                          placeholder={addressForm.province ? "Ilce secin" : "Once il secin"}
                          options={districtList}
                          disabled={!addressForm.province}
                        />
                        {addressErrorText("district")}
                      </div>
                      <div>
                        <label className={labelClass}>Mahalle / Koy</label>
                        <input
                          className={addressInputClass("neighborhood")}
                          placeholder="Mahalle veya koy"
                          value={addressForm.neighborhood}
                          onChange={(e) => updateAddressField("neighborhood", e.target.value)}
                        />
                        {addressErrorText("neighborhood")}
                      </div>
                      <div>
                        <label className={labelClass}>Cadde / Sokak</label>
                        <input
                          className={addressInputClass("street")}
                          placeholder="Cadde veya sokak"
                          value={addressForm.street}
                          onChange={(e) => updateAddressField("street", e.target.value)}
                        />
                        {addressErrorText("street")}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Bina No</label>
                          <input
                            className={addressInputClass("buildingNo")}
                            placeholder="No"
                            value={addressForm.buildingNo}
                            onChange={(e) => updateAddressField("buildingNo", e.target.value)}
                          />
                          {addressErrorText("buildingNo")}
                        </div>
                        <div>
                          <label className={labelClass}>Daire No</label>
                          <input
                            className={addressInputClass("apartmentNo")}
                            placeholder="No"
                            value={addressForm.apartmentNo}
                            onChange={(e) => updateAddressField("apartmentNo", e.target.value)}
                          />
                          {addressErrorText("apartmentNo")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-[#dcd0eb] px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <Button className="px-8" onClick={saveAddress}>
                        Kaydet
                      </Button>
                      <Button variant="outline" className="px-8" onClick={closeAddressModal}>
                        Iptal
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <footer className="mt-10 flex flex-wrap justify-center gap-4 rounded-[24px] bg-[#edeff7]/70 px-6 py-4">
          <Button
            className="h-12 rounded-full px-10 text-sm font-semibold shadow-[0_12px_26px_rgba(143,118,191,0.35)]"
            onClick={() => handleSubmit("save")}
          >
            Kaydet
          </Button>
          <Button
            className="h-12 rounded-full bg-[#7b64a9] px-10 text-sm font-semibold shadow-[0_12px_26px_rgba(123,100,169,0.45)] hover:bg-[#6b5693]"
            onClick={() => handleSubmit("save-new")}
          >
            Kaydet ve Yeni Muayene
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-full border-[#cdbbe3] bg-white px-10 text-sm font-semibold text-[#6d6486] hover:border-[#bba3d6] hover:bg-[#f6f3fc]"
            onClick={onClose}
          >
            Iptal
          </Button>
        </footer>
      </div>
    </div>
  );
}
type SettingsPanelProps = {
  selectedKey: string;
  onSelect: (key: string) => void;
  onClose: () => void;
};

function SettingsPanel({ selectedKey, onSelect, onClose }: SettingsPanelProps) {
  return (
    <div className="relative flex h-full w-full">
      <button
        aria-label="Kapat"
        className="absolute right-2 top-2 z-10 rounded-md p-1 hover:bg-[#F3F4F6]"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </button>
      <aside className="w-[220px] shrink-0 border-r bg-white">
        <div className="px-4 py-4">
          <div className="text-lg font-bold text-[#565e6c]">Ayarlar</div>
        </div>
        <nav className="space-y-1 px-2 pb-4">
          {[
            { key: "security", label: "Güvenlik Ayarları", icon: LockIcon },
            { key: "users", label: "Kullanıcılar", icon: Users },
            { key: "roles", label: "Rol Ayarları", icon: LayoutGrid },
            { key: "clinic", label: "Klinik Profil Ayarları", icon: FolderOpen },
            { key: "profile", label: "Profil Ayarları", icon: UserCircle2 },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-base transition-colors transition-transform active:scale-[0.99] ${
                selectedKey === key ? "bg-[#ECE9F1] text-[#565e6c]" : "text-[#565e6c] hover:bg-[#F3F4F6]"
              }`}
            >
              <Icon className="h-5 w-5 text-[#8C79B6]" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>
      <section className="flex-1 bg-white px-3 md:px-4 lg:px-8 xl:px-10">
        <div className="flex items-center justify-end border-b px-4 py-3">
          <input
            type="text"
            placeholder="Arama"
            className="h-8 w-[220px] rounded-md border border-[#E0E1E6] bg-white px-3 text-sm outline-none placeholder:text-[#9AA0AE]"
          />
        </div>
        <div className="p-4 text-sm text-[#565e6c]">
          {selectedKey === "security" && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
              <div className="lg:col-span-2 flex items-start justify-start pt-2">
                <div className="text-2xl font-bold text-[#23262F]">Şifre Değiştir</div>
              </div>
              <div className="lg:col-span-3">
                <div className="rounded-xl border border-[#E0E1E6] bg-white p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-[#565e6c]">Mevcut Şifre*</label>
                      <div className="relative">
                        <input type="password" placeholder="Mevcut Şifrenizi Girin" className="h-9 w-full rounded-md border border-[#E0E1E6] bg-white px-3 pr-8 text-sm outline-none placeholder:text-[#9AA0AE]" />
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#9AA0AE]">👁️</span>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-[#565e6c]">Yeni Şifre*</label>
                      <div className="relative">
                        <input type="password" placeholder="Yeni Şifrenizi Girin" className="h-9 w-full rounded-md border border-[#E0E1E6] bg-white px-3 pr-8 text-sm outline-none placeholder:text-[#9AA0AE]" />
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#9AA0AE]">👁️</span>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-[#565e6c]">Yeni Şifre Tekrar*</label>
                      <div className="relative">
                        <input type="password" placeholder="Yeni Şifrenizi Doğrulayın" className="h-9 w-full rounded-md border border-[#E0E1E6] bg-white px-3 pr-8 text-sm outline-none placeholder:text-[#9AA0AE]" />
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#9AA0AE]">👁️</span>
                      </div>
                    </div>
                    <div className="flex justify-end pt-2">
                      <Button className="h-9 px-4" style={{ backgroundColor: "#997ca3" }}>Şifre Değiştir</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-full border-t border-[#E0E1E6] py-5" />
              <div className="lg:col-span-2 py-[5px]">
                <div className="text-2xl font-bold text-[#23262F]">2-Aşamalı Doğrulama</div>
                <div className="mt-1 text-base text-[#565e6c]">İkinci bir kimlik doğrulama adımı ile hesabınıza ekstra güvenlik katmanı ekleyin.</div>
              </div>
              <div className="lg:col-span-3 py-[5px]">
                <div className="rounded-xl border border-[#E0E1E6] bg-white p-4">
                  <div className="text-sm font-semibold text-[#565e6c]">2-Aşamalı Doğrulama Kapalı</div>
                  <div className="my-2 h-px w-full bg-[#E0E1E6]" />
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Shield className="h-6 w-6 text-[#8C79B6]" />
                    </div>
                    <div className="flex-1 text-sm text-[#565e6c]">
                      Bilinmeyen bir cihaz veya tarayıcıdan oturum açıldığını tespit edersek, şifre ve doğrulama kodu isteriz.
                    </div>
                    <div>
                      <Button className="h-9 px-4" style={{ backgroundColor: "#997ca3" }}>Doğrulamayı Aç</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-full border-t border-[#E0E1E6] py-5" />
              <div className="lg:col-span-2 py-[5px]">
                <div className="text-2xl font-bold text-[#23262F]">Giriş Yapılmış Cihazlar</div>
                <div className="mt-1 text-base text-[#565e6c]">Uygulamaya giriş yaptığınız yerler ve cihazlar.</div>
              </div>
              <div className="lg:col-span-3 py-[5px]">
                <div className="rounded-xl border border-[#E0E1E6] bg-white p-4">
                  <div className="space-y-3">
            {[
              { device: "Chrome on Mac OS X", time: "11 Oct at 4:20 PM", location: "California, USA", status: "Active now", active: true },
              { device: "Safari on iPhone 11", time: "10 Oct at 6:09 PM", location: "California, USA" },
              { device: "Chrome on Windows 10", time: "07 Oct at 3:16 PM", location: "California, USA" },
            ].map((item, idx) => (
              <div key={idx} className={`flex items-start justify-between gap-4 ${idx > 0 ? "border-t border-[#E0E1E6] pt-3" : ""}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-[#565e6c]" />
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#23262F]">{item.device}</span>
                      {item.active && <span className="rounded-full bg-[#10B981] px-2 py-0.5 text-[10px] text-white">Active now</span>}
                    </div>
                  </div>
                  <div className="ml-7 mt-1 text-xs text-[#9AA0AE]">
                    {item.time} • {item.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Çık</Button>
                  <Button variant="outline" size="sm">Engelle</Button>
                </div>
              </div>
            ))}
          </div>
                </div>
              </div>
            </div>
          )}
          {selectedKey === "users" && "Kullanıcı yönetimi içerikleri buraya gelecek."}
          {selectedKey === "roles" && "Rol ayarları içerikleri buraya gelecek."}
          {selectedKey === "clinic" && "Klinik profil ayarları içerikleri buraya gelecek."}
          {selectedKey === "profile" && "Profil ayarları içerikleri buraya gelecek."}
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [activeMenuKey, setActiveMenuKey] = React.useState<MenuKey>("hasta-kabul");
  const [collapsed, setCollapsed] = React.useState(false);
  const [rightVisible, setRightVisible] = React.useState(true);
  const [rightDockOpen, setRightDockOpen] = React.useState(false);

  React.useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      setCollapsed(w < 1280);
      setRightVisible(w >= 1280);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const [selectedId, setSelectedId] = React.useState<number | null>(1);
  const [modal, setModal] = React.useState<{ open: boolean; title?: string }>({ open: false });
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const CARD_STEP = 132;
  const [scrollTop, setScrollTop] = React.useState(0);
  const [date, setDate] = React.useState<string>(() => new Date().toISOString().slice(0, 10));
  const [dateOpen, setDateOpen] = React.useState(false);
  const dateBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const calRef = React.useRef<HTMLDivElement | null>(null);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const userBtnRef = React.useRef<HTMLDivElement | null>(null);
  const userMenuRef = React.useRef<HTMLDivElement | null>(null);
  const [modalContent, setModalContent] = React.useState<React.ReactNode | undefined>(undefined);
  const [workspaceView, setWorkspaceView] = React.useState<null | "settings" | "new-customer">(null);
  const [settingsKey, setSettingsKey] = React.useState<string>("security");

  React.useEffect(() => {
    if (!dateOpen) return;
    const onDocClick = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node | null;
      if (!t) return;
      if (dateBtnRef.current?.contains(t)) return;
      if (calRef.current?.contains(t)) return;
      setDateOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, [dateOpen]);

  React.useEffect(() => {
    if (!userMenuOpen) return;
    const onDocClick = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node | null;
      if (!t) return;
      if (userBtnRef.current?.contains(t)) return;
      if (userMenuRef.current?.contains(t)) return;
      setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, [userMenuOpen]);

  const onWheelSnap = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dir = Math.sign(e.deltaY) || 1;
    const el = listRef.current;
    if (!el) return;
    const next = Math.max(
      0,
      Math.min(
        el.scrollHeight - el.clientHeight,
        Math.round((el.scrollTop + dir * CARD_STEP) / CARD_STEP) * CARD_STEP
      )
    );
    el.scrollTo({ top: next, behavior: "smooth" });
  };

  const VISIBLE = 3;
  const BUFFER = 1;
  const visibleStart = Math.floor(scrollTop / CARD_STEP);
  const start = Math.max(0, visibleStart - BUFFER);
  const end = Math.min(reminders.length, visibleStart + VISIBLE + BUFFER);
  const topPad = start * CARD_STEP;
  const bottomPad = (reminders.length - end) * CARD_STEP;

  if (typeof window !== "undefined") {
    console.assert(end - start <= VISIBLE + BUFFER * 2, "Virtual window size out of bounds", {
      start,
      end,
      VISIBLE,
      BUFFER,
    });
    console.assert(topPad >= 0 && bottomPad >= 0, "Padding must be non-negative", { topPad, bottomPad });
  }

  return (
    <div
      className="h-screen w-full bg-[#F3F4F6FF] text-[#565e6c]"
      style={{ fontFamily: "Nunito, ui-sans-serif, system-ui" }}
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar{ width:0; height:0 }
        .no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none }
      `}</style>
      <div
        className="grid h-full"
        style={{
          gridTemplateColumns: rightVisible ? `${collapsed ? 72 : 264}px 1fr 264px` : `${collapsed ? 72 : 264}px 1fr`,
        }}
      >
        <aside className="flex flex-col overflow-visible border-r bg-white" style={{ width: collapsed ? 72 : 264 }}>
          {!collapsed && (
            <div className="px-4 pb-3 pt-5">
              <Card>
                <CardContent className="flex h-[72px] items-center justify-center p-4">
                  <div className="flex items-center justify-center text-center">
                    <div className="text-sm font-semibold">Yeditepe Veteriner Kliniği</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className={collapsed ? "overflow-visible px-2 pb-6 pt-4" : "px-3 pb-6"}>
            <div className={collapsed ? "flex flex-col items-center gap-2 overflow-visible" : "space-y-1"}>
              {menu.map((m) => (
                <SideMenuItem
                  key={m.key}
                  item={m}
                  active={m.key === activeMenuKey}
                  collapsed={collapsed}
                  onClick={(key) => {
                    setActiveMenuKey(key);
                    if (key === "yeni-musteri") setWorkspaceView("new-customer");
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mt-auto border-t p-3">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              Çıkış
            </Button>
          </div>
        </aside>

        <main className="relative flex min-h-0 flex-col">
          <div className="flex-1 p-0">
            <div className="h-full w-full bg-white p-4">
              <div id="workspace" className="h-full w-full rounded-2xl border border-[#E0E1E6] bg-[#dee1e6] overflow-hidden">
                {workspaceView === "settings" ? (
                  <SettingsPanel
                    selectedKey={settingsKey}
                    onSelect={setSettingsKey}
                    onClose={() => setWorkspaceView(null)}
                  />
                ) : null}
                {workspaceView === "new-customer" ? (
                  <NewCustomerForm onClose={() => setWorkspaceView(null)} />
                ) : null}
              </div>
            </div>
            <div id="modal-root" className={`absolute inset-0 ${modal.open ? "" : "pointer-events-none"}`} />
            <Modal
              open={modal.open}
              title={modal.title}
              onClose={() => {
                setModal({ open: false });
                setModalContent(undefined);
              }}
            >
              {modalContent}
            </Modal>
          </div>
        </main>

        {!rightVisible && (
          <>
            <button
              aria-label="Sağ paneli aç"
              onClick={() => setRightDockOpen(true)}
              className="fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-md bg-white/90 px-2 py-3 text-sm shadow-[4px_2px_8px_rgba(0,0,0,0.14)] hover:shadow-[6px_2px_12px_rgba(0,0,0,0.18)]"
            >
              ◀
            </button>
            {rightDockOpen
              ? createPortal(
                  <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0" onClick={() => setRightDockOpen(false)} />
                    <aside
                      className="absolute right-0 top-0 flex h-full w-[264px] flex-col border-l bg-white"
                    >
                      <div className="relative px-4 pt-4">
                        <div ref={userBtnRef} role="button" onClick={() => setUserMenuOpen((v) => !v)}>
                          <Card>
                            <CardContent className="flex h-[72px] items-center gap-3 p-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                <UserCircle2 className="h-6 w-6" />
                              </div>
                              <div className="min-w-0">
                                <div className="truncate text-sm font-medium">User Name</div>
                                <div className="text-xs text-[#565e6c]">Admin</div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        {userMenuOpen ? (
                          <div ref={userMenuRef} className="absolute left-4 right-4 top-full z-[60] mt-2" onClick={(e) => e.stopPropagation()}>
                            <div className="overflow-hidden rounded-xl border border-[#E0E1E6] bg-white shadow-xl">
                              <button
                                className="w-full px-4 py-2 text-left text-sm transition-colors active:scale-[0.99] hover:bg-[#ECE9F1]"
                                onClick={() => {
                                  setWorkspaceView("settings");
                                  setUserMenuOpen(false);
                                  setRightDockOpen(false);
                                }}
                              >
                                Ayarlar
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm transition-colors active:scale-[0.99] hover:bg-[#ECE9F1]">Çıkış</button>
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <div className="pt-5">
                        <div className="mb-1 flex items-center justify-center">
                          <div className="text-center text-base font-bold uppercase tracking-wide text-[#565e6c]">
                            Hatırlatıcı
                          </div>
                        </div>
                        <div className="relative mb-3 flex w-full items-center justify-center text-xs text-[#565e6c]">
                          <button
                            type="button"
                            onClick={() => setDateOpen((v) => !v)}
                            className="h-8 w-[225px] rounded-md border border-[#E0E1E6] bg-white px-2 text-center font-medium"
                          >
                            {date}
                          </button>
                          {dateOpen ? (
                            <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
                              <SimpleCalendar value={date} onChange={setDate} onClose={() => setDateOpen(false)} />
                            </div>
                          ) : null}
                        </div>
                        <div
                          ref={listRef}
                          onWheel={onWheelSnap}
                          onScroll={(e) => setScrollTop((e.currentTarget as HTMLDivElement).scrollTop)}
                          className="no-scrollbar flex h-[396px] w-full snap-y snap-mandatory flex-col overflow-y-auto overflow-x-visible"
                          style={{ msOverflowStyle: "none", scrollbarWidth: "none", scrollbarGutter: "stable both-edges" }}
                        >
                          <div className="flex flex-col" style={{ paddingTop: topPad, paddingBottom: bottomPad }}>
                            {reminders.slice(start, end).map((r) => (
                              <div key={r.id} className="flex h-[132px] items-center justify-center snap-start">
                                <ReminderCard r={r} selected={selectedId === r.id} onSelect={setSelectedId} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="px-4 pt-6 pb-4">
                        <div className="text-center text-base font-bold uppercase tracking-wide text-[#565e6c]">Son İşlemler</div>
                        <Card className="mt-2">
                          <CardContent className="p-4 text-xs text-[#565e6c]">Henüz işlem yok.</CardContent>
                        </Card>
                      </div>
                    </aside>
                  </div>,
                  document.body
                )
              : null}
          </>
        )}

        <aside
          className="flex h-full w-[264px] flex-col border-l bg-white"
          style={{ display: rightVisible ? "flex" : "none" }}
        >
          <div className="relative px-4 pt-4">
            <div ref={userBtnRef} role="button" onClick={() => setUserMenuOpen((v) => !v)}>
              <Card>
                <CardContent className="flex h-[72px] items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <UserCircle2 className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">User Name</div>
                    <div className="text-xs text-[#565e6c]">Admin</div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {userMenuOpen ? (
              <div ref={userMenuRef} className="absolute left-4 right-4 top-full z-50 mt-2">
                <div className="overflow-hidden rounded-xl border border-[#E0E1E6] bg-white shadow-xl">
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-[#ECE9F1]"
                    onClick={() => {
                      setWorkspaceView("settings");
                      setUserMenuOpen(false);
                    }}
                  >
                    Ayarlar
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#ECE9F1]">Çıkış</button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="pt-5">
            <div className="mb-1 flex items-center justify-center">
              <div className="text-center text-base font-bold uppercase tracking-wide text-[#565e6c]">Hatırlatıcı</div>
            </div>
            <div className="relative mb-3 flex w-full items-center justify-center text-xs text-[#565e6c]">
              <button
                ref={dateBtnRef}
                type="button"
                onClick={() => setDateOpen((v) => !v)}
                className="h-8 w-[225px] rounded-md border border-[#E0E1E6] bg-white px-2 text-center font-medium"
              >
                {date}
              </button>
              {dateOpen ? (
                <div ref={calRef} className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
                  <SimpleCalendar value={date} onChange={setDate} onClose={() => setDateOpen(false)} />
                </div>
              ) : null}
            </div>
            <div
              ref={listRef}
              onWheel={onWheelSnap}
              onScroll={(e) => setScrollTop((e.currentTarget as HTMLDivElement).scrollTop)}
              className="no-scrollbar flex h-[396px] w-full snap-y snap-mandatory flex-col overflow-y-auto overflow-x-visible"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none", scrollbarGutter: "stable both-edges" }}
            >
              <div className="flex flex-col" style={{ paddingTop: topPad, paddingBottom: bottomPad }}>
                {reminders.slice(start, end).map((r) => (
                  <div key={r.id} className="flex h-[132px] items-center justify-center snap-start">
                    <ReminderCard r={r} selected={selectedId === r.id} onSelect={setSelectedId} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 pt-6 pb-4">
            <div className="text-center text-base font-bold uppercase tracking-wide text-[#565e6c]">Son İşlemler</div>
            <Card className="mt-2">
              <CardContent className="p-4 text-xs text-[#565e6c]">Henüz işlem yok.</CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}



