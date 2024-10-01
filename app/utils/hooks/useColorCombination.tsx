import { createContext, useContext, useState, useEffect } from "react";
import { getColor } from "../colorCombinations";
import { ColorCombinations } from "~/sanity.types";

interface ColorCombinationContextData {
  colorCombination: ColorCombinations;
  setColorCombination: (colorCombination: ColorCombinations) => void;
}

export const ColorCombinationContext =
  createContext<ColorCombinationContextData>({
    colorCombination: "creamBlue",
    setColorCombination: () => {},
  });

export interface ColorCombinationProviderProps {
  children: React.ReactNode;
}

export function ColorCombinationProvider({
  children,
}: ColorCombinationProviderProps) {
  const [colorCombination, setColorCombination] =
    useState<ColorCombinations>("creamBlue");
  const bgColor = getColor(colorCombination).bgColor;

  console.log("bgcolor", bgColor);
  useEffect(() => {
    document.body.className = `${bgColor} overlow-x-hidden relative min-h-[100vh] flex flex-col grow"`;
  }, [bgColor]);

  return (
    <ColorCombinationContext.Provider
      value={{ colorCombination, setColorCombination }}
    >
      {children}
    </ColorCombinationContext.Provider>
  );
}

export function useColorCombination() {
  return useContext(ColorCombinationContext);
}
