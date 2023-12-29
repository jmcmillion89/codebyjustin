/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
            opacity: {
        '10': '0.1',
        '20': '0.2',
        '30': '0.3',
        // Add as many as you need...
      },
      colors: {
        primary: "#0C0A0A",
        secondary: "#ed9e67",
        tertiary: "#211000",
        "black-100": "#1A0C00",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        
      },
    },
  },
  plugins: [],
};