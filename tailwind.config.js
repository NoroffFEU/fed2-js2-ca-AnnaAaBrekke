// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./auth/**/*.html",
    "./profile/**/*.html",
    "./post/**/*.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "270px",
      },
      backgroundImage: {
        formBg:
          "url('https://images.unsplash.com/photo-1650738962968-1cda273212eb?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGJsYWNrJTIwYmx1ZSUyMHB1cnBsZXxlbnwwfHwwfHx8MA%3D%3D')",
        mainBg:
          "url('https://images.unsplash.com/photo-1663104192417-6804188a9a8e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        landingBg:
          "url('https://images.unsplash.com/photo-1659469377768-4f42f2f091c5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        profileBg:
          "url('https://images.unsplash.com/photo-1656709519321-c9f0612ffb0e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        "main-bgColor":
          "linear-gradient(90deg, #0a0a0a, #1a1a1a, #2e2e3e, #14142b)",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        sans: ["Poppins", "sans-serif"],
      },
      spacing: {
        avatarNav: "3.25rem",
        avatarProfile: "8.25rem",
        avatarPosts: "2.75rem",
        avatarSinglePost: "4.5rem",
      },
    },
  },
  plugins: [],
};
