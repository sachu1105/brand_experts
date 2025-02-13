module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-200%)" },
        },
      },
      animation: {
        slide: "slide 15s linear infinite",
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primaryStart: "#BF1A1C",
        primaryEnd: "#590C0D",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
