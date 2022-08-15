/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["pages", "components"].map((dir) => `${dir}/**/*.{js,jsx,ts,tsx}`),
  theme: {
    extend: {},
  },
  plugins: [],
};
