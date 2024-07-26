/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      opacity: ["disabled"],

      colors: {
        "primary-button-color":
          "linear-gradient(90deg, rgba(170,20,58,1) 0%, rgba(212,89,48,1) 35%, rgba(255,40,0,1) 100%)",
        "main-btn-color": "rgb(170,20,58)",
        "main-btn-hover": "#b20000",
        "text-color": "#2d2d2d",
        "primary-orange": "#fbc50b",
        "global-text": "#1e2329",
        "primary-orange-hover": "#deac00",
        "orange-lite": "rgb(251, 247, 244)",
        "danger-primary-hover": "#cf3333",
        "danger-primary": "#ef4444",
        "primary-green": "#004d0c",
        "primary-green-lite": "#B8CBBB",
        "primary-green-prelite": "#004d0c",
        "card-light": "#fcfcfc",
        "dash-bg": "#f1f5f9",
        "scroll-bg": "#a6a6a6",
        "dash-dark-btn": "#5a55ec",
        "black-transparent": "rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
