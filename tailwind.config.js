// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "hsl(120, 28%, 14%)",
        foreground: "hsl(141, 67%, 93%)",
        card: "hsl(120, 24%, 23%)",
        "card-foreground": "hsl(141, 67%, 93%)",
        primary: "hsl(142, 69%, 58%)",
        "primary-foreground": "hsl(120, 35%, 9%)",
        secondary: "hsl(120, 27%, 33%)",
        "secondary-foreground": "hsl(141, 76%, 73%)",
        muted: "hsl(120, 26%, 19%)",
        "muted-foreground": "hsl(120, 18%, 52%)",
        accent: "hsl(120, 27%, 33%)",
        "accent-foreground": "hsl(141, 76%, 73%)",
        border: "hsl(120, 27%, 33%)",
        input: "hsl(120, 26%, 19%)",
        ring: "hsl(142, 69%, 58%)",
        destructive: "hsl(0, 84%, 60%)",
        "destructive-foreground": "hsl(0, 0%, 98%)",
      },
    },
  },
  plugins: [],
};
