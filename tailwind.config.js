/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:{
        "gray-50": "#ECFDF7",
        "gray-100": "#D1FAEC",
        "gray-200": "#A7F3DA",
        "gray-300": "#6EE7BF",
        "gray-400": "#34D39E",
        "green-500": "#10B981",
        "green-600": "#059666",
        "green-700": "#047852",
        "green-800": "#065F42",
        "green-900": "#064E36",
        "base-900": "#363A43",
        "base-800": "#3D424D",
        "base-700": "#444B5A",
        "base-600": "#4E596C",
        "base-500": "#64748B",
        "base-400": "#76859A",
        "base-300": "#A3AEBD",
        "base-200": "#C9CFD8",
        "base-100": "#e2e6eb",
        "base-50": "#F4F6F7",
      }
    },
  },
  plugins: [],
}

