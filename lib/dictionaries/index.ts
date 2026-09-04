import type { Locale } from "../i18n";
import ka, { type Dict } from "./ka";
import en from "./en";
import ru from "./ru";

const DICTS: Record<Locale, Dict> = { ka, en, ru };

export function getDictionary(locale: Locale): Dict {
  return DICTS[locale];
}

export type { Dict };
