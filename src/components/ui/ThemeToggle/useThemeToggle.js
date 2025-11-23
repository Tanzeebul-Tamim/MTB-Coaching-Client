import { useEffect, useState } from "react";
import useScreen from "../../../hooks/useScreen";
import { useLocation } from "react-router-dom";

const useThemeToggle = () => {
    const [isDark, setIsDark] = useState(true);
    const { isSmallDevice } = useScreen();
    const location = useLocation();
    const isDashboard = location.pathname.includes("dashboard");

    useEffect(() => {
        let theme = localStorage.getItem("theme");

        if (!theme) {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            theme = prefersDark ? "dark" : "light";
            localStorage.setItem("theme", theme);
        }

        const isDark = theme === "dark";
        document.documentElement.classList.toggle("dark", isDark);
        document.documentElement.setAttribute(
            "data-theme",
            isDark ? "darktheme" : "lighttheme"
        );
        setIsDark(isDark);
    }, []);

    const toggleDarkMode = () => {
        const html = document.documentElement;
        html.classList.toggle("dark");
        const nowDark = html.classList.contains("dark");
        html.setAttribute("data-theme", nowDark ? "darktheme" : "lighttheme");
        setIsDark(nowDark);
        localStorage.setItem("theme", nowDark ? "dark" : "light");
    };

    return { isDark, isSmallDevice, isDashboard, setIsDark, toggleDarkMode };
};

export default useThemeToggle;
