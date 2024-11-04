// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./auth/**/*.html",
    "./profile/**/*.html",
    "./post/**/*.html",
    "./src/**/*.{html,js}",
  ], // Include all relevant files
  theme: {
    extend: {
      screens: {
        xs: "270px",
      },
      backgroundImage: {
        firework: "url('../src/images/sofia-tang-nFQsWCdcL-E-unsplash.jpg')", // Corrected path
        blackVibe:
          "url('https://images.unsplash.com/photo-1651065567117-ac52c1a62e21?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        mainBack:
          "url('https://images.unsplash.com/photo-1663104192417-6804188a9a8e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        landingBg:
          "url('https://images.unsplash.com/photo-1659469377768-4f42f2f091c5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        formBg:
          "url('https://images.unsplash.com/photo-1655035080489-521cde5dfc3b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
