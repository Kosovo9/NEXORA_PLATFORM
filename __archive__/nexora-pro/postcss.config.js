// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ Plugin correcto
    autoprefixer: {},           // ✅ Necesario para compatibilidad
  },
}