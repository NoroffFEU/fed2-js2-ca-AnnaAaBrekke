/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js}", // Only add extensions you use
    "!./node_modules/**/*",
  ],
  theme: {
    extend: {
      screens: {
        xs: "270px", 
      },
    },
  },
  plugins: [],
};
  
