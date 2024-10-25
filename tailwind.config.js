/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#FFA500',
        secondary: '#FFF6E6',
        ternary: '#FFE3B0',
        card : '#FEF5EF',
        txtPrimary : '#FFFFFF',
        txtSecondary : '#000000',
      },
      fontSize: {
        xs: '10px',
        sm: '12px',
        lg: '14px',
        '2lg' : '16px',
        base: '17px',
        xl: '24px',
      },
      borderRadius: {
        'custom-radius': '28px',
      },
      fontFamily : {
        sans : ['Roboto-Regular'],
      },
    },
  },
  plugins: [],
};

