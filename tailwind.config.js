/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        h1: ['96px', '104px'],
        h2: ['60px', '68px'],
        h3: ['48px', '56px'],
        h4: ['34px', '43px'],
        h5: ['24px', '36px'],
        h6: ['20px', '28px'],
        regular: ['16px', '24px'],
        small: ['14px', '24px'],
      },
      fontWeight: {
        regular: 400,
        semibold: 600,
      },
      colors: {
        primary: {
          1: '#00A8A4',
          2: '#00A8A4',
          3: '#00A8A4',
          4: '#00A8A4',
          5: '#00A8A4',
          6: '#008790',
          7: '#006678',
        },
        gray: {
          1: '#F4F4F6',
          2: '#E9E9ED',
          3: '#DDDDE3',
          4: '#D2D2DA',
          5: '#C7C7D1',
          6: '#BCBCC8',
          8: '#A6A5B6',
          12: '#71738B',
          22: '#0D0F35',
        },
        white: '#FFFFFF',
        textPrimary: '#0D0F35', // Gray 22
        textSecondary: '#71738B', // Gray 12
        textTertiary: '#BCBCC8', // Gray 6
        textDisabled: '#BCBCC8', // Gray 6
        primaryBackground: '#FFFFFF', // White
        secondaryBackground: '#F4F4F6', // Gray 1
        tertiaryBackground: '#0D0F35', // Gray 22
        primaryMain: '#00A8A4', // Primary 5
        primaryLight: '#C7C7D1', // Primary 1
        primaryDark: '#006678', // Primary 7
        danger: '#EF4444',
        success: '#44EF44',
        info: '#4444EF',
        warn: '#EFEF44',
      },
    },
  },
  plugins: [],
};
