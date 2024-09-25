import { stegaClean } from "@sanity/client/stega";
import { colorCombinations } from "cms/schemaTypes/objects/colorCombination";

export const ColorCombinations = {
  blueBlack: {
    background: "bg-blueBlack-primary",
    primaryBorderColor: "border-blueBlack-primary",
    primaryTextColor: "text-blueBlack-primary",
    secondaryBackgroundColor: "bg-blueBlack-secondary",
    secondaryBorderColor: "border-blueBlack-secondary",
    textColor: "text-black",
    textBorderColor: "border-black",
    portableTextStyle: "text-black",
  },
  peachBlue: {
    background: "bg-peachBlue-primary",
    primaryBorderColor: "border-peachBlue-primary",
    primaryTextColor: "text-peachBlue-primary",
    secondaryBackgroundColor: "bg-peachBlue-secondary",
    secondaryBorderColor: "border-peachBlue-secondary",
    textColor: "text-black",
    textBorderColor: "border-black",
    portableTextStyle: "text-black",
  },
  purpleWhite: {
    background: "bg-purpleWhite-primary",
    primaryBorderColor: "border-purpleWhite-primary",
    primaryTextColor: "text-purpleWhite-primary",
    secondaryBackgroundColor: "bg-purpleWhite-secondary",
    secondaryBorderColor: "border-purpleWhite-secondary",
    textColor: "text-white",
    textBorderColor: "border-white",
    portableTextStyle: "text-white",
  },
  blueYellow: {
    background: "bg-blueYellow-primary",
    primaryBorderColor: "border-blueYellow-primary",
    primaryTextColor: "text-blueYellow-primary",
    secondaryBackgroundColor: "bg-blueYellow-secondary",
    secondaryBorderColor: "border-blueYellow-secondary",
    textColor: "text-white",
    textBorderColor: "border-white",
    portableTextStyle: "text-white",
  },
  creamBlue: {
    background: "bg-creamBlue-primary",
    primaryBorderColor: "border-creamBlue-primar",
    primaryTextColor: "text-creamBlue-primary",
    secondaryBackgroundColor: "bg-creamBlue-secondary",
    secondaryBorderColor: "border-creamBlue-secondary",
    textColor: "text-black",
    textBorderColor: "border-black",
    portableTextStyle: "text-black",
  },
};

export function getColor(colorCombination: colorCombinations = "blueBlack") {
  const cleanColorCombination = stegaClean(colorCombination);
  const colorCombo = ColorCombinations[cleanColorCombination];

  return {
    bgColor: colorCombo?.background,
    primaryBorder: colorCombo?.primaryBorderColor,
    primaryText: colorCombo?.primaryTextColor,
    secondaryBgColor: colorCombo?.secondaryBackgroundColor,
    secondaryBorder: colorCombo?.secondaryBorderColor,
    textColor: colorCombo?.textColor,
    textColorBorder: colorCombo?.textBorderColor,
    portableTextStyle: colorCombo?.portableTextStyle,
  };
}
