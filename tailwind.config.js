/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./Assets/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#E0876A",
        secondary: "#F4A688",
        borderColor: "#A2836E",
        mainFontColor: "#FFF2DF",
        linkFontColor: "#FBEFCC",
        background: "#674D3C",
      },
      fontFamily: {
        body: ["Audiowide"],
      },
    },
  },
  plugins: [],
};
