/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "base-bg": "#ffffff",
        "balanced-bg": "#d1d1d1",
        "accent-bg": "#111111",
      },
    },
  },
  plugins: [],
};
