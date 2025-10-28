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

type SideMenuItemProps = {
  item: MenuItem;
  onClick?: (key: string) => void;
  collapsed?: boolean;
};

function SideMenuItem({ item, onClick, collapsed }: SideMenuItemProps) {
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
            item.active ? "text-white" : "text-[#565e6c] hover:bg-white"
          }`}
          style={item.active ? { backgroundColor: "#997ca3" } : undefined}
        >
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.active ? "bg-transparent" : "bg-transparent"}`}>
            <Icon className={`h-8 w-8 ${item.active ? "text-white" : "text-[#6B6E7E]"}`} />
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
                    item.active ? "bg-[#997ca3]" : "bg-transparent"
                  }`}
                >
                  <Icon className={`h-8 w-8 ${item.active ? "text-white" : "text-[#6B6E7E]"}`} />
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
        item.active ? "text-white" : "text-[#565e6c] hover:bg-[#ECE9F1]"
      }`}
      style={item.active ? { backgroundColor: "#997ca3" } : undefined}
    >
      <Icon className={`h-6 w-6 ${item.active ? "text-white" : "text-[#6B6E7E]"}`} />
      <span className="flex-1 text-left leading-tight">{item.label}</span>
      {item.badge ? (
        <span
          className={`ml-1 rounded-full px-2 py-0.5 text-[10px] ${
            item.active ? "bg-white text-[#997ca3]" : "bg-[#E74C3C] text-white"
          }`}
        >
          {item.badge}
        </span>
      ) : null}
      {Trailing ? <Trailing className={`h-4 w-4 ${item.active ? "text-white/90" : "text-[#9AA0AE]"}`} /> : null}
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

function NewCustomerForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative h-full w-full overflow-y-auto bg-white">
      <div className="border-b border-[#E0E1E6]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[#565e6c]">Yeni Müşteri Kayıt</span>
            <span className="text-sm text-[#9AA0AE]">Adres</span>
          </div>
          <div className="flex items-center gap-3">
            <LayoutGrid className="h-4 w-4 text-[#565e6c]" />
            <SearchIcon className="h-4 w-4 text-[#565e6c]" />
            <Bell className="h-4 w-4 text-[#565e6c]" />
          </div>
        </div>
      </div>
      <div className="grid h-full grid-cols-12 gap-4 p-4">
        <div className="col-span-7 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#565e6c]">
              TC Kimlik No*
            </label>
            <div className="relative">
              <input
                type="text"
                className="h-9 w-full rounded-md border border-[#E0E1E6] bg-white px-3 pr-8 text-sm outline-none placeholder:text-[#9AA0AE]"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9AA0AE]">
                <SearchIcon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <input type="checkbox" id="tc-yok" className="h-3.5 w-3.5 rounded border-[#E0E1E6]" />
              <label htmlFor="tc-yok" className="text-xs text-[#565e6c]">
                TC Vatandaşı Değil
              </label>
            </div>
            <div className="mt-1 text-xs text-[#E74C3C]">Doldurulması Zorunlu Alan!</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-[#565e6c]">Adı*</label>
              <input
                type="text"
                className="h-9 w-full rounded-md border border-[#E0E1E6] bg-white px-3 text-sm outline-none placeholder:text-[#9AA0AE]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-[#565e6c]">Soyadı*</label>
              <input
                type="text"
                className="h-9 w-full rounded-md border border-[#E0E1E6] bg-white px-3 text-sm outline-none placeholder:text-[#9AA0AE]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-[#565e6c]">Cinsiyet*</label>
            <select className="h-9 w-full rounded-md border border-[#E0E1E6] bg-white px-3 text-sm outline-none">
              <option>Seçiniz</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-[#565e6c]">Doğum Tarihi</label>
            <div className="relative">
              <input
                type="text"
                defaultValue="25.10.1990"
                className="h-9 w-full rounded-md border border-[#E0E1E6] bg-white px-3 pr-8 text-sm outline-none placeholder:text-[#9AA0AE]"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9AA0AE]">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-[#565e6c]">Gsm No*</label>
            <input
              type="tel"
              className="h-9 w-full rounded-md border border-[#E0E1E6] bg-white px-3 text-sm outline-none placeholder:text-[#9AA0AE]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-[#565e6c]">E-Mail</label>
            <input
              type="email"
              className="h-9 w-full rounded-md border border-[#E0E1E6] bg-white px-3 text-sm outline-none placeholder:text-[#9AA0AE]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-[#565e6c]">Ad Soyad</label>
            <input
              type="text"
              className="h-9 w-full rounded-md border border-[#E0E1E6] bg-white px-3 text-sm outline-none placeholder:text-[#9AA0AE]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-[#565e6c]">İletişim Tercihi</label>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="h-3.5 w-3.5 rounded border-[#E0E1E6]" />
                <label className="text-xs text-[#565e6c]">E-Mail</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="h-3.5 w-3.5 rounded border-[#E0E1E6]" />
                <label className="text-xs text-[#565e6c]">SMS</label>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-[#565e6c]">GSM</label>
            <input
              type="tel"
              className="h-9 w-full rounded-md border border-[#E0E1E6] bg-white px-3 text-sm outline-none placeholder:text-[#9AA0AE]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-[#565e6c]">Not</label>
            <textarea className="h-20 w-full rounded-md border border-[#E0E1E6] bg-white px-3 py-2 text-sm outline-none placeholder:text-[#9AA0AE]"></textarea>
          </div>
        </div>

        <div className="col-span-5 space-y-4">
          <div className="rounded-xl border border-[#E0E1E6] bg-white">
            <div className="flex items-center justify-between border-b border-[#E0E1E6] px-4 py-2">
              <div className="flex gap-2">
                <button className="text-sm text-[#9AA0AE]">Başlık</button>
                <button className="border-b-2 border-[#997ca3] pb-1 text-sm font-semibold text-[#997ca3]">
                  Adres
                </button>
              </div>
              <button className="flex h-6 w-6 items-center justify-center rounded-md text-[#997ca3] hover:bg-[#ECE9F1]">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 text-sm text-[#9AA0AE]"></div>
          </div>

          <div className="rounded-xl border border-[#E0E1E6] bg-white">
            <div className="flex items-center justify-between border-b border-[#E0E1E6] px-4 py-2">
              <div className="text-sm font-semibold text-[#565e6c]">Kayıtlı Hasta</div>
              <button className="flex h-6 w-6 items-center justify-center rounded-md text-[#997ca3] hover:bg-[#ECE9F1]">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-2 px-4 py-2">
              <button className="border-b-2 border-[#997ca3] pb-1 text-sm font-semibold text-[#997ca3]">
                Cins
              </button>
              <button className="pb-1 text-sm text-[#9AA0AE]">Adı</button>
            </div>
            <div className="p-4 text-sm text-[#9AA0AE]"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-[#E0E1E6] bg-white px-4 py-3">
        <div className="flex justify-end gap-3">
          <Button onClick={onClose}>Kaydet</Button>
          <Button style={{ backgroundColor: "#997ca3" }}>Kaydet ve Yeni Muayene</Button>
          <Button variant="outline" onClick={onClose}>
            İptal
          </Button>
        </div>
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
  const [workspaceView, setWorkspaceView] = React.useState<null | "settings">(null);
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
                  collapsed={collapsed}
                  onClick={(key) => {
                    if (key === "yeni-musteri") setModal({ open: true, title: "Yeni Müşteri" });
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
