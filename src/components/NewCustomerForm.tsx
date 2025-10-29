import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, SearchIcon, Bell, Users, Calendar, Plus, X } from "@/icons/lucide";
import { BubbleHeader } from "@/components/ui/bubble-header";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { IconInput } from "@/components/ui/icon-input";
import ThemedSelect from "@/components/ui/themed-select";

// Copied helper to preserve original UI/behavior

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

  // Yeni Hasta ekleme icin durumlar (geri yüklendi)
  const [patientModalOpen, setPatientModalOpen] = React.useState(false);
  const initialPatient = {
    name: "",
    chipNo: "",
    species: "",
    breed: "bilinmiyor",
    gender: "",
    hybridStatus: "bilinmiyor",
    color: "",
    neuterStatus: "bilinmiyor",
    birthDate: "",
    bloodGroup: "bilinmiyor",
    mate: "bilinmiyor",
    adopt: "bilinmiyor",
    weight: "",
  };
  type PatientForm = typeof initialPatient;
  type SavedPatient = PatientForm & { id: string };
  const [patientForm, setPatientForm] = React.useState<PatientForm>(initialPatient);
  const [patientErrors, setPatientErrors] = React.useState<Partial<Record<keyof PatientForm, string>>>({});
  const [patients, setPatients] = React.useState<SavedPatient[]>([]);
  const patientSpeciesOptions = [
    { value: "kedi", label: "Kedi" },
    { value: "kopek", label: "Köpek" },
    { value: "kus", label: "Kuş" },
  ];
  const patientBreedOptions: Record<string, { value: string; label: string }[]> = {
    kedi: [
      { value: "tekir", label: "Tekir" },
      { value: "british", label: "British Shorthair" },
      { value: "scottish", label: "Scottish Fold" },
      { value: "van", label: "Van Kedisi" },
      { value: "persian", label: "Persian" },
    ],
    kopek: [
      { value: "golden", label: "Golden Retriever" },
      { value: "german", label: "Alman Kurdu" },
      { value: "poodle", label: "Poodle" },
      { value: "terrier", label: "Terrier" },
    ],
    kus: [
      { value: "muhabbet", label: "Muhabbet Kuşu" },
      { value: "kanarya", label: "Kanarya" },
      { value: "papagan", label: "Papağan" },
    ],
  };
  const genderOptionsPet = [
    { value: "erkek", label: "Erkek" },
    { value: "disi", label: "Dişi" },
    { value: "bilinmiyor", label: "Bilinmiyor" },
  ];
  const hybridStatusOptions = [
    { value: "bilinmiyor", label: "Bilinmiyor" },
    { value: "safkan", label: "Safkan" },
    { value: "melez", label: "Melez" },
  ];
  const colorOptions = [
    { value: "siyah", label: "Siyah" },
    { value: "beyaz", label: "Beyaz" },
    { value: "kahverengi", label: "Kahverengi" },
    { value: "gri", label: "Gri" },
    { value: "sari", label: "Sarı" },
    { value: "karisik", label: "Karışık" },
  ];
  const neuterStatusOptions = [
    { value: "bilinmiyor", label: "Bilinmiyor" },
    { value: "kisir", label: "Kısır" },
    { value: "degil", label: "Değil" },
  ];
  const bloodGroupOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "AB", label: "AB" },
    { value: "dea11p", label: "DEA 1.1 +" },
    { value: "dea11n", label: "DEA 1.1 -" },
    { value: "bilinmiyor", label: "Bilinmiyor" },
  ];
  const yesNoOptions = [
    { value: "bilinmiyor", label: "Bilinmiyor" },
    { value: "evet", label: "Evet" },
    { value: "hayir", label: "Hayır" },
  ];
  const breedList = [{ value: "bilinmiyor", label: "Bilinmiyor" }, ...(patientForm.species ? patientBreedOptions[patientForm.species] ?? [] : [])];
  const sanitizeChipNo = (value: string) => value.replace(/\D/g, "").slice(0, 15);
  const sanitizeWeight = (value: string) => {
    const v = value.replace(",", ".").replace(/[^0-9.]/g, "");
    const parts = v.split(".");
    if (parts.length <= 2) return v;
    return parts[0] + "." + parts.slice(1).join("");
  };

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

      <div className="flex-1 overflow-y-auto px-8 pt-8 pb-6">
        <div className="grid h-full items-stretch gap-6 xl:grid-cols-[1.08fr,0.92fr]">
          <section className="relative h-full rounded-[32px] border border-[#cdbbe3] bg-white/95 shadow-[0_24px_45px_rgba(182,167,209,0.2)] flex flex-col min-h-0">
            <BubbleHeader>Yeni Musteri Kayit</BubbleHeader>
            <div className="flex-1 min-h-0 px-8 pt-8 pb-6 space-y-6">
              <div>
                <label className={labelClass} htmlFor={identityInputId}>
                  {identityLabel} <span className="text-[#c45a71]">*</span>
                </label>
                <IconInput
                  icon={<Users className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#b1a5cc]" />}
                  id={identityInputId}
                  className={inputClassFor("identity", "pr-12")}
                  placeholder={identityPlaceholder}
                  inputMode={isForeign ? "text" : "numeric"}
                  value={form.identity}
                  onChange={(e) => handleIdentityChange(e.target.value)}
                />
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
                  <Input id={nameInputId} className={inputClassFor("name")} placeholder="Ad" value={form.name} onChange={(e) => updateField("name", sanitizeLetters(e.target.value))} />
                  {errorText("name")}
                </div>
                <div>
                  <label className={labelClass} htmlFor={surnameInputId}>
                    Soyadi <span className="text-[#c45a71]">*</span>
                  </label>
                  <Input id={surnameInputId} className={inputClassFor("surname")} placeholder="Soyad" value={form.surname} onChange={(e) => updateField("surname", sanitizeLetters(e.target.value))} />
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
                  <IconInput
                    icon={<Calendar className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b1a5cc]" />}
                    id={birthDateInputId}
                    className={inputClassFor("birthDate", "pr-12")}
                    value={form.birthDate}
                    onChange={(e) => handleBirthDateChange(e.target.value)}
                    inputMode="numeric"
                    placeholder="gg.aa.yyyy"
                  />
                  {errorText("birthDate")}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor={gsmInputId}>
                    GSM No <span className="text-[#c45a71]">*</span>
                  </label>
                  <Input id={gsmInputId} className={inputClassFor("gsm")} placeholder="5XX XXX XX XX" value={form.gsm} inputMode="numeric" onChange={(e) => updateField("gsm", limitDigits(e.target.value, 10))} />
                  {errorText("gsm")}
                </div>
                <div>
                  <label className={labelClass} htmlFor={emailInputId}>
                    E-mail
                  </label>
                  <Input id={emailInputId} className={inputClassFor("email")} placeholder="ornek@email.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
                  {errorText("email")}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor={contactNameId}>
                    Yetkili Ad Soyad
                  </label>
                  <Input id={contactNameId} className={inputClassFor("contactName")} placeholder="Ad Soyad" value={form.contactName} onChange={(e) => updateField("contactName", sanitizeLetters(e.target.value))} />
                  {errorText("contactName")}
                </div>
                <div>
                  <label className={labelClass} htmlFor={contactGsmId}>
                    Yetkili GSM
                  </label>
                  <Input id={contactGsmId} className={inputClassFor("contactGsm")} placeholder="5XX XXX XX XX" value={form.contactGsm} inputMode="numeric" onChange={(e) => updateField("contactGsm", limitDigits(e.target.value, 10))} />
                  {errorText("contactGsm")}
                </div>
                <div className="sm:col-span-2 rounded-2xl border border-[#d9cfeb] bg-[#f8f6fe] px-4 py-3">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#6f6787]">
                    Iletisim Tercihi
                  </span>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#5b5171]">
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-[#cdbbe3] accent-[#8c74c0]" />
                      E-mail
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-[#cdbbe3] accent-[#8c74c0]" />
                      SMS
                    </label>
                  </div>
                </div>
              </div>

            </div>
            <div className="border-t border-[#dcd0eb] px-6 py-4">
              <div className="flex justify-center gap-3">
                <Button className="px-8" onClick={() => handleSubmit("save")}>
                  Kaydet
                </Button>
                <Button className="px-8" onClick={() => handleSubmit("save-new")}>
                  Kaydet ve Yeni Muayene
                </Button>
                <Button variant="outline" className="px-8" onClick={onClose}>
                  Iptal
                </Button>
              </div>
            </div>
          </section>

          <div className="relative h-full">
            <div className={`space-y-6 transition ${(addressModalOpen || patientModalOpen) ? "pointer-events-none opacity-0" : ""}`} aria-hidden={addressModalOpen || patientModalOpen}>
              <section className="relative rounded-[32px] border border-[#cdbbe3] bg-white/95 pt-8 pb-6 shadow-[0_20px_40px_rgba(182,167,209,0.18)]">
            <BubbleHeader>Adres</BubbleHeader>
                <div className="flex items-center justify-end px-6 pt-1">
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c74c0] text-white transition hover:bg-[#7b64a9]" onClick={() => setAddressModalOpen(true)}>
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

              <section className="relative rounded-[32px] border border-[#cdbbe3] bg-white/95 pt-8 pb-6 shadow-[0_20px_40px_rgba(182,167,209,0.18)]">
            <BubbleHeader>Kayitli Hasta</BubbleHeader>
                <div className="flex items-center justify-end px-6 pt-1">
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c74c0] text-white transition hover:bg-[#7b64a9]" onClick={() => setPatientModalOpen(true)}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="px-6 pt-6">
                  {patients.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#d9cfeb] bg-[#fbf9ff] px-6 py-6 text-sm leading-relaxed text-[#9a92b5]">
                    Kayitli hasta bulunmuyor. Yeni hasta eklemek icin artiya tiklayin.
                  </div>
                  ) : (
                    <div className="overflow-hidden rounded-2xl border border-[#d9cfeb] bg-white">
                      <table className="w-full text-sm">
                        <thead className="bg-[#f7f3ff] text-[#5b5171]">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold">Adı</th>
                            <th className="px-4 py-3 text-left font-semibold">Cins</th>
                            <th className="px-4 py-3 text-left font-semibold">Irk</th>
                            <th className="px-4 py-3 text-left font-semibold">Çip No</th>
                            <th className="px-3 py-3 text-right font-semibold">&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {patients.map((p) => {
                            const speciesLabel = patientSpeciesOptions.find((o) => o.value === p.species)?.label ?? (p.species || "");
                            const breedLabel = p.breed === "bilinmiyor"
                              ? "Bilinmiyor"
                              : (patientBreedOptions[p.species]?.find((o) => o.value === p.breed)?.label ?? (p.breed || ""));
                            return (
                              <tr key={p.id} className="border-t border-[#ebe4f6] text-[#5b5171]">
                                <td className="px-4 py-3 font-medium">{p.name}</td>
                                <td className="px-4 py-3">{speciesLabel}</td>
                                <td className="px-4 py-3">{breedLabel}</td>
                                <td className="px-4 py-3">{p.chipNo}</td>
                                <td className="px-3 py-3 text-right">
                                  <button
                                    type="button"
                                    onClick={() => setPatients((prev) => prev.filter((row) => row.id !== p.id))}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-[#a988be] transition hover:bg-[#f2ecfc] hover:text-[#7a5fa0]"
                                    aria-label="Hastayı sil"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {addressModalOpen ? (
              <div className="absolute inset-0 z-10 flex bg-[#edeff7]">
                <div className="relative flex h-full w-full flex-col rounded-[32px] border border-[#cdbbe3] bg-white/98 shadow-[0_24px_45px_rgba(182,167,209,0.28)]">
                  <BubbleHeader>Yeni Adres</BubbleHeader>
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
            {patientModalOpen ? (
          <div className="absolute inset-0 z-10 flex bg-[#edeff7]">
            <div className="relative flex h-full w-full flex-col rounded-[32px] border border-[#cdbbe3] bg-white/98 shadow-[0_24px_45px_rgba(182,167,209,0.28)]">
              <BubbleHeader>Yeni Hasta</BubbleHeader>
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="mx-auto flex w-full max-w-md flex-col gap-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Adı</label>
                      <Input
                        className={ `${inputClass}${patientErrors.name ? ` ${errorClass}` : ""}` }
                        placeholder="Hasta Adı"
                        value={patientForm.name}
                        onChange={(e) => setPatientForm((prev) => ({ ...prev, name: e.target.value }))}
                      />
                      {patientErrors.name ? (<p className="mt-1 text-xs font-medium text-[#d46a6a]">{patientErrors.name}</p>) : null}
                    </div>
                    <div>
                      <label className={labelClass}>Çip No</label>
                      <Input
                        className={ `${inputClass}${patientErrors.chipNo ? ` ${errorClass}` : ""}` }
                        placeholder="15 haneli çip no"
                        value={patientForm.chipNo}
                        inputMode="numeric"
                        onChange={(e) => setPatientForm((prev) => ({ ...prev, chipNo: sanitizeChipNo(e.target.value) }))}
                      />
                      {patientErrors.chipNo ? (<p className="mt-1 text-xs font-medium text-[#d46a6a]">{patientErrors.chipNo}</p>) : null}
          </div>
        </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Cins <span className="text-[#c45a71]">**</span></label>
                      <ThemedSelect
                        id="patient-species"
                        className={ `${inputClass}${patientErrors.species ? ` ${errorClass}` : ""}` }
                        value={patientForm.species}
                        onChange={(val) => {
                          setPatientForm((prev) => ({ ...prev, species: val, breed: "bilinmiyor" }));
                          setPatientErrors((prev) => { const next={...prev}; delete next.species; delete next.breed; return next; });
                        }}
                        placeholder="Cins secin"
                        options={patientSpeciesOptions}
                      />
                      {patientErrors.species ? (<p className="mt-1 text-xs font-medium text-[#d46a6a]">{patientErrors.species}</p>) : null}
                    </div>
                    <div>
                      <label className={labelClass}>Irk <span className="text-[#c45a71]">**</span></label>
                      <ThemedSelect
                        id="patient-breed"
                        className={ `${inputClass}${patientErrors.breed ? ` ${errorClass}` : ""}` }
                        value={patientForm.breed}
                        onChange={(val) => { setPatientForm((prev) => ({ ...prev, breed: val })); setPatientErrors((prev)=>{const n={...prev}; delete n.breed; return n;}); }}
                        placeholder={patientForm.species ? "Irk secin" : "Önce cins secin"}
                        options={breedList}
                        disabled={!patientForm.species}
                      />
                      {patientErrors.breed ? (<p className="mt-1 text-xs font-medium text-[#d46a6a]">{patientErrors.breed}</p>) : null}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Cinsiyet <span className="text-[#c45a71]">**</span></label>
                      <ThemedSelect
                        id="patient-gender"
                        className={ `${inputClass}${patientErrors.gender ? ` ${errorClass}` : ""}` }
                        value={patientForm.gender}
                        onChange={(val) => { setPatientForm((prev)=>({ ...prev, gender: val })); setPatientErrors((prev)=>{const n={...prev}; delete n.gender; return n;}); }}
                        placeholder="Cinsiyet secin"
                        options={genderOptionsPet}
                      />
                      {patientErrors.gender ? (<p className="mt-1 text-xs font-medium text-[#d46a6a]">{patientErrors.gender}</p>) : null}
                    </div>
                    <div>
                      <label className={labelClass}>Melezlik Durumu <span className="text-[#c45a71]">**</span></label>
                      <ThemedSelect
                        id="patient-hybrid"
                        className={ `${inputClass}${patientErrors.hybridStatus ? ` ${errorClass}` : ""}` }
                        value={patientForm.hybridStatus}
                        onChange={(val) => { setPatientForm((prev)=>({ ...prev, hybridStatus: val })); setPatientErrors((prev)=>{const n={...prev}; delete n.hybridStatus; return n;}); }}
                        placeholder="Seçiniz"
                        options={hybridStatusOptions}
                      />
                      {patientErrors.hybridStatus ? (<p className="mt-1 text-xs font-medium text-[#d46a6a]">{patientErrors.hybridStatus}</p>) : null}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Renk <span className="text-[#c45a71]">**</span></label>
                      <ThemedSelect
                        id="patient-color"
                        className={ `${inputClass}${patientErrors.color ? ` ${errorClass}` : ""}` }
                        value={patientForm.color}
                        onChange={(val) => { setPatientForm((prev)=>({ ...prev, color: val })); setPatientErrors((prev)=>{const n={...prev}; delete n.color; return n;}); }}
                        placeholder="Renk secin"
                        options={colorOptions}
                      />
                      {patientErrors.color ? (<p className="mt-1 text-xs font-medium text-[#d46a6a]">{patientErrors.color}</p>) : null}
                    </div>
                    <div>
                      <label className={labelClass}>Kısırlık Durumu <span className="text-[#c45a71]">**</span></label>
                      <ThemedSelect
                        id="patient-neuter"
                        className={ `${inputClass}${patientErrors.neuterStatus ? ` ${errorClass}` : ""}` }
                        value={patientForm.neuterStatus}
                        onChange={(val) => { setPatientForm((prev)=>({ ...prev, neuterStatus: val })); setPatientErrors((prev)=>{const n={...prev}; delete n.neuterStatus; return n;}); }}
                        placeholder="Seçiniz"
                        options={neuterStatusOptions}
                      />
                      {patientErrors.neuterStatus ? (<p className="mt-1 text-xs font-medium text-[#d46a6a]">{patientErrors.neuterStatus}</p>) : null}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Doğum Tarihi</label>
                      <IconInput
                        icon={<Calendar className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b1a5cc]" />}
                        id="patient-birth"
                        className={ `${inputClass}${patientErrors.birthDate ? ` ${errorClass}` : ""}` }
                        value={patientForm.birthDate}
                        onChange={(e) => setPatientForm((prev)=>({ ...prev, birthDate: formatDateInput(e.target.value) }))}
                        inputMode="numeric"
                        placeholder="gg.aa.yyyy"
                      />
                      {patientErrors.birthDate ? (<p className="mt-1 text-xs font-medium text-[#d46a6a]">{patientErrors.birthDate}</p>) : null}
                    </div>
                    <div>
                      <label className={labelClass}>Kan Grubu <span className="text-[#c45a71]">**</span></label>
                      <ThemedSelect
                        id="patient-blood"
                        className={ `${inputClass}${patientErrors.bloodGroup ? ` ${errorClass}` : ""}` }
                        value={patientForm.bloodGroup}
                        onChange={(val) => { setPatientForm((prev)=>({ ...prev, bloodGroup: val })); setPatientErrors((prev)=>{const n={...prev}; delete n.bloodGroup; return n;}); }}
                        placeholder="Seçiniz"
                        options={bloodGroupOptions}
                      />
                      {patientErrors.bloodGroup ? (<p className="mt-1 text-xs font-medium text-[#d46a6a]">{patientErrors.bloodGroup}</p>) : null}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Çiftleştir <span className="text-[#c45a71]">**</span></label>
                      <ThemedSelect
                        id="patient-mate"
                        className={ `${inputClass}${patientErrors.mate ? ` ${errorClass}` : ""}` }
                        value={patientForm.mate}
                        onChange={(val) => { setPatientForm((prev)=>({ ...prev, mate: val })); setPatientErrors((prev)=>{const n={...prev}; delete n.mate; return n;}); }}
                        placeholder="Seçiniz"
                        options={yesNoOptions}
                      />
                      {patientErrors.mate ? (<p className="mt-1 text-xs font-medium text-[#d46a6a]">{patientErrors.mate}</p>) : null}
                    </div>
                    <div>
                      <label className={labelClass}>Sahiplendir <span className="text-[#c45a71]">**</span></label>
                      <ThemedSelect
                        id="patient-adopt"
                        className={ `${inputClass}${patientErrors.adopt ? ` ${errorClass}` : ""}` }
                        value={patientForm.adopt}
                        onChange={(val) => { setPatientForm((prev)=>({ ...prev, adopt: val })); setPatientErrors((prev)=>{const n={...prev}; delete n.adopt; return n;}); }}
                        placeholder="Seçiniz"
                        options={yesNoOptions}
                      />
                      {patientErrors.adopt ? (<p className="mt-1 text-xs font-medium text-[#d46a6a]">{patientErrors.adopt}</p>) : null}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Kilo (kg)</label>
                      <Input
                        className={ `${inputClass}${patientErrors.weight ? ` ${errorClass}` : ""}` }
                        placeholder="Örn. 4.5"
                        value={patientForm.weight}
                        inputMode="decimal"
                        onChange={(e) => setPatientForm((prev)=>({ ...prev, weight: sanitizeWeight(e.target.value) }))}
                      />
                      {patientErrors.weight ? (<p className="mt-1 text-xs font-medium text-[#d46a6a]">{patientErrors.weight}</p>) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-[#dcd0eb] px-6 py-4">
                <div className="flex justify-center gap-3">
                  <Button className="px-8" onClick={() => {
                    const sanitized: PatientForm = {
                      name: sanitizeLetters(patientForm.name).trim(),
                      chipNo: sanitizeChipNo(patientForm.chipNo),
                      species: patientForm.species.trim(),
                      breed: patientForm.breed.trim(),
                      gender: patientForm.gender.trim(),
                      hybridStatus: patientForm.hybridStatus.trim(),
                      color: patientForm.color.trim(),
                      neuterStatus: patientForm.neuterStatus.trim(),
                      birthDate: patientForm.birthDate.trim(),
                      bloodGroup: patientForm.bloodGroup.trim(),
                      mate: patientForm.mate.trim(),
                      adopt: patientForm.adopt.trim(),
                      weight: sanitizeWeight(patientForm.weight).trim(),
                    };
                    const errs: Partial<Record<keyof PatientForm, string>> = {};
                    if (!sanitized.species) errs.species = "Cins secin.";
                    if (!sanitized.breed) errs.breed = "Irk secin.";
                    if (!sanitized.gender) errs.gender = "Cinsiyet secin.";
                    if (!sanitized.hybridStatus) errs.hybridStatus = "Melezlik durumu secin.";
                    if (!sanitized.color) errs.color = "Renk secin.";
                    if (!sanitized.neuterStatus) errs.neuterStatus = "Kısırlık durumu secin.";
                    if (!sanitized.bloodGroup) errs.bloodGroup = "Kan grubu secin.";
                    if (!sanitized.mate) errs.mate = "Çiftleştir secin.";
                    if (!sanitized.adopt) errs.adopt = "Sahiplendir secin.";
                    if (Object.keys(errs).length) { setPatientErrors(errs); return; }
                    const newPatient: SavedPatient = { ...sanitized, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
                    setPatients((prev) => [...prev, newPatient]);
                    setPatientErrors({});
                    setPatientForm(() => ({ ...initialPatient }));
                    setPatientModalOpen(false);
                  }}>
            Kaydet
          </Button>
                  <Button variant="outline" className="px-8" onClick={() => { setPatientModalOpen(false); setPatientErrors({}); }}>
            Iptal
          </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
          </div>
        </div>

        
      </div>
    </div>
  );
}
