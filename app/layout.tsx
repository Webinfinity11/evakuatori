import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";

/** ძირითადი ფონტი — FiraGO (მხედრული + ლათინური), თავად ვმასპინძლობთ. */
const firago = localFont({
  src: [
    { path: "./fonts/FiraGO-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/FiraGO-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/FiraGO-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/FiraGO-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/FiraGO-800.woff2", weight: "800", style: "normal" },
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

export const metadata: Metadata = {
  title: "ევაკუატორი 24/7 — გამოძახება თბილისში და მთელ საქართველოში | 568 120 120",
  description:
    "ევაკუატორის გამოძახება თბილისსა და საქართველოს რეგიონებში. სტანდარტული, ობობა და ავარიული ევაკუატორი. ფასს ზარის დროს შეგითანხმებთ. დარეკეთ: 568 120 120",
  keywords: [
    "ევაკუატორი", "ევაკუატორი თბილისი", "ევაკუატორი გამოძახებით",
    "ობობა ევაკუატორი", "ავტოდახმარება", "ევაკუატორი 24/7",
  ],
  openGraph: {
    title: "ევაკუატორი 24/7 — 568 120 120",
    description: "ევაკუატორის გამოძახება თბილისსა და რეგიონებში. ფასს ზარის დროს შეგითანხმებთ.",
    locale: "ka_GE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ee6320",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={`${firago.variable} ${notoGeorgian.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
