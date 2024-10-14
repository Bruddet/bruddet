const colorsWithVariants = {
  blueBlack: {
    primary: "#B6E3FD",
    secondary: "#000000",
  },
  peachBlue: {
    primary: "#FFD3CE",
    secondary: "#350E94",
  },
  creamBlue: {
    primary: "#FFF8E8",
    secondary: "#182E39",
  },
  purpleWhite: {
    primary: "#556090",
    secondary: "#FFFFFF",
  },
  blueYellow: {
    primary: "#182E39",
    secondary: "#D4FF26",
  },
};

const styleProps = [
  "background",
  "secondaryBackgroundColor",
  "primaryBorderColor",
  "secondaryBorderColor",
  "textColor",
  "secondaryTextColor",
  "textBorderColor",
];

/* 
COLOR-GENERATING IN TAILWIND
You can't use dynamic class naming like bg-${color} in Tailwind out of the box.
When Tailwind compiles the CSS, it checks the code for a class name that matches, but it will only find classes that exist
as a complete unbruken string in the source files. Tailwind can't find the dynamic classes at runtime since it does not yet exist.
As a workaround, to avoid having to write out all possible combinations in strings with functions and if-sentences (which was done at first, and 
required lots of code each time a new color-combination was added), we use the Safelist below, where we generate the possible combinations of 
colorsWithVariants and StyleProps so that Tailwind can find them when compiling.
*/

export const Styles = ({ colorCombination, styleProp }) => {
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

const colors = {
  ...colorsWithVariants,
  strongblue: "#59A1B6",
  mossDark: "#182D39",
  nightBlue: "#2A4F65",
  lightblue: "#83D2FF",
  beige: "#FFF8E8",
  mainThemeColor: "#D4FF26",
  acidGreen: "#DEFF5C",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      serif: ["PT Serif"],
      sans: ["calibri"],
    },
    extend: {
      animation: {
        "horizontal-bounce-left":
          "horizontal-bounce-left ease-in-out 1s infinite",
        "horizontal-bounce-right":
          "horizontal-bounce-right ease-in-out 1s infinite",
      },
      keyframes: {
        "horizontal-bounce-left": {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(-20px)",
          },
        },
        "horizontal-bounce-right": {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(20px)",
          },
        },
      },
      height: {
        "screen-vh": "calc(var(--vh, 1vh) * 100)",
      },
      colors: colors,
      animation: {
        marquee: "marquee 120s linear infinite",
        marquee2: "marquee2 120s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  safelist: [
    ...Object.keys(colorsWithVariants)
      .map((colorName) => {
        return styleProps.map((propName) =>
          Styles({ colorCombination: colorName, styleProp: propName })
        );
      })
      .flat(),
  ],
  plugins: [require("@tailwindcss/typography")],
};
