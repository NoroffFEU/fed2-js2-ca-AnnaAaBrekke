// /** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    extend: {
      screens: {
        xs: "270px",
      },
      backgroundImage: {
        firework: `url("./src/images/sofia-tang-nFQsWCdcL-E-unsplash.jpg")`,
      },
      spacing: {
        "small-padding": "0.625rem", // Use instead of '2.5'
        "medium-padding": "1.25rem", // Custom spacing as an example
        "large-padding": "1.875rem", // Another example
        "input-padding": "2rem", // Custom padding value for form inputs
      },
    },
  },
  plugins: [],
};
