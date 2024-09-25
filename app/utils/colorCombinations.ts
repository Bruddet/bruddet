import { stegaClean } from "@sanity/client/stega";
import { colorCombinations } from "cms/schemaTypes/objects/colorCombination";

type Props = {
  colorCombination: string;
  styleProp: string;
};

export const Styles = ({ colorCombination, styleProp }: Props) => {
  switch (styleProp) {
    case "background":
      return `bg-${colorCombination}-primary`;
    case "secondaryBackgroundColor":
      return `bg-${colorCombination}-secondary`;
    case "primaryBorderColor":
      return `border-${colorCombination}-primary`;
    case "secondaryBorderColor":
      return `border-${colorCombination}-secondary`;
    case "textColor":
      return `text-${colorCombination}-primary`;
    case "secondaryTextColor":
      return `text-${colorCombination}-secondary`;
    case "textBorderColor":
      return `border-${colorCombination}-secondary`;
    case "primaryButtonColor":
      return `bg-mainThemeColor`;
    default:
      return "black";
  }
};

export function getColor(colorCombination: colorCombinations = "creamBlue") {
  const cleanColorCombination = stegaClean(colorCombination);

  return {
    bgColor: Styles({
      colorCombination: cleanColorCombination,
      styleProp: "background",
    }),
    primaryBorder: Styles({
      colorCombination: cleanColorCombination,
      styleProp: "primaryBorderColor",
    }),
    primaryTextColor: Styles({
      colorCombination: cleanColorCombination,
      styleProp: "primaryTextColor",
    }),
    secondaryTextColor: Styles({
      colorCombination: cleanColorCombination,
      styleProp: "secondaryTextColor",
    }),
    secondaryBgColor: Styles({
      colorCombination: cleanColorCombination,
      styleProp: "secondaryBackgroundColor",
    }),
    secondaryBorder: Styles({
      colorCombination: cleanColorCombination,
      styleProp: "secondaryBorderColor",
    }),
    textBorderColor: Styles({
      colorCombination: cleanColorCombination,
      styleProp: "textBorderColor",
    }),
    primaryButtonColor: Styles({
      colorCombination: cleanColorCombination,
      styleProp: "primaryButtonColor",
    }),
  };
}
