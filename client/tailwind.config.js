/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        maxWidth: {
          xs: "340px",
          sm: "440px",
          md: "768px",
          lg: "1024px",
          xl: "1245px",
        },
      },
      screens: {
        xs: "340px",
        sm: "440px",
        md: "768px",
        lg: "1024px",
        xl: "1245px",
      },
    },
  },
  plugins: [],
};
