/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      primary: ['Poppins', 'sans-serif'],
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    screens: {
      custom: { min: '120px', max: '720px' },
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px', // ✅ fixed: added "px"
    },
    extend: {
      colors: {
        primary: '#222222',
        secondary: '#F5E6E0',
      },
    },
  },
  plugins: [],
};
