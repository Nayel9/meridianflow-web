"use client";

import * as React from "react";
import { TRANSLATIONS } from "./translations";
import type { Lang, Translations } from "./types";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
};

const LangContext = React.createContext<LangContextValue | null>(null);

const STORAGE_KEY = "mf-lang";

function isLang(value: unknown): value is Lang {
  return value === "fr" || value === "en";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  // SSR-safe initial value: "fr" by default. Client effect hydrates from storage.
  const [lang, setLangState] = React.useState<Lang>("fr");

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isLang(saved) && saved !== lang) {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = next;
  }, []);

  const value = React.useMemo<LangContextValue>(
    () => ({ lang, setLang, t: TRANSLATIONS[lang] }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = React.useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}

export function useT() {
  return useLang().t;
}
