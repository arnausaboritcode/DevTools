/** @type {import('tailwindcss').Config} */
import animations from "@midudev/tailwind-animations";
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist", "sans-serif"],
      },
      animation: {
        textCycle: "textCycle 3s ease infinite",
      },
      keyframes: {
        textCycle: {
          "0%": { color: "rgba(253, 186, 116, 0.8)" },
          "50%": { color: "rgba(253, 224, 71, 0.8)" },
          "100%": { color: "rgba(252, 165, 165, 0.8)" },
        },
      },
    },
  },
  plugins: [animations],
};
