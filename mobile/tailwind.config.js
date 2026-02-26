/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fffaf0',
          100: '#fef3c7',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
        },
        healing: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#059669',
          600: '#047857',
        },
      },
    },
  },
  plugins: [],
};
