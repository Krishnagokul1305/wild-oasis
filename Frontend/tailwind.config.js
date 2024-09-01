/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        // Grey Colors
        grey: {
          0: "var(--grey-0)",
          50: "var(--grey-50)",
          100: "var(--grey-100)",
          200: "var(--grey-200)",
          300: "var(--grey-300)",
          400: "var(--grey-400)",
          500: "var(--grey-500)",
          600: "var(--grey-600)",
          700: "var(--grey-700)",
          800: "var(--grey-800)",
          900: "var(--grey-900)",
        },
        // Additional Colors
        customBlue: {
          100: "#e0f2fe",
          700: "#0369a1",
        },
        green: {
          100: "#dcfce7",
          700: "#15803d",
        },
        yellow: {
          100: "#fef9c3",
          700: "#a16207",
        },
        silver: {
          100: "#e5e7eb",
          700: "#374151",
        },
        customIndigo: {
          100: "#e0e7ff",
          700: "#4338ca",
        },
        red: {
          100: "#fee2e2",
          700: "#b91c1c",
          800: "#991b1b",
        },
      },
    },
  },
  plugins: [],
};
