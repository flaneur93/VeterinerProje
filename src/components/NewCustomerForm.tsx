import React from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  SearchIcon,
  Bell,
  Users,
  Calendar,
  Plus,
  X,
  ChevronDown,
} from "@/icons/lucide";

// Copied helper to preserve original UI/behavior
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

export type NewCustomerFormProps = {
  onClose: () => void;
};

export default function NewCustomerForm({ onClose }: NewCustomerFormProps) {
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
