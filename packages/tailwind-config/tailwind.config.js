import { colors } from './colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        futura: ['FuturaPt,serif'],
        body: ['Helvetica,Arial,sans-serif'],
      },
      transitionProperty: {
        bevel: 'color, background-color, box-shadow',
      },
      spacing: {
        128: '32rem',
        ['8xl']: '88rem',
        ['9xl']: '96rem',
      },
      colors: { transparent: 'transparent', current: 'currentColor', ...colors },
      boxShadow: {
        'bevel-inner': 'inset 0 3px 5px rgba(0,0,0,.125)',
        card: '0 37px 20px -30px rgba(0,0,0,.4)',
      },
      backgroundPosition: {
        'right-pad': 'right .75rem center',
      },
      backgroundSize: {
        'size-1': '1rem',
      },
      backgroundImage: {
        'arrow-down': `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
};
