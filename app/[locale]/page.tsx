import Image from "next/image";
import { notFound } from "next/navigation";
import GeorgiaMap from "@/components/GeorgiaMap";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import SiteHeader from "@/components/SiteHeader";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { Phone, Clock3, ShieldCheck, Wallet, ArrowUpRight, ChevronDown, Check, MapPin } from "lucide-react";

const TEL = "568120120";
const TEL_DISPLAY = "568 120 120";
const HREF = `tel:+995${TEL}`;

const SERVICE_IMGS = ["/img/service-standard-2.jpg", "/img/service-oboba.jpg", "/img/service-crash-2.jpg"];
const FLEET_IMGS = ["/img/fleet-oboba.jpg", "/img/fleet-flatbed.jpg"];
const PRICE_VALUES = ["60", "120"];

function CallButton({ big = false, className = "" }: { big?: boolean; className?: string }) {
  return (
    <a
      href={HREF}
      className={`group relative inline-flex items-center gap-3 overflow-hidden tt rounded-full bg-brand font-extrabold text-white shadow-lg shadow-brand/25 transition duration-300 hover:bg-[#d95614] hover:shadow-xl hover:shadow-brand/40 active:scale-[0.98] ${
        big ? "px-5 py-3.5 text-base sm:px-7 sm:py-4 sm:text-lg" : "px-5 py-3 text-[15px]"
      } ${className}`}
    >
      <span className="grid shrink-0 place-items-center rounded-full bg-white/20 p-1.5 transition duration-300 group-hover:rotate-[18deg]">
        <Phone className={big ? "size-4.5" : "size-3.5"} strokeWidth={2.6} />
      </span>
      {TEL_DISPLAY}
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand">{children}</p>;
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <>
      <SiteHeader tel={TEL} telDisplay={TEL_DISPLAY} locale={locale} nav={d.nav} />

      <main>
        {/* ---------------------------------- ჰერო ---------------------------------- */}
        <section className="relative -mt-[76px] overflow-hidden bg-cream pt-[76px]">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[620px] w-[1100px] -translate-x-1/2 opacity-80"
            style={{ background: "radial-gradient(closest-side, rgba(238,99,32,0.20), transparent)" }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-7xl px-5 pt-10 text-center sm:pt-24 lg:px-8">
            <h1 className="headline tt mx-auto max-w-4xl text-[32px] font-black sm:text-6xl lg:text-[68px]">
              <span className="enter block" style={{ animationDelay: "60ms" }}>{d.hero.title}</span>
            </h1>

            <p className="enter mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/60 sm:mt-6 sm:text-lg" style={{ animationDelay: "230ms" }}>
              {d.hero.lead}
            </p>

            <div className="enter mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:mt-8 sm:gap-3" style={{ animationDelay: "320ms" }}>
              <CallButton big />
              <a
                href="#prices"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white tt px-5 py-3.5 text-sm font-bold text-ink sm:px-6 sm:py-4 sm:text-base transition duration-300 hover:border-ink/30 hover:shadow-md"
              >
                {d.hero.pricesBtn}
                <ChevronDown className="size-4 text-ink/40 transition group-hover:translate-y-0.5" />
              </a>
            </div>

            {/* ევაკუატორი — რეფერენსის პროპორციაზე, ჩრდილითა და დეკორით */}
            <div className="relative mx-auto mt-6 max-w-3xl sm:mt-12">
              <svg
                className="pointer-events-none absolute -inset-x-24 top-1/2 hidden h-[260px] -translate-y-1/2 lg:block"
                viewBox="0 0 1200 260"
                fill="none"
                aria-hidden
              >
                <path d="M20 200 Q 170 60 330 120" stroke="#ee6320" strokeWidth="2" strokeDasharray="6 8" opacity="0.4" />
                <path d="M1180 190 Q 1030 50 880 110" stroke="#ee6320" strokeWidth="2" strokeDasharray="6 8" opacity="0.4" />
                <circle cx="20" cy="200" r="5" fill="#ee6320" opacity="0.5" />
                <circle cx="1180" cy="190" r="5" fill="#ee6320" opacity="0.5" />
              </svg>

              <div className="enter-truck relative" style={{ animationDelay: "400ms" }}>
                <div className="animate-floaty">
                  <Image
                    src="/img/evakuatori.png"
                    alt="ევაკუატორი ჩატვირთული ავტომობილით"
                    width={1494}
                    height={822}
                    priority
                    className="lift w-full"
                  />
                </div>

                {/* რბილი ჩრდილი მიწაზე */}
                <div
                  className="animate-shadow mx-auto -mt-4 h-6 w-[70%] rounded-[100%] blur-xl"
                  style={{ background: "radial-gradient(closest-side, rgba(16,16,20,0.55), transparent)" }}
                  aria-hidden
                />
              </div>
            </div>
          </div>

          <div className="relative mt-6 border-t border-ink/5 bg-cream-deep/60">
            <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-ink/5 px-5 lg:grid-cols-4 lg:px-8">
              {[
                { icon: Clock3, t: d.strip.call },
                { icon: Wallet, t: d.strip.price },
                { icon: ShieldCheck, t: d.strip.types },
                { icon: MapPin, t: d.strip.area },
              ].map(({ icon: I, t }, i) => (
                <Reveal key={t} delay={i * 90} className="flex items-center justify-center gap-2.5 px-3 py-5">
                  <I className="size-5 shrink-0 text-brand" strokeWidth={2} />
                  <span className="text-[13px] font-bold text-ink/75 sm:text-sm">{t}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Marquee items={d.marquee} />

        {/* ------------------------------- ჩვენ შესახებ ------------------------------- */}
        <section className="bg-cream px-5 py-16 sm:py-20 lg:px-8">
          <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-4xl bg-ink text-white sm:rounded-5xl">
            <div className="grid lg:grid-cols-2">
              <div className="group relative min-h-[280px] overflow-hidden lg:min-h-full">
                <Image
                  src="/img/sunset.jpg"
                  alt={d.about.imgAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[64%_center] transition duration-[1.2s] group-hover:scale-105"
                />
              </div>

              <div className="p-8 sm:p-12 lg:p-14">
                <Eyebrow>{d.about.eyebrow}</Eyebrow>
                <h2 className="headline tt text-3xl font-black sm:text-4xl">
                  {d.about.title1}<br />
                  <span className="text-brand-soft">{d.about.title2}</span>
                </h2>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
                  {d.about.text}
                </p>

                <ul className="mt-7 space-y-3">
                  {d.about.points.map((t, i) => (
                    <Reveal as="li" key={t} delay={120 + i * 100} className="flex gap-3 text-sm text-white/80">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-soft" strokeWidth={3} />
                      {t}
                    </Reveal>
                  ))}
                </ul>

                <CallButton className="mt-9" />
              </div>
            </div>
          </Reveal>
        </section>

        {/* -------------------------------- სერვისები -------------------------------- */}
        <section id="services" className="scroll-mt-24 bg-white px-5 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-xl text-center">
              <Eyebrow>{d.services.eyebrow}</Eyebrow>
              <h2 className="headline tt text-3xl font-black sm:text-5xl">
                {d.services.title1} <span className="text-brand">{d.services.title2}</span>
              </h2>
              <p className="mt-4 text-[15px] text-ink/55">
                {d.services.lead}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {d.services.items.map((s, i) => (
                <Reveal as="article" key={s.title} delay={i * 130} className="hover-lift group relative flex min-h-[400px] flex-col justify-end overflow-hidden rounded-4xl bg-ink">
                  <Image
                    src={SERVICE_IMGS[i]}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-[1.2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent transition duration-500 group-hover:from-ink group-hover:via-ink/60" />

                  <div className="relative flex items-end justify-between gap-4 p-6 sm:p-7">
                    <div>
                      <h3 className="text-lg font-extrabold text-white sm:text-xl">{s.title}</h3>
                      <p className="mt-1.5 text-sm text-white/60">{s.text}</p>
                    </div>
                    <a
                      href={HREF}
                      aria-label={`${d.services.callAria} ${s.title}`}
                      className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-white transition duration-300 group-hover:rotate-45 group-hover:scale-110"
                    >
                      <ArrowUpRight className="size-5" strokeWidth={2.5} />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------- ავტოპარკი -------------------------------- */}
        <section id="fleet" className="scroll-mt-24 bg-white px-5 pb-16 sm:pb-24 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mx-auto max-w-xl text-center">
              <Eyebrow>{d.fleet.eyebrow}</Eyebrow>
              <h2 className="headline tt text-3xl font-black sm:text-4xl">
                {d.fleet.title1} <span className="text-brand">{d.fleet.title2}</span>
              </h2>
              <p className="mt-4 text-[15px] text-ink/55">
                {d.fleet.lead}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {d.fleet.items.map((name, i) => (
                <Reveal
                  as="article"
                  key={name}
                  delay={i * 130}
                  className="hover-lift group overflow-hidden rounded-4xl border border-ink/10 bg-white"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={FLEET_IMGS[i]}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition duration-[1.2s] group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[15px] font-extrabold sm:text-base">{name}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------- ფოტო-ბლოკი --------------------------------- */}
        <section className="bg-white px-5 pb-16 sm:pb-24 lg:px-8">
          <Reveal className="group relative mx-auto flex min-h-[440px] max-w-7xl items-end overflow-hidden rounded-4xl bg-ink sm:min-h-[520px] sm:rounded-5xl">
            <Image
              src="/img/breakdown.jpg"
              alt={d.breakdown.imgAlt}
              fill
              sizes="100vw"
              className="object-cover object-[center_38%] transition duration-[1.4s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent sm:bg-gradient-to-r sm:from-ink/90 sm:via-ink/45 sm:to-transparent" />

            <div className="relative w-full p-8 sm:max-w-lg sm:p-12 lg:p-14">
              <h2 className="headline tt text-3xl font-black text-white sm:text-4xl">
                {d.breakdown.title}
              </h2>
              <CallButton big className="mt-7" />
            </div>
          </Reveal>
        </section>

        {/* --------------------------------- დაფარვა --------------------------------- */}
        <section id="coverage" className="scroll-mt-24 bg-white px-5 py-16 pt-24 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-xl text-center">
              <Eyebrow>{d.coverage.eyebrow}</Eyebrow>
              <h2 className="headline tt text-3xl font-black sm:text-5xl">
                {d.coverage.title1} <span className="text-brand">{d.coverage.title2}</span>
              </h2>
              <p className="mt-4 text-[15px] text-ink/55">
                {d.coverage.lead}
              </p>
            </Reveal>

            <div className="mt-14">
              <GeorgiaMap cities={d.coverage.cities} mapAlt={d.coverage.mapAlt} />
            </div>

          </div>
        </section>

        {/* ---------------------------------- ფასები ---------------------------------- */}
        <section id="prices" className="scroll-mt-24 bg-cream px-5 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-xl text-center">
              <Eyebrow>{d.prices.eyebrow}</Eyebrow>
              <h2 className="headline tt text-3xl font-black sm:text-5xl">
                {d.prices.title1} <span className="text-brand">{d.prices.title2}</span> {d.prices.title3}
              </h2>
              <p className="mt-4 text-[15px] text-ink/55">
                {d.prices.lead}
              </p>
            </Reveal>

            <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
              {d.prices.items.map((t, i) => {
                const featured = i === 1;
                return (
                <Reveal
                  as="article"
                  key={t.name}
                  delay={i * 130}
                  className={`hover-lift relative flex flex-col rounded-4xl p-8 ${
                    featured
                      ? "bg-ink text-white shadow-2xl shadow-ink/20 lg:-my-3 lg:py-11"
                      : "border border-ink/10 bg-white hover:shadow-lg hover:shadow-ink/5"
                  }`}
                >
                  <h3 className="text-xl font-extrabold">{t.name}</h3>

                  <p className="mt-5 flex items-baseline gap-1.5">
                    <span className="headline text-5xl font-black">{PRICE_VALUES[i]}</span>
                    <span className={`text-sm font-bold ${featured ? "text-white/50" : "text-ink/45"}`}>
                      {d.prices.unit}
                    </span>
                  </p>

                  <p className={`mt-4 flex-1 text-sm leading-relaxed ${featured ? "text-white/60" : "text-ink/55"}`}>
                    {t.text}
                  </p>

                  <a
                    href={HREF}
                    className={`group tt mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-extrabold transition duration-300 ${
                      featured
                        ? "bg-brand text-white hover:bg-[#d95614]"
                        : "border border-ink/15 hover:border-brand hover:text-brand"
                    }`}
                  >
                    <Phone className="size-4 transition group-hover:rotate-[18deg]" strokeWidth={2.4} />
                    {d.prices.cta}
                  </a>
                </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ----------------------------------- FAQ ----------------------------------- */}
        <section id="faq" className="scroll-mt-24 bg-white px-5 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_1.4fr] lg:gap-20">
            <Reveal>
              <Eyebrow>{d.faq.eyebrow}</Eyebrow>
              <h2 className="headline tt text-3xl font-black sm:text-4xl">{d.faq.title}</h2>
              <CallButton className="mt-6" />
            </Reveal>

            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {d.faq.items.map((f, i) => (
                <Reveal key={f.q} delay={i * 70}>
                  <details className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-bold transition hover:text-brand sm:text-base">
                      {f.q}
                      <ChevronDown className="size-5 shrink-0 text-ink/35 transition duration-300 group-open:rotate-180 group-open:text-brand" />
                    </summary>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/60">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------- CTA ----------------------------------- */}
        <section className="px-5 pb-16 lg:px-8">
          <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-brand px-6 py-16 text-center sm:rounded-5xl sm:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)", backgroundSize: "22px 22px" }}
              aria-hidden
            />
            <div className="relative">
              <h2 className="headline tt mx-auto max-w-xl text-3xl font-black text-white sm:text-5xl">
                {d.cta.title}
              </h2>
              <a
                href={HREF}
                className="group relative mt-9 inline-flex items-center gap-3 tt rounded-full bg-white px-8 py-5 text-xl font-black text-ink shadow-2xl transition duration-300 hover:scale-[1.03] sm:text-2xl"
              >
                <span className="absolute inset-0 rounded-full bg-white/50 animate-pulse-ring" aria-hidden />
                <Phone className="relative size-6 text-brand transition group-hover:rotate-[18deg]" strokeWidth={2.4} />
                <span className="relative">{TEL_DISPLAY}</span>
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ---------------------------------- ფუტერი ---------------------------------- */}
      <footer className="bg-ink px-5 pt-16 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid size-14 place-items-center rounded-full bg-white p-1 shadow-lg shadow-black/20">
                  <Image src="/img/logo-v2.png" alt="ევაკუატორი" width={56} height={56} className="size-full" />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="text-lg font-extrabold">ევაკუატორი</span>
                  <span className="mt-1 text-[11px] font-bold tracking-[0.08em] text-brand-soft">
                    gadavikvanot.ge
                  </span>
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
                {d.footer.tagline}
              </p>
              <a href={HREF} className="mt-5 inline-block text-2xl font-black tracking-tight transition hover:text-brand-soft">
                {TEL_DISPLAY}
              </a>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">{d.footer.servicesTitle}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                {d.footer.services.map((t) => (
                  <li key={t}><a href="#services" className="transition hover:text-white">{t}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">{d.footer.contactTitle}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                <li className="flex items-center gap-2"><MapPin className="size-4 shrink-0" /> {d.footer.location}</li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0" />
                  <a href={HREF} className="transition hover:text-white">+995 {TEL_DISPLAY}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs text-white/40 sm:flex-row">
            <p>© {new Date().getFullYear()} ევაკუატორი · gadavikvanot.ge</p>
            <p>{d.footer.callLabel} <a href={HREF} className="font-bold text-white/70 transition hover:text-white">{TEL_DISPLAY}</a></p>
          </div>
        </div>
      </footer>

      {/* ------------------------ მობილური — მიმაგრებული ზარი ------------------------ */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-white/90 p-3 backdrop-blur-xl sm:hidden">
        <a href={HREF} className="tt flex items-center justify-center gap-2.5 rounded-full bg-brand py-4 text-lg font-black text-white shadow-lg shadow-brand/30">
          <Phone className="size-5" strokeWidth={2.4} />
          {TEL_DISPLAY}
        </a>
      </div>
      <div className="h-20 sm:hidden" aria-hidden />
    </>
  );
}
