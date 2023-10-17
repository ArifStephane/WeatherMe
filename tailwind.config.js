/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: "class",
  theme: {
    fontFamily: {
      montserrat: ['Montserrat']
    },
    extend: {
      colors: {
        'bg-primary': "var(--background-color)",
        'text-primary': "var(--text-color)",
      }
    }
  },
  plugins: []
}
