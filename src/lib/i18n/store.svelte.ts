import { getContext, setContext } from "svelte";
import { translations, type Locale, type Translations } from "./translations";

export const LOCALE_STORAGE_KEY = "feeden-locale";

const I18N_CONTEXT_KEY = Symbol("feeden-i18n");

export function isValidLocale(value: unknown): value is Locale {
  return value === "es" || value === "en";
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") {
    return "es";
  }
  try {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isValidLocale(saved)) {
      return saved;
    }
  } catch {
    return "es";
  }
  return "es";
}

function writeStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    return;
  }
}

function syncDocumentMetadata(locale: Locale): void {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.lang = locale;
  const copy = translations[locale];
  document.title = copy.meta.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) {
    desc.setAttribute("content", copy.meta.description);
  }
}

export class I18nStore {
  locale = $state<Locale>("es");
  t = $derived<Translations>(translations[this.locale]);

  constructor(initialLocale?: Locale) {
    const resolved = initialLocale ?? readStoredLocale();
    this.locale = resolved;
    syncDocumentMetadata(resolved);
  }

  setLocale = (next: Locale): void => {
    if (!isValidLocale(next)) {
      return;
    }
    this.locale = next;
    writeStoredLocale(next);
    syncDocumentMetadata(next);
  };

  toggle = (): void => {
    this.setLocale(this.locale === "es" ? "en" : "es");
  };
}

export function createI18nStore(initialLocale?: Locale): I18nStore {
  return new I18nStore(initialLocale);
}

export function setI18n(store: I18nStore): I18nStore {
  return setContext(I18N_CONTEXT_KEY, store);
}

export function getI18n(): I18nStore {
  return getContext<I18nStore>(I18N_CONTEXT_KEY);
}
