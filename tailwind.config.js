/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js}", // Adjust extensions based on project file types
    "!./node_modules/**/*",
  ],
  theme: {
    extend: {
      screens: {
        xs: "270px", // Custom breakpoint for extra small screens
      },
      backgroundImage: {
        firework: "url('/src/images/sofia-tang-nFQsWCdcL-E-unsplash.jpg')", // Cusnpm run tom background image
      },
    },
  },
  plugins: [],
};
