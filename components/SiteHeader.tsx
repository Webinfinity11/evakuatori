"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionaries";
import LocaleSwitcher from "./LocaleSwitcher";

export default function SiteHeader({
  tel,
  telDisplay,
  locale,
  nav,
}: {
  tel: string;
  telDisplay: string;
  locale: Locale;
  nav: Dict["nav"];
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: nav.services },
    { href: "#fleet", label: nav.fleet },
    { href: "#coverage", label: nav.coverage },
    { href: "#prices", label: nav.prices },
    { href: "#faq", label: nav.faq },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-ink/8 bg-white/90 shadow-sm shadow-ink/5 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 transition-all duration-300 lg:px-8 ${
          scrolled ? "h-16" : "h-[76px]"
        }`}
      >
        <a href={`/${locale}`} className="group flex items-center gap-3">
          <span
            className={`grid shrink-0 place-items-center rounded-full bg-white p-1 shadow-md shadow-ink/10 ring-1 ring-ink/5 transition-all duration-300 ${
              scrolled ? "size-11" : "size-14"
            }`}
          >
            <Image
              src="/img/logo-v2.png"
              alt="ევაკუატორი"
              width={56}
              height={56}
              priority
              className="size-full transition-transform duration-300 group-hover:rotate-6"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight">ევაკუატორი</span>
            <span className="mt-1 text-[11px] font-bold tracking-[0.08em] text-brand">
              gadavikvanot.ge
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-ink/60 lg:flex">
          {links.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative py-1 transition hover:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LocaleSwitcher current={locale} />

          <a
            href={`tel:+995${tel}`}
            className="tt hidden items-center gap-2.5 rounded-full bg-brand px-5 py-3 text-[15px] font-extrabold text-white shadow-lg shadow-brand/25 transition hover:bg-[#d95614] hover:shadow-brand/40 active:scale-[0.98] sm:inline-flex"
          >
            <Phone className="size-4" strokeWidth={2.4} />
            {telDisplay}
          </a>

          <a
            href={`tel:+995${tel}`}
            aria-label={telDisplay}
            className="relative grid size-10 place-items-center rounded-full bg-brand text-white sm:hidden"
          >
            <span className="absolute inset-0 rounded-full bg-brand/40 animate-pulse-ring" aria-hidden />
            <Phone className="relative size-4.5" strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </header>
  );
}
