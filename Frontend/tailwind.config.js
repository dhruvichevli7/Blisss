/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        test: "#ff0000",
        main : "#e9ddcf",
        brown : "#785e26",
        cream : '#f3e9de',
      },

      fontFamily: {
        fahkwang: ['Fahkwang', 'sans-serif'],
      },

      keyframes: {
       growFromLeft: {
        '0%': {
          transform: 'scaleX(0)',
          transformOrigin: 'left',
        },
        '100%': {
          transform: 'scaleX(1)',
          transformOrigin: 'left',
        },
        fadeIn: {
          '0%': { opacity: '0'},
          '100%': {opacity: '1'}
        }
       }
      },

      animation: {
        growFromLeft: 'growFromLeft 1s ease-out forwards',
        fadeIn: 'fadeIn 1.1s ease-in forwards',
      }
    },
  },
  plugins: [],
}

