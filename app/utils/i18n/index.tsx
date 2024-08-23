//Inspired by @vygruppen/spor-react i18n package

import { useLocation } from "@remix-run/react";
import React, { createContext } from "react";

export enum Language {
  NorwegianBokmal = "nb",
  English = "en",
}

export type TranslationObject = {
  [key in Language]: string | React.ReactElement;
};
type TranslationFunction = (
  ...args: Array<string | number>
) => TranslationObject;

type Translation = TranslationObject | TranslationFunction;
export type Translations = {
  [key: string]: Translation | Translations;
};

const LanguageContext = createContext<Language | undefined>(undefined);
type LanguageProviderProps = {
  language: Language;
  children: React.ReactElement;
};
/**
 * A language provider component.
 *
 * This component should wrap your entire application. It will provide the language to all components that use it.
 *
 */
export function LanguageProvider({
  language,
  children,
}: LanguageProviderProps) {
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Gets the language from the language context.
 *
 * @internal
 */
function useLanguage() {
  const language = getLanguageFromPath(useLocation().pathname);
  if (!language) {
    throw new Error("Please wrap your application in a LanguageProvider");
  }
  return language;
}

/**
 * A hook that returns translation utilities. Typically used to translate text.
 *
 * ```tsx
 * const Example = () => {
 *   const { t } = useTranslation();
 *   return <p>{t(texts.greeting)}</p>;
 * }
 * const texts = {
 *   greeting: {
 *     nb: "Hei",
 *     en: "Hello",
 *   }
 * }
 * ```
 *
 * You can also use it to fetch the current language:
 *
 * ```tsx
 * const Example = () => {
 *   const { language } = useTranslation();
 *   return <p>{language}</p>;
 * };
 * ```
 */
export function useTranslation() {
  const language = useLanguage();
  const t = (text: TranslationObject) => {
    return text[language] as string;
  };
  return { t, language } as const;
}

/** Utility function that creates type safe text objects with useTranslation
 *
 * ```tsx
 * const texts = createTexts({
 *  example: {
 *   nb: "Eksempel",
 *   en: "Example",
 *  },
 *  another: {
 *    example: {
 *      nb: <strong>Eksempel</strong>,
 *      en: <strong>Example</strong>,
 *    }
 *  }
 * })
 * ```
 */
export function createTexts<T extends Translations>(texts: T) {
  return texts;
}

export const getLanguageFromPath = (path: string) => {
  try {
    if (path.startsWith("/en/") || path === "/en") {
      return Language.English;
    }
    return Language.NorwegianBokmal;
  } catch {
    return Language.NorwegianBokmal;
  }
};
