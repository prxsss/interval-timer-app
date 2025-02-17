/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import catppuccin from '@catppuccin/daisyui';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      catppuccin('latte'),
      catppuccin('mocha'),
      // Fallback to default theme
      'light',
    ],
  },
  darkMode: ['selector', '[data-theme="mocha"]'],
};
