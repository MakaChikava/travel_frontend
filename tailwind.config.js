/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'darkBlue': '#60a5fa',
      'blue': '#bae6fd',
      'azul': '#f0f9ff',
      'black': '#0a0a0a',
      'black-50': '#262626',
      'lightBlack': '#525252',
      'white': '#fafafa',
      'red': '#dc2626',
      'green': '#16a34a',
      'indigo': '#f1f5f9'
    },
    extend: {
      backgroundImage:{
        'clouds': "url('/Users/maka/personal_projects/travel_frontend/src/icons/whiteCloudsBG.avif')"
      }
    },
  },
  plugins: [],
}

