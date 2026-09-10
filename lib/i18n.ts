export const LOCALES = ["ka", "en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ka";

/** Set only when the visitor explicitly chooses a language. */
export const LOCALE_COOKIE = "locale-preference";

export const LOCALE_NAMES: Record<Locale, string> = {
  ka: "ქართული",
  en: "English",
  ru: "Русский",
};

export const LOCALE_SHORT: Record<Locale, string> = { ka: "KA", en: "EN", ru: "RU" };

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}
