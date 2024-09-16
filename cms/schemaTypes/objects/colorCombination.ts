//These are temporary values, they will be replaced by the actual values from the design system

const COLOR_COMBINATIONS = [
  {
    title: "Lys blå primær, sort sekundær",
    value: "blueBlack",
  },
  {
    title: "Lys orange primær, blå sekundær",
    value: "peachBlue",
  },
  {
    title: "Kremhvit primær, blå sekundær",
    value: "creamBlue",
  },
  {
    title: "Mørk lilla primær, hvit sekundær",
    value: "purpleWhite",
  },
  {
    title: "Mørk blå primær, gul sekundær",
    value: "blueYellow",
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
