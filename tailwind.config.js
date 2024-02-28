/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:{
        "green-500": "#02e56b",
        "green-600": "#00bf55",
        "green-700": "#008940",
        "green-800": "#06753a",
        "green-900": "#085f32",
        "base-400": "#76859a",
        "base-200": "#c9cfd8",
        "base-900": "#363a43",
        "base-600": "#4e596c",
        "base-100": "#e2e6eb",
      }
    },
  },
  plugins: [],
}

