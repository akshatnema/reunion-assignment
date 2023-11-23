/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      minWidth: {
        48: '12rem',
        52: '13rem'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      }
    },
  },
  daisyui: {
    themes: ["light", "dark"]
  },
  plugins: [
    require('flowbite/plugin'),
    require("daisyui")
  ],
}

