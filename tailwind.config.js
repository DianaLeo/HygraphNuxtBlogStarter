/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        brand: "rgb(102,99,253)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
