// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js}", 
    "!./node_modules/**/*",
  ],
  theme: {
    extend: {
      screens: {
        xs: "270px", 
      },
      backgroundImage: {
        firework: `url("./src/images/sofia-tang-nFQsWCdcL-E-unsplash.jpg")`,
      },
    },
  },
  plugins: [],
};
