/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          950: '#2A060D',
          900: '#3D0A14',
          850: '#52101D',
          800: '#5C1322', // The exact deep rich burgundy/wine from the reference
          750: '#691828',
          700: '#7B1F31',
          600: '#92293F',
          500: '#AC3851',
          100: '#F5DCE1',
          50: '#FBF0F2',
        },
        slateBadge: {
          500: '#5B7894', // The exact blue-gray pill badge from "let's use this"
          600: '#4A6580',
          700: '#3D546C',
        },
        blushCloud: {
          50: '#FFF9FA',
          100: '#FDF2F4',
          200: '#FBE4E8',
          300: '#F7CBD4',
          400: '#EFADC0',
          500: '#E488A0',
        },
        creamPaper: {
          50: '#FFFDF9',
          100: '#FAF7F2', // The exact textured cream card background from reference
          200: '#F3EFE7',
          300: '#E8E1D3',
          400: '#D5CBB9',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'card-elevated': '0 16px 36px -8px rgba(60, 10, 20, 0.22), 0 4px 12px rgba(60, 10, 20, 0.08)',
        'card-cream': '0 14px 32px -6px rgba(70, 20, 30, 0.1), 0 3px 8px rgba(0, 0, 0, 0.04)',
        'polaroid': '0 10px 25px -4px rgba(45, 8, 14, 0.16), 0 3px 8px rgba(0, 0, 0, 0.06)',
        'polaroid-hover': '0 20px 40px -6px rgba(45, 8, 14, 0.28), 0 6px 14px rgba(0, 0, 0, 0.1)',
        'record': '0 18px 45px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1.5deg)' },
        },
      },
    },
  },
  plugins: [],
}
