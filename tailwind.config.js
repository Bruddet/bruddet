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
        strongblue: "#59A1B6",
        lightblue: "#83D2FF",
        beige: "#FFF8E8",
      },
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
  plugins: [require("@tailwindcss/typography")],
};
