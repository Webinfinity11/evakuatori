"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LOCALES, LOCALE_NAMES, LOCALE_SHORT, type Locale } from "@/lib/i18n";
import { Globe, Check } from "lucide-react";

export default function LocaleSwitcher({ current, dark = false }: { current: Locale; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function go(next: Locale) {
    setOpen(false);
    // /ka/foo -> /en/foo
    const rest = pathname.split("/").slice(2).join("/");
    document.cookie = `locale=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    router.push(`/${next}${rest ? `/${rest}` : ""}`);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={LOCALE_NAMES[current]}
        className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-bold transition ${
          dark
            ? "text-white/70 hover:bg-white/10 hover:text-white"
            : "text-ink/60 hover:bg-ink/5 hover:text-ink"
        }`}
      >
        <Globe className="size-4" strokeWidth={2.2} />
        {LOCALE_SHORT[current]}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
          <ul
            role="listbox"
            className="absolute right-0 z-20 mt-2 min-w-[150px] overflow-hidden rounded-2xl border border-ink/10 bg-white p-1 shadow-xl shadow-ink/10"
          >
            {LOCALES.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l === current}
                  onClick={() => go(l)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                    l === current ? "bg-brand/10 font-bold text-brand" : "text-ink/70 hover:bg-ink/5"
                  }`}
                >
                  {LOCALE_NAMES[l]}
                  {l === current && <Check className="size-4" strokeWidth={3} />}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
