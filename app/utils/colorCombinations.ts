import { stegaClean } from "@sanity/client/stega";
import { colorCombinations } from "cms/schemaTypes/objects/colorCombination";

type Props = {
  colorCombination: string;
  styleProp: string;
};

export const Styles = ({ colorCombination, styleProp }: Props) => {
  const cleanColorCombination = stegaClean(colorCombination);
  switch (styleProp) {
    case "background":
      return `bg-${cleanColorCombination}-primary`;
    case "secondaryBackgroundColor":
      return `bg-${cleanColorCombination}-secondary`;
    case "primaryBorderColor":
      return `border-${cleanColorCombination}-primary`;
    case "secondaryBorderColor":
      return `border-${cleanColorCombination}-secondary`;
    case "textColor":
      return `text-${cleanColorCombination}-primary`;
    case "secondaryTextColor":
      return `text-${cleanColorCombination}-secondary`;
    case "textBorderColor":
      return `border-${cleanColorCombination}-secondary`;
    case "primaryButtonColor":
      return `bg-mainThemeColor`;
    default:
      return "black";
  }
};

export function getColor(colorCombination: colorCombinations = "creamBlue") {
  const cleanColorCombination = stegaClean(colorCombination);

  return {
    bgColor: stegaClean(
      Styles({
        colorCombination: cleanColorCombination,
        styleProp: "background",
      })
    ),
    primaryBorder: stegaClean(
      Styles({
        colorCombination: cleanColorCombination,
        styleProp: "primaryBorderColor",
      })
    ),
    primaryTextColor: stegaClean(
      Styles({
        colorCombination: cleanColorCombination,
        styleProp: "primaryTextColor",
      })
    ),
    secondaryTextColor: stegaClean(
      Styles({
        colorCombination: cleanColorCombination,
        styleProp: "secondaryTextColor",
      })
    ),
    secondaryBgColor: stegaClean(
      Styles({
        colorCombination: cleanColorCombination,
        styleProp: "secondaryBackgroundColor",
      })
    ),
    secondaryBorder: stegaClean(
      Styles({
        colorCombination: cleanColorCombination,
        styleProp: "secondaryBorderColor",
      })
    ),
    textBorderColor: stegaClean(
      Styles({
        colorCombination: cleanColorCombination,
        styleProp: "textBorderColor",
      })
    ),
    primaryButtonColor: stegaClean(
      Styles({
        colorCombination: cleanColorCombination,
        styleProp: "primaryButtonColor",
      })
    ),
  };
}
