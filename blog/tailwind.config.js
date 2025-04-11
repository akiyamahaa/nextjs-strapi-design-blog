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
        primary: "#ff4848",
        secondary: "#2a30d8",
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
      },
      backgroundImage: {
        bg1: "url('/images/history/1.png')",
        bg2: "url('/images/history/2.jpg')",
        home1: "url('/images/history/1.jpg')",
        home1md: "url('/images/history/1md.jpg')",
        home1sm: "url('/images/history/1sm.jpg')",
        home2: "url('/images/history/2.jpg')",
        home2md: "url('/images/history/2md.jpg')",
        home2sm: "url('/images/history/2sm.jpg')",
        home3: "url('/images/history/3.jpg')",
        home3md: "url('/images/history/3md.jpg')",
        home3sm: "url('/images/history/3sm.jpg')",
        home4: "url('/images/history/4.jpg')",
        home4md: "url('/images/history/4md.jpg')",
        home4sm: "url('/images/history/4sm.jpg')",
        home5: "url('/images/history/5.jpg')",
        home5md: "url('/images/history/5md.jpg')",
        home5sm: "url('/images/history/5sm.jpg')",
        bgFooter: "url('/images/img/bg-footer.jpeg')",
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
