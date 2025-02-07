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
    // The top value of this array will be used as the default theme
    // You can use https://github.com/saadeghi/theme-change to switch between themes
    themes: [
      // You can simply select a catppuccin flavor with sane default colors
      catppuccin('latte'),
      // Or you can optionally specify accent colors
      catppuccin('frappe', 'pink'),
      // Or you can optionally customize more semantic colors
      catppuccin('macchiato', { primary: 'maroon' }),
      // Values not explicitly defined will use default values
      catppuccin('mocha', { primary: 'sky', secondary: 'rosewater' }),
      // Fallback to default theme
      'light',
    ],
  },
};
