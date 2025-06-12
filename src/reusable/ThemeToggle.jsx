import { useEffect, useState } from "react";
import useScreenSize from "../hooks/useScreenSize";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(true);
    const { isSmallDevice } = useScreenSize();

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

    if (isSmallDevice) {
        return (
            <span onClick={toggleDarkMode}>
                {isDark ? (
                    <span className="text-amber-500 flex items-center gap-1">
                        <MdLightMode className="text-sm" />
                        Light
                    </span>
                ) : (
                    <span className="text-blue-600 white flex items-center gap-1">
                        <MdDarkMode className="text-sm" />
                        Dark
                    </span>
                )}
            </span>
        );
    } else {
        return (
            <button
                onClick={toggleDarkMode}
                className={`rounded-full glow-effect h-7 w-7 cursor-pointer
        ${isDark ? "bg-yellow-300 text-white" : "bg-gray-800 text-yellow-300"} 
        bg-opacity-50 flex items-center justify-center outline-none
        transition-all duration-700 ease-in-out`}
                aria-label="Toggle dark mode"
            >
                <div className="transition-transform duration-300 ease-in-out">
                    {isDark ? (
                        <MdLightMode className="text-xl" />
                    ) : (
                        <MdDarkMode className="text-xl" />
                    )}
                </div>
            </button>
        );
    }
};

export default ThemeToggle;
