import { stegaClean } from "@sanity/client/stega";

export function getBackgroundColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "blueBlack":
      return "bg-blueBlack-primary";
    case "peachBlue":
      return "bg-peachBlue-primary";
    case "purpleWhite":
      return "bg-purpleWhite-primary";
    case "blueYellow":
      return "bg-blueYellow-primary";
    case "creamBlue":
      return "bg-creamBlue-primary";
    default:
      return "bg-white";
  }
}

export function getPrimaryBorderColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "blueBlack":
      return "border-blueBlack-primary";
    case "peachBlue":
      return "border-peachBlue-primary";
    case "purpleWhite":
      return "border-purpleWhite-primary";
    case "blueYellow":
      return "border-blueYellow-primary";
    case "creamBlue":
      return "border-creamBlue-primary";
    default:
      return "border-white";
  }
}

export function getPrimaryTextColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "blueBlack":
      return "text-blueBlack-primary";
    case "peachBlue":
      return "text-peachBlue-primary";
    case "purpleWhite":
      return "text-purpleWhite-primary";
    case "blueYellow":
      return "text-blueYellow-primary";
    case "creamBlue":
      return "text-creamBlue-primary";
    default:
      return "text-white";
  }
}

export function getSecondaryBackgroundColor(
  colorCombination: string | undefined
) {
  switch (colorCombination) {
    case "blueBlack":
      return "bg-blueBlack-secondary";
    case "peachBlue":
      return "bg-peachBlue-secondary";
    case "purpleWhite":
      return "bg-purpleWhite-secondary";
    case "blueYellow":
      return "bg-blueYellow-secondary";
    case "creamBlue":
      return "bg-creamBlue-secondary";
    default:
      return "bg-white";
  }
}
export function getSecondaryBorderColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "blueBlack":
      return "border-blueBlack-secondary";
    case "peachBlue":
      return "border-peachBlue-secondary";
    case "purpleWhite":
      return "border-purpleWhite-secondary";
    case "blueYellow":
      return "border-blueYellow-secondary";
    case "creamBlue":
      return "border-creamBlue-secondary";
    default:
      return "border-white";
  }
}

export function getTextColor(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "blueBlack":
      return "text-black";
    case "peachBlue":
      return "text-black";
    case "purpleWhite":
      return "text-white";
    case "blueYellow":
      return "text-white";
    case "creamBlue":
      return "text-black";
    default:
      return "text-black";
  }
}

export function getTextColorBorder(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "blueBlack":
      return "border-black";
    case "peachBlue":
      return "border-black";
    case "purpleWhite":
      return "border-white";
    case "blueYellow":
      return "border-white";
    case "creamBlue":
      return "border-black";
    default:
      return "border-black";
  }
}

export function getPortabletextStyle(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "blueBlack":
      return " text-black";
    case "peachBlue":
      return "text-black";
    case "purpleWhite":
      return "prose-h2:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white prose-h5:text-white prose-h6:text-white prose-strong:text-white text-white";
    case "blueYellow":
      return "prose-h2:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white prose-h5:text-white prose-h6:text-white prose-strong:text-white text-white ";
    case "creamBlue":
      return "text-black";
    default:
      return " text-black";
  }
}

export function getQuoteStyle(colorCombination: string | undefined) {
  switch (colorCombination) {
    case "blueBlack":
      return {
        styleBlock:
          "border-none grid grid-flow-row place-items-center text-center text-black",
        styleLink: "not-italic text-black",
        fillColor: "#000000",
      };
    case "peachBlue":
      return {
        styleBlock:
          "border-none grid grid-flow-row place-items-center text-center text-black",
        styleLink: "not-italic text-black",
        fillColor: "#000000",
      };
    case "purpleWhite":
      return {
        styleBlock:
          "border-none grid grid-flow-row place-items-center text-center text-white",
        styleLink: "not-italic text-white",
        fillColor: "#FFFFFF",
      };
    case "blueYellow":
      return {
        styleBlock:
          "border-none grid grid-flow-row place-items-center text-center text-white",
        styleLink: "not-italic text-white",
        fillColor: "#FFFFFF",
      };
    case "creamBlue":
      return {
        styleBlock:
          "border-none grid grid-flow-row place-items-center text-center text-black",
        styleLink: "not-italic text-black",
        fillColor: "#000000",
      };
    default:
      return {
        styleBlock:
          "border-none grid grid-flow-row place-items-center text-center text-black",
        styleLink: "not-italic text-black",
        fillColor: "#000000",
      };
  }
}

export function getColor(colorCombination: string | undefined) {
  const cleanColorCombination = stegaClean(colorCombination);
  const quoteStyle = getQuoteStyle(cleanColorCombination);
  return {
    bgColor: getBackgroundColor(cleanColorCombination),
    primaryBorder: getPrimaryBorderColor(cleanColorCombination),
    primaryText: getPrimaryTextColor(cleanColorCombination),
    secondaryBgColor: getSecondaryBackgroundColor(cleanColorCombination),
    secondaryBorder: getSecondaryBorderColor(cleanColorCombination),
    textColor: getTextColor(cleanColorCombination),
    textColorBorder: getTextColorBorder(cleanColorCombination),
    portabletextStyle: getPortabletextStyle(cleanColorCombination),
    quoteStyle,
  };
}
