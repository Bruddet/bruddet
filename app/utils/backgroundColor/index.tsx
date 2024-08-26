import { createContext, useContext, useState, useEffect } from "react";

interface BackgroundColorContextData {
  color: string;
  setColor: (newColor: string) => void;
}

export const BackgroundColorContext = createContext<BackgroundColorContextData>(
  {
    color: "bg-white",
    setColor: () => {},
  }
);

export interface BackgroundColorProviderProps {
  children: React.ReactNode;
}

export function BackgroundColorProvider({
  children,
}: BackgroundColorProviderProps) {
  const [color, setColor] = useState<string>("bg-strongblue");

  useEffect(() => {
    document.body.className =
      color + " overlow-x-hidden relative min-h-[100vh] flex flex-col grow";
  }, [color]);

  return (
    <BackgroundColorContext.Provider value={{ color, setColor }}>
      {children}
    </BackgroundColorContext.Provider>
  );
}

export function useBackgroundColor() {
  return useContext(BackgroundColorContext);
}
