/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],  
  theme: {
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
