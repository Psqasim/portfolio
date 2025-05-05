/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {}, // Optional but recommended
  },
};

export default config;
