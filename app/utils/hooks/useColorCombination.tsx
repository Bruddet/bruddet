import { createContext, useContext, useState } from "react";
import { ColorCombinations } from "~/sanity.types";

interface ColorCombinationContextData {
  colorCombination: ColorCombinations;
  setColorCombination: (newColor: ColorCombinations) => void;
}

export const ColorCombinationContext = createContext<ColorCombinationContextData>(
  {
    colorCombination: "creamBlue",
    setColorCombination: () => {},
  }
);

export interface BackgroundColorProviderProps {
  children: React.ReactNode;
}

export function BackgroundColorProvider({
  children,
}: BackgroundColorProviderProps) {
  const [colorCombination, setColorCombination] = useState<ColorCombinations>("creamBlue");

  return (
    <ColorCombinationContext.Provider value={{ colorCombination, setColorCombination }}>
      {children}
    </ColorCombinationContext.Provider>
  );
}

export function useColorCombination() {
  return useContext(ColorCombinationContext);
}
