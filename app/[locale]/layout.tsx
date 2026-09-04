import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Noto_Sans_Georgian } from "next/font/google";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import "../globals.css";

const SITE = "https://evakuatori-production.up.railway.app";

/** ძირითადი ფონტი — FiraGO (მხედრული, ლათინური, კირილიცა), თავად ვმასპინძლობთ. */
const firago = localFont({
  src: [
    { path: "../fonts/FiraGO-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/FiraGO-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/FiraGO-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/FiraGO-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/FiraGO-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-firago",
  display: "swap",
});

/**
 * FiraGO 1.001-ს მთავრული (U+1C90–1CBF) არ გააჩნია, ამიტომ TT-სათაურებისა და
 * ღილაკებისთვის fallback-ად Noto Sans Georgian მოდის — მას სრული მთავრული აქვს.
 */
const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-ge",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);

  return {
    title: d.meta.title,
    description: d.meta.description,
    keywords: d.meta.keywords,
    alternates: {
      canonical: `${SITE}/${locale}`,
      languages: {
        ka: `${SITE}/ka`,
        en: `${SITE}/en`,
        ru: `${SITE}/ru`,
        "x-default": `${SITE}/en`,
      },
    },
    openGraph: {
      title: d.meta.ogTitle,
      description: d.meta.ogDescription,
      locale: locale === "ka" ? "ka_GE" : locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
      url: `${SITE}/${locale}`,
    },
  };
}

export const viewport: Viewport = { themeColor: "#ee6320" };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${firago.variable} ${notoGeorgian.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            // ანიმაციები მხოლოდ მაშინ, როცა გვერდი ხილულია. ფონურ ტაბში CSS
            // ანიმაცია არ მიდის და კონტენტი opacity:0-ზე გაიყინებოდა.
            __html: "if(!document.hidden)document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
