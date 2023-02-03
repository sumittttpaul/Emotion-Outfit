module.exports = {
  mode: 'jit',
  content: [
    './src/pages/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  media: false,
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0076E4',
        'primary-blue-rgb': '#0074e4',
        'color-dark': '#FFFFFF3B',
        // Dark Colors
        'dark-red': '#4B0000',
        'dark-pink': '#45004B',
        'dark-blue': '#003C4B',
        'dark-yellow': '#464B00',
        'dark-green': '#004B0C',
        'dark-purple': '#320161',
        'dark-orange': '#613B01',
      },
      screens: {
        'xs-200': '200px',
        'xs-300': '300px',
        'xs-330': '330px',
        'xs-350': '350px',
        'xs-400': '400px',
        'xs-435': '435px',
        'sm-500': '500px',
        'small-screen': '555px',
        'sm-600': '600px',
        'sm-670': '670px',
        'sm-700': '700px',
        'sm-750': '750px',
        'sm-800': '800px',
        'small-medium-screen': '830px',
        'md-900': '900px',
        'md-1000': '1000px',
        'medium-screen': '1040px',
        'lg-1040': '1040px',
        'lg-1100': '1100px',
        'lg-1140': '1140px',
        'lg-1200': '1200px',
        'medium-large-screen': '1300px',
        'xl-1300': '1300px',
        'xl-1400': '1400px',
        'large-screen': '1520px',
      },
    },
  },
  plugins: ['postcss-import', 'tailwindcss', 'autoprefixer'],
};
