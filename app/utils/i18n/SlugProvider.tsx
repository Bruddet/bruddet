import { createContext, useContext, useState } from "react";

interface SlugContextData {
  slug: string | undefined;
  setSlug: (language: string, translations: (Translation | null)[]) => void;
}

interface Slug {
  current: string;
  _type: string;
}

interface Translation {
  slug: Slug | null;
  language: string | null;
}

export const SlugContext = createContext<SlugContextData>({
  slug: undefined,
  setSlug: () => {},
});

export interface SlugProviderProps {
  children: React.ReactNode;
}

function slugSelector(
  language: string,
  translations: (Translation | null)[]
): string | undefined {
  const altSlug = translations.find(
    (item) => item && item.language !== language
  );

  return altSlug?.slug?.current ?? undefined;
}

export function SlugProvider({ children }: SlugProviderProps) {
  const [slug, setSlugState] = useState<string | undefined>(undefined);

  const setSlug = (language: string, _translations: (Translation | null)[]) => {
    const newSlug = slugSelector(language, _translations);
    setSlugState(newSlug ?? "");
  };

  return (
    <SlugContext.Provider value={{ slug, setSlug }}>
      {children}
    </SlugContext.Provider>
  );
}

export function useSlugContext() {
  return useContext(SlugContext);
}
