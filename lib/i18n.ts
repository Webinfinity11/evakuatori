export const LOCALES = ["ka", "en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ka";

/** ქვეყნის კოდი -> ლოკალი. საქართველო ქართულზე, დანარჩენი რუსულენოვანი — რუსულზე. */
export const COUNTRY_LOCALE: Record<string, Locale> = {
  GE: "ka",
  RU: "ru", BY: "ru", KZ: "ru", KG: "ru", TJ: "ru", UZ: "ru", AM: "ru", AZ: "ru", MD: "ru",
};

export const LOCALE_NAMES: Record<Locale, string> = {
  ka: "ქართული",
  en: "English",
  ru: "Русский",
};

export const LOCALE_SHORT: Record<Locale, string> = { ka: "KA", en: "EN", ru: "RU" };

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}
