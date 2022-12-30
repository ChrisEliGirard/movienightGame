/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './docs/Assets/SubPages/*.{html,js}',
    './docs/*.{html,js}'
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E0876A",
        secondary: "#F4A688",
        tertiary: "#d9b38c",
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
  plugins: [require('tw-elements/dist/plugin')],
}
