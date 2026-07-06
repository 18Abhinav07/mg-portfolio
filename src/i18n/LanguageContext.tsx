/**
 * Language provider. Hindi is the default; choice persists in localStorage.
 * Components consume `useLanguage()` and read `t` (the localized content
 * tree for the active language) plus `lang`, `setLang`, and `toggle`.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations, type Lang, type Translation } from './translations';

const STORAGE_KEY = 'mg_lang';

interface LanguageValue {
  lang: Lang;
  t: Translation;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageValue | null>(null);

function readStoredLang(): Lang {
  if (typeof window === 'undefined') return 'hi';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'en' ? 'en' : 'hi';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(() => setLangState((prev) => (prev === 'hi' ? 'en' : 'hi')), []);

  const value = useMemo<LanguageValue>(
    () => ({ lang, t: translations[lang], setLang, toggle }),
    [lang, setLang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
