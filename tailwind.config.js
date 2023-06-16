/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#432010', // Replace with your desired primary color
      },
    },
  },
  purge: ['./src/**/*.{html,ts}'],
  content: ['./src/**/*.{html,js,ts}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      // Add the path to your custom theme configuration file
      './daisy-theme.config.js',
      'cupcake', "dark", "cmyk"
    ],
  },
};
