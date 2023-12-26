/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#9147ff",
        "primary-content": "#ffffff",
        "primary-dark": "#7314ff",
        "primary-light": "#af7aff",

        secondary: "#ff477e",
        "secondary-content": "#470015",
        "secondary-dark": "#ff145a",
        "secondary-light": "#ff7aa2",

        //light mode
        background: "#efedf3",
        foreground: "#fbfafc",
        border: "#ded9e5",

        copy: "#251f2e",
        "copy-light": "#62527a",
        "copy-lighter": "#8875a3",

        // dark mode
        "dark-background": "#19141f",
        "dark-foreground": "#251f2e",
        "dark-border": "#3d334d",

        "dark-copy": "#fbfafc",
        "dark-copy-light": "#d7d1e0",
        "dark-copy-lighter": "#a294b8",

        success: "#47ff47",
        warning: "#ffff47",
        error: "#ff4747",

        "success-content": "#004700",
        "warning-content": "#474700",
        "error-content": "#ffffff",
      },
    },
  },
  plugins: [],
};
