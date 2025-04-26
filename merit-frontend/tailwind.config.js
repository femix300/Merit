/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#C3DFFF',
          300: '#99CEFF',
          400: '#66B5FF',
          500: '#3394FF',
          600: '#0070F3',
          700: '#0051CC',
          800: '#00368A',
          900: '#001C44',
        },
        secondary: {
          50: '#FFF8F0',
          100: '#FFEED5',
          200: '#FFD6A8',
          300: '#FFBA70',
          400: '#FF9838',
          500: '#FF7A00',
          600: '#CC6000',
          700: '#A34B00',
          800: '#7A3700',
          900: '#522400',
        },
        accent: {
          50: '#F5F2FF',
          100: '#EBE6FE',
          200: '#D8CCFD',
          300: '#C2ADFC',
          400: '#A585FA',
          500: '#8B5CF6',
          600: '#6D34EB',
          700: '#5620C5',
          800: '#3E1A8A',
          900: '#250F52',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dots': 'radial-gradient(rgba(25, 25, 25, 0.2) 1px, transparent 1px)',
        'hero-pattern': "url('/src/assets/pattern-bg.svg')",
      },
      boxShadow: {
        'inner-lg': 'inset 0 0 5px 2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px 2px rgba(59, 130, 246, 0.5)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: '#3394FF',
              '&:hover': {
                color: '#0070F3',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.mask-bottom-fade': {
          'mask-image': 'linear-gradient(to bottom, black 80%, transparent 100%)',
          '-webkit-mask-image': 'linear-gradient(to bottom, black 80%, transparent 100%)'
        },
        '.mask-radial-fade': {
          'mask-image': 'radial-gradient(circle at center, black 70%, transparent 100%)',
          '-webkit-mask-image': 'radial-gradient(circle at center, black 70%, transparent 100%)'
        }
      }
      addUtilities(newUtilities)
    }
  ],
}
