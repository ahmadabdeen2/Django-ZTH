/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      animation:{
        'spin-slow': 'spin 5s linear infinite',
      },

      fontFamily: {
        neue: ['var(--font-neue)'],
      },
      colors:{
        backgroundLight: '#FFFEEF',
        backgroundDark: '#101010',
        primaryBlue: '#004E98',
        primaryGrey: '#575757',
      },
    },
    screens: {
      'xs': '320px',
      'sm': '480px',
      'md': '640px',
      'lg': '768px',
      'xl': '1024px',
      '2xl': '1280px',
    },
  },
  plugins: [],
}