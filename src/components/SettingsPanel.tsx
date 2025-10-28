import React from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Lock as LockIcon,
  Users,
  LayoutGrid,
  FolderOpen,
  UserCircle2,
  ShieldSolid as Shield,
} from "@/icons/lucide";

export type SettingsPanelProps = {
  selectedKey: string;
  onSelect: (key: string) => void;
  onClose: () => void;
};

export default function SettingsPanel({ selectedKey, onSelect, onClose }: SettingsPanelProps) {
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
