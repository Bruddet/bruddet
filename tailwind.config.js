/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      serif: ['"PT Serif"'],
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
      colors: {
        dayThemeBlueBlack: {
          primary: "#B6E3FD",
          secondary: "#000000",
        },
        dayThemePeachBlue: {
          primary: "#FFD3CE",
          secondary: "#350E94",
        },
        dayThemeCreamBlue: {
          primary: "#FFF8E8",
          secondary: "#182E39",
        },
        nightThemePurpleWhite: {
          primary: "#556090",
          secondary: "#FFFFFF",
        },
        nightThemeBlueYellow: {
          primary: "#182E39",
          secondary: "#D4FF26",
        },
        strongblue: "#59A1B6",
        lightblue: "#83D2FF",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
