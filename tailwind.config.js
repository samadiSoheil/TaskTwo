/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "Vazirmatn-Regular": "Vazirmatn-Regular",
        "Vazirmatn-Bold": "Vazirmatn-Bold",
        "Vazirmatn-Black": "Vazirmatn-Black",
        "Vazirmatn-Light": "Vazirmatn-Light",
      },
    },
    container: {
      padding: "2rem",
      center: true,
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
    },
  ],
};
