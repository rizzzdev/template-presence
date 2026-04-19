/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {

      // ─── Font ──────────────────────────────────────────────────
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },

      // ─── Warna dasar Presence ──────────────────────────────────
      colors: {
        navy: {
          deep:  '#071525',   // background utama halaman
          mid:   '#0a1e35',   // sidebar & topbar
          soft:  '#0f2844',   // card & modal
          card:  '#112d4a',   // card lebih terang
          hover: '#163556',   // hover state
        },
        orange: {
          DEFAULT: '#ff8c00',
          dim:     'rgba(255, 140, 0, 0.12)',
          border:  'rgba(255, 140, 0, 0.30)',
          50:  '#fff7eb',
          100: '#ffe5b4',
          200: '#ffca66',
          300: '#ffb033',
          400: '#ff9900',
          500: '#ff8c00',   // brand orange
          600: '#e07a00',
          700: '#b36000',
          800: '#804500',
          900: '#4d2a00',
        },
        blue: {
          DEFAULT: '#1a6fc4',
          dim:     'rgba(26, 111, 196, 0.12)',
          border:  'rgba(26, 111, 196, 0.30)',
          400: '#4fa3e8',
          500: '#1a6fc4',
          600: '#155ca3',
        },
        green: {
          DEFAULT: '#2db87a',
          dim:     'rgba(45, 184, 122, 0.12)',
          400: '#4dd99a',
          500: '#2db87a',
          600: '#249e68',
        },
        red: {
          DEFAULT: '#e84040',
          dim:     'rgba(232, 64, 64, 0.10)',
          400: '#f07070',
          500: '#e84040',
          600: '#c43030',
        },
      },

      // ─── Background opacity untuk navy ────────────────────────
      backgroundColor: {
        'card-base': 'rgba(255, 255, 255, 0.04)',
        'card-hover': 'rgba(255, 255, 255, 0.07)',
      },

      // ─── Border color ─────────────────────────────────────────
      borderColor: {
        base:   'rgba(255, 255, 255, 0.07)',
        medium: 'rgba(255, 255, 255, 0.12)',
      },

      // ─── Text ─────────────────────────────────────────────────
      textColor: {
        primary:   '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.65)',
        muted:     'rgba(255, 255, 255, 0.38)',
      },

      // ─── Border radius ────────────────────────────────────────
      borderRadius: {
        '2xs': '4px',
        xs:    '6px',
        sm:    '8px',
        md:    '10px',
        lg:    '12px',
        xl:    '14px',
        '2xl': '16px',
      },

      // ─── Box shadow ───────────────────────────────────────────
      boxShadow: {
        card:   '0 0 0 0.5px rgba(255,255,255,0.12)',
        orange: '0 0 0 2px rgba(255,140,0,0.4)',
        blue:   '0 0 0 2px rgba(26,111,196,0.4)',
      },

      // ─── Spacing tambahan ─────────────────────────────────────
      spacing: {
        '4.5': '1.125rem',
        '13':  '3.25rem',
        '15':  '3.75rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        sidebar: '240px',
        topbar:  '56px',
        bottomnav: '64px',
      },

      // ─── Animasi ──────────────────────────────────────────────
      keyframes: {
        'slide-in': {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(1.3)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'slide-in':  'slide-in 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-out': 'slide-out 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in':   'fade-in 0.2s ease',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'shimmer':   'shimmer 2s linear infinite',
      },

      // ─── Z-index ──────────────────────────────────────────────
      zIndex: {
        bottomnav: '100',
        topbar:    '100',
        sidebar:   '200',
        backdrop:  '199',
        modal:     '300',
      },
    },
  },

  plugins: [

    // ──────────────────────────────────────────────────────────────
    // Plugin scrollbar custom
    // Menghasilkan utility class:
    //   scrollbar          → tampilkan scrollbar
    //   scrollbar-thin     → scrollbar tipis (4px)
    //   scrollbar-none     → sembunyikan scrollbar
    //   scrollbar-track-*  → warna track
    //   scrollbar-thumb-*  → warna thumb
    //   scrollbar-thumb-rounded → rounded thumb
    // ──────────────────────────────────────────────────────────────
    plugin(function ({ addBase, addUtilities, theme }) {

      // ── Base: scrollbar global di seluruh aplikasi ─────────────
      addBase({
        '*': {
          'scrollbar-width': 'thin',
          'scrollbar-color': 'rgba(255, 140, 0, 0.35) rgba(10, 30, 53, 0.5)',
        },
        // WebKit (Chrome, Safari, Edge)
        '*::-webkit-scrollbar': {
          width:  '5px',
          height: '5px',
        },
        '*::-webkit-scrollbar-track': {
          background:    'rgba(10, 30, 53, 0.5)',
          borderRadius:  '10px',
        },
        '*::-webkit-scrollbar-thumb': {
          background:    'rgba(255, 140, 0, 0.35)',
          borderRadius:  '10px',
          border:        '1px solid rgba(255, 140, 0, 0.1)',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(255, 140, 0, 0.6)',
        },
        '*::-webkit-scrollbar-thumb:active': {
          background: '#ff8c00',
        },
        '*::-webkit-scrollbar-corner': {
          background: 'transparent',
        },
      })

      // ── Utilities: variant scrollbar ───────────────────────────
      addUtilities({

        // Thin — sidebar nav, tabel horizontal
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': 'rgba(255, 140, 0, 0.3) transparent',
          '&::-webkit-scrollbar': { width: '3px', height: '3px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background:   'rgba(255, 140, 0, 0.3)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(255, 140, 0, 0.55)',
          },
        },

        // None — sembunyikan scrollbar tapi tetap scrollable
        '.scrollbar-none': {
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },

        // Blue variant — untuk tabel / area konten utama
        '.scrollbar-blue': {
          'scrollbar-width': 'thin',
          'scrollbar-color': 'rgba(26, 111, 196, 0.4) rgba(10, 30, 53, 0.5)',
          '&::-webkit-scrollbar': { width: '4px', height: '4px' },
          '&::-webkit-scrollbar-track': {
            background:   'rgba(10, 30, 53, 0.5)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background:   'rgba(26, 111, 196, 0.4)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#1a6fc4',
          },
        },

        // Green variant — untuk konten sukses / log
        '.scrollbar-green': {
          'scrollbar-width': 'thin',
          'scrollbar-color': 'rgba(45, 184, 122, 0.4) rgba(10, 30, 53, 0.5)',
          '&::-webkit-scrollbar': { width: '4px', height: '4px' },
          '&::-webkit-scrollbar-track': {
            background:   'rgba(10, 30, 53, 0.5)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background:   'rgba(45, 184, 122, 0.4)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#2db87a',
          },
        },

        // Auto-hide: hanya muncul saat hover
        '.scrollbar-autohide': {
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { width: '5px', height: '5px' },
          '&::-webkit-scrollbar-thumb': {
            background:   'transparent',
            borderRadius: '10px',
            transition:   'background 0.2s',
          },
          '&:hover': {
            'scrollbar-width': 'thin',
            'scrollbar-color': 'rgba(255, 140, 0, 0.35) transparent',
          },
          '&:hover::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 140, 0, 0.35)',
          },
          '&:hover::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(255, 140, 0, 0.6)',
          },
        },

        // Horizontal scrollbar (untuk tabel)
        '.scrollbar-x': {
          overflowX: 'auto',
          overflowY: 'hidden',
          'scrollbar-width': 'thin',
          'scrollbar-color': 'rgba(255, 140, 0, 0.3) transparent',
          '&::-webkit-scrollbar': { height: '4px' },
          '&::-webkit-scrollbar-track': {
            background:   'rgba(10, 30, 53, 0.5)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background:   'rgba(255, 140, 0, 0.3)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(255, 140, 0, 0.6)',
          },
        },

      })
    }),

  ],
}
