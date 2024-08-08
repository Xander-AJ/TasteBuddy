/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#33665A',
        backgroundGreen:'#f0fff0'
        
    },
    fontFamily: {
      urbanist: ['Urbanist', 'sans-serif'],
    },
    },
  },
  plugins: [],
}
