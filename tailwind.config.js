/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],  
  theme: {
    screens: {
      'xs': '320px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        calluna: 'Calluna',
        jakarta: 'Plus Jakarta Sans'
      }
    },
  },
  variants: {
    extend: {
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
