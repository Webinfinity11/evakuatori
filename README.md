# ევაკუატორი 24/7 — ლენდინგი

ერთგვერდიანი ლენდინგ ფეიჯი ევაკუატორის სერვისისთვის. მთლიანად ქართულად,
ზარზე ორიენტირებული — გვერდის ყველა CTA `tel:` ბმულზე მიდის.

**ტელეფონი:** 568 120 120

## სტეკი

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** — CSS-first კონფიგურაცია `app/globals.css`-ში
- **TypeScript**
- **lucide-react** — იკონები
- **FiraGO** — ძირითადი ფონტი, თვითმასპინძლობით (`app/fonts/`, ქართულ+ლათინურ
  დიაპაზონზე subset-ული woff2, 5 წონა ≈ 120KB)
- **Noto Sans Georgian** — მხოლოდ მთავრულისთვის (FiraGO-ს U+1C90–1CBF ბლოკი
  არ გააჩნია, ამიტომ TT-სათაურები და ღილაკები მასზე ეშვება)

## გაშვება

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # პროდაქშენ ბილდი
```

## სტრუქტურა

```
app/
  layout.tsx        ფონტები, metadata, js-კლასი ანიმაციებისთვის
  page.tsx          მთელი გვერდი — ტექსტები და მონაცემები ფაილის თავშია
  globals.css       დიზაინ-ტოკენები, keyframes, ანიმაციების უტილიტები
  icon.png          favicon
  fonts/            FiraGO woff2 (400–800)
components/
  SiteHeader.tsx    სტიკი ჰედერი, სქროლზე იკუმშება
  GeorgiaMap.tsx    საქართველოს რუკა (Natural Earth 50m გეომეტრია) + ქალაქები
  Reveal.tsx        სქროლზე გამოჩენა (IntersectionObserver)
  CountUp.tsx       ციფრების ანიმაცია
  Marquee.tsx       მოძრავი ზოლი სერვისებით
public/img/         ფოტოები და ლოგო
assets/             ორიგინალები (დაუმუშავებელი)
```

## რისი შეცვლა დაგჭირდებათ

| რა | სად |
|---|---|
| ტელეფონის ნომერი | `app/page.tsx` → `TEL`, `TEL_DISPLAY` |
| ტარიფები | `app/page.tsx` → `TARIFFS` |
| ციფრები (21 ევაკუატორი და ა.შ.) | `app/page.tsx` → `HERO_STATS` და დაფარვის სექცია |
| სერვისების ფოტოები | `public/img/service-*.jpg` |
| ქალაქები და მისვლის დრო | `components/GeorgiaMap.tsx` → `CITIES` |

## ლიცენზიები

FiraGO — SIL Open Font License 1.1 ([bBoxType/FiraGO](https://github.com/bBoxType/FiraGO)).
სერვისების ბარათების ფოტოები — Pexels. ევაკუატორისა და ლოგოს გამოსახულებები — დამკვეთის.
