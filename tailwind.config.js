/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // You already have this
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    daisyui: {
        themes: [
            {
                lighttheme: {
                    "base-100": "#e3e0d8",
                    "base-200": "#f0eee9",
                    "base-content": "#1f2937",
                },
            },
            {
                darktheme: {
                    "base-100": "#0e0d0d",
                    "base-200": "#201e1e",
                    "base-content": "#f5f3f0",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
  