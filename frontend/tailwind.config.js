// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // ajuste conforme necessário
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7e22ce',
          dark: '#6b21a8',
          light: '#a855f7',
        },
        // Você pode continuar com outras categorias como 'secondary', 'background', etc.
      },
    },
  },
  darkMode: 'class', // ou 'media' se quiser automático
  plugins: [],
}
