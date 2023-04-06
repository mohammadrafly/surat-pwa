/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          '100': '#FFFAEB',
          '200': '#FFF5CC',
          '300': '#FFE64D',
          '400': '#FFD700',
          '500': '#FFC200',
          '600': '#D9A400',
          '700': '#B38600',
          '800': '#8C6900',
          '900': '#734D00',
        },
      },
    },
  },
  plugins: [],
}

