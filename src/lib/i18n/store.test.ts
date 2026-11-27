import { beforeEach, describe, expect, it } from "vitest";
import {
  createI18nStore,
  isValidLocale,
  LOCALE_STORAGE_KEY,
} from "./store.svelte";
import { translations } from "./translations";

function collectStrings(value: unknown, path = ""): Array<{ path: string; text: string }> {
  if (typeof value === "string") {
    return [{ path, text: value }];
  }
  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => collectStrings(entry, `${path}[${index}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      collectStrings(child, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

describe("i18n store and bilingual dictionary", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "";
    document.title = "";
  });

  it("defaults to Spanish (es) and syncs html lang attribute", () => {
    const store = createI18nStore();
    expect(store.locale).toBe("es");
    expect(store.t.nav.watchKick).toBe("Ver en Kick");
    expect(document.documentElement.lang).toBe("es");
  });

  it("switches between ES and EN, persists to localStorage, and updates html lang", () => {
    const store = createI18nStore();

    store.setLocale("en");
    expect(store.locale).toBe("en");
    expect(store.t.nav.watchKick).toBe("Watch on Kick");
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("en");
    expect(document.documentElement.lang).toBe("en");

    store.toggle();
    expect(store.locale).toBe("es");
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("es");
    expect(document.documentElement.lang).toBe("es");
  });

  it("hydrates from localStorage and ignores invalid saved values", () => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, "en");
    const hydrated = createI18nStore();
    expect(hydrated.locale).toBe("en");

    window.localStorage.setItem(LOCALE_STORAGE_KEY, "pt");
    const fallback = createI18nStore();
    expect(fallback.locale).toBe("es");
    expect(isValidLocale("es")).toBe(true);
    expect(isValidLocale("en")).toBe(true);
    expect(isValidLocale("fr")).toBe(false);
  });

  it("contains matching non-empty ES and EN strings with zero em dashes", () => {
    const esEntries = collectStrings(translations.es);
    const enEntries = collectStrings(translations.en);

    expect(esEntries.map((item) => item.path)).toEqual(enEntries.map((item) => item.path));

    for (const entry of [...esEntries, ...enEntries]) {
      expect(entry.text.trim().length, `empty string at ${entry.path}`).toBeGreaterThan(0);
      expect(entry.text.includes("\u2014"), `em dash found at ${entry.path}`).toBe(false);
    }
  });
});
