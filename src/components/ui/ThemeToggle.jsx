import { useEffect, useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useLocation } from "react-router-dom";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(true);
    const { isSmallDevice } = useScreenSize();
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

    if (isDashboard) {
        return (
            <div
                onClick={toggleDarkMode}
                className="transition-transform duration-300 ease-in-out font-bold flex gap-3 items-center tracking-widest description lg:text-lg text-base"
            >
                {isDark ? (
                    <>
                        <MdLightMode className="text-xl" />
                        Light Mode
                    </>
                ) : (
                    <>
                        <MdDarkMode className="text-xl" />
                        Dark Mode
                    </>
                )}
            </div>
        );
    }

    if (isSmallDevice) {
        return (
            <span onClick={toggleDarkMode}>
                {isDark ? (
                    <span className="text-yellow-100 flex items-center gap-1">
                        <MdLightMode className="text-sm" />
                        Light Mode
                    </span>
                ) : (
                    <span className="text-blue-700 flex items-center gap-1">
                        <MdDarkMode className="text-sm" />
                        Dark Mode
                    </span>
                )}
            </span>
        );
    } else {
        return (
            <button
                onClick={toggleDarkMode}
                data-tip={`Enable ${isDark ? "Light" : "Dark"} Mode`}
                className="rounded-full glow-effect h-7 w-7 cursor-pointer bg-primary text-accent bg-opacity-50 flex items-center justify-center outline-none
        transition-all duration-700 ease-in-out tooltip tooltip-right tooltip-secondary tool"
                aria-label="Toggle dark mode"
            >
                <div className="transition-transform duration-700 ease-in-out hover:scale-100">
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
