//These are temporary values, they will be replaced by the actual values from the design system

const COLOR_COMBINATIONS = [
  {
    title: "Lys blå primær, sort sekundær",
    value: "blueBlack",
    theme: "day",
  },
  {
    title: "Lys orange primær, blå sekundær",
    value: "peachBlue",
    theme: "day",
  },
  {
    title: "Kremhvit primær, blå sekundær",
    value: "creamBlue",
    theme: "day",
  },
  {
    title: "Mørk lilla primær, hvit sekundær",
    value: "purpleWhite",
    theme: "night",
  },
  {
    title: "Mørk blå primær, gul sekundær",
    value: "blueYellow",
    theme: "night",
  },
];

export const colorCombinations = {
  name: "colorCombinations",
  title: "Fargekombinasjon",
  type: "string",
  options: {
    list: COLOR_COMBINATIONS.map(({ title, value }) => ({ title, value })),
    layout: "radio",
    default: COLOR_COMBINATIONS[0].value,
  },
};
