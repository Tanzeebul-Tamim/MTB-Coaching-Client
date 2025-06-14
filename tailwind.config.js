/** @type {import('tailwindcss').Config} */
import COLORS from "./src/styles/colors.json";

export default {
    darkMode: "class", // You already have this
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    daisyui: {
        themes: [
            {
                lighttheme: {
                    primary: COLORS?.light.primary,
                    secondary: COLORS?.light.secondary,
                    accent: COLORS?.light.accent,
                    error: COLORS?.light.error,
                    warning: COLORS?.light.navHover,
                    "base-100": COLORS?.light?.base100,
                    "base-200": COLORS?.light?.base200,
                    "base-300": COLORS?.light?.base300,
                    "base-content": COLORS?.light?.baseContent,
                },
            },
            {
                darktheme: {
                    primary: COLORS?.dark.primary,
                    secondary: COLORS?.dark.secondary,
                    accent: COLORS?.dark.accent,
                    error: COLORS?.dark.error,
                    warning: COLORS?.dark.navHover,
                    "base-100": COLORS?.dark?.base100,
                    "base-200": COLORS?.dark?.base200,
                    "base-300": COLORS?.dark?.base300,
                    "base-content": COLORS?.dark?.baseContent,
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
