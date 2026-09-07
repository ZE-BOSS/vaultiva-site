/**
 * Vaultiva web design tokens.
 *
 * These mirror `vaultiva-mobile/src/theme/index.ts` exactly, which was measured
 * from the Figma exports (see vaultiva-mobile/docs/DESIGN_SPEC.md). Keep the two
 * in step — the web app is meant to read as the same product as the mobile app,
 * so a value should never be changed in one without the other.
 */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: {
          DEFAULT: '#4171FF',
          pressed: '#3563ED',
          50: '#F2F5FE',
          100: '#E4EBFF',
          200: '#D2DCFF',
          300: '#9EB5F9',
          400: '#7B9BF5',
          500: '#4171FF',
          600: '#3563ED',
          700: '#2551D6',
          800: '#1C47C9',
          900: '#28439A',
        },
        // Surfaces
        surface: {
          DEFAULT: '#F1F4FD',
          page: '#FAFDFF',
          input: '#F5F6F8',
          tab: '#F9F9F9',
        },
        // Text
        ink: {
          DEFAULT: '#1E1E1E',
          strong: '#2C2C2C',
          muted: '#888B8C',
          faint: '#B0B3B8',
        },
        // Status
        success: '#1DB954',
        mint: '#42EFA1',
        danger: '#E5484D',
        warning: '#F5A524',
      },
      borderRadius: {
        input: '12px',
        card: '16px',
        pill: '999px',
      },
      height: {
        control: '47px', // MEASURED: primary button, 46.6pt
        field: '43px', // MEASURED: text input, 42.5pt
      },
      backgroundImage: {
        // MEASURED: dashboard header band and the onboarding backdrop.
        'header-gradient': 'linear-gradient(180deg, #1C47C9 0%, #2551D6 35%, #2F5DE6 75%, #3361EA 100%)',
        'page-gradient':
          'linear-gradient(180deg, #D3DCF5 0%, #DEE8FF 6%, #EBF1FF 12%, #F8FCFF 19%, #FAFDFF 22%)',
        'onboarding-gradient':
          'linear-gradient(180deg, #28439A 0%, #406EF8 23%, #9AB4FF 46%, #D4DFFD 60%, #FFFFFF 74%)',
        'wallet-card': 'linear-gradient(110deg, #2E9BF5 0%, #424AD9 45%, #611BEB 70%, #C81FA8 100%)',
        'balance-card': 'linear-gradient(90deg, #FFFFFF 0%, #FAF9FE 8%, #F3F6FF 18%, #EDF0FF 32%)',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        pill: '0 2px 6px rgba(140, 151, 184, 0.18)',
        card: '0 4px 12px rgba(140, 151, 184, 0.10)',
      },
    },
  },
  plugins: [],
};
