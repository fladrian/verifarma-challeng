/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Disney+ inspired color palette
        primary: {
          DEFAULT: '#113CCF',
          dark: '#0A2A9C',
          light: '#1E4FE8',
        },
        background: {
          DEFAULT: '#0A0E27',
          secondary: '#13172D',
          tertiary: '#1A1F3A',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B8BCC8',
          muted: '#6B7280',
        },
        accent: {
          DEFAULT: '#00D9FF',
          hover: '#00B8D9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '8px',
        'button': '6px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

