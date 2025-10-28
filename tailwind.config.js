/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        card: "#f5f3fb",
        muted: "#e8e5f2",
      },
      boxShadow: {
        flyover: "8px 2px 12px rgba(0,0,0,0.18)",
      },
    },
  },
  plugins: [],
};
