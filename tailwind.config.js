/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        phoneSmall: "320px", // Small phone screen size
        phoneMedium: "414px", // Medium phone screen size
        phoneLarge: "670px", // Large phone screen size
        tabletSmall: "870px", // Small tablet screen size
        tabletMedium: "930px", // Medium tablet screen size
        tabletLarge: "1024px", // Large tablet screen size
        laptopmin: "1280px",
        laptopSmall: "1440px", // Small laptop screen size
        laptopMedium: "1600px", // Medium laptop screen size
        laptopLarge: "1920px", // Large laptop screen size
        desktopExtraLarge: "2560px", // Extra large desktop screen size
      },
      fontFamily: {
        header: "Poppins",
        bottom: "Roboto",
      },
      boxShadow: {
        slidebutton: "inset 0 0 0 2px #FFF,inset 0 0 0 4px #008296",
        productcard:
          "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
        admin:
          "rgba(67, 71, 85, 0.8) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
        searchbar:
          "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(255,255,0) 0px 0px 0px 3px",
        inputbox: " 0 0 0 3px #c8f3fa, 0 1px 2px rgba(15,17,17,.15) inset",
      },
      colors: {
        amazonyellow: "#FF9900",
        searchbar: "#F1C232",
        lightblack: "#38444d",
      },
    },
  },
  plugins: [],
};
