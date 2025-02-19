/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        miffyYellow: "#FEC608",
        miffyOrange: "#f36532",
        miffyBlue: "#005599",
        miffyGreen: "#2A7135",
        miffyBlack: "#252324",
        miffyWhite: "#FFFFFF",
        miffyBrown: "#8F4F2F",
      },
      fontFamily: {
        miffyRounded: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};