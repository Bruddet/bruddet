import { stegaClean } from "@sanity/client/stega";
import { colorCombinations } from "cms/schemaTypes/objects/colorCombination";

type Props = {
  colorCombination: string;
  styleProp: string;
};

export const Styles = ({ colorCombination, styleProp }: Props) => {
  //console.log(`Generated class: bg-${colorCombination}-primary`);
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
