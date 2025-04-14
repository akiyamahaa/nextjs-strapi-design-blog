/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    container: false,
  },
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#e5dffd",
        secondary: "#e5dffd",
        black: "#000000",
        dark: "#060C14",
        light: "#E7E5D4",
        border: "#DCDBD0",
        borderHome: "#919EAB52",
        borderLight: "#BFBEB5",
        sameLight: "#eae6ff",
        sameLight2: "#f0ebff",
        text: "#212B36",
        text2: "#3d3f93",
        bgAbout:'#e5dffd'
      },
      backgroundImage: {
        bg1: "url('/images/ux/bg-login.png')",
        bg2: "url('/images/ux/bg-sign-up.jpg')",
        home1: "url('/images/ux/1.jpg')",
        homeSection1: "url('/images/ux/homeSection1.jpg')",
        homeSection2: "url('/images/ux/homeSection2.jpg')",
        homeSection3: "url('/images/ux/homeSection3.jpg')",
        homeSection4: "url('/images/ux/homeSection4.jpg')",
        categorySection: "url('/images/ux/categorysection.jpg')",
        aboutBanner: "url('/images/ux/aboutbanner.jpg')",
        blogSection: "url('/images/ux/blogsection.jpg')",
        contactSection: "url('/images/ux/contactsection.jpg')",
        bgFooter: "url('/images/ux/footer.jpg')",
      },
      fontFamily: {
        primary: ["var(--font-primary)", "serif"],
        secondary: ["var(--font-secondary)", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-bootstrap-grid")({
      gridGutters: {
        0: 0,
        1: ".5rem",
        2: "1rem",
        3: "1.5rem",
        4: "2rem",
        5: "2.75rem",
        6: "3.25rem",
      },
    }),
  ],
};
