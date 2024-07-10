/** @type {import('tailwindcss').Config} */
import gridAreas from "@savvywombat/tailwindcss-grid-areas";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateAreas: {
        tempLayoutLg: ["icon temp desc", "icon tempHL tempHL"],
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        anton: ["Anton", "sans-serif"],
        merriWeather: ["Merriweather", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [gridAreas],
};
