/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        maxWidth: "100%",
      },
      colors: {
        custom: {
          500: "#290536", // Add the desired color value
        },
      },
      screens: {
        xs: "320px",
        sm: "440px",
        md: "768px",
        lg: "1024px",
        xl: "1245px",
      },
    },
  },
  plugins: [],
};
