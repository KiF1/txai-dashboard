/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D7575",
        black: "#262F2F",
        green: {
          600: "#2D7575",

        },
        gray: {
          300: "#B9C6C6",
          600: "#8E9595",
          800: "#F8F8F8",
          1000: "#D8DFDF",
        },
        white: "#FFFFFF",
        red: {
          600: "#E61E32",
        },

      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      }
    },
  }
}

