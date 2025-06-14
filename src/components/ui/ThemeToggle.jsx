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
                className="transition-all duration-300 ease-in-out font-bold flex gap-3 items-center tracking-widest description lg:text-lg text-base"
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
            <div className="flex justify-between gap-2">
                <span>
                    {isDark ? (
                        <span className="text-yellow-100 flex items-center gap-1">
                            <MdLightMode className="text-sm" />
                            <span>Light</span>
                        </span>
                    ) : (
                        <span className="text-blue-700 flex items-center gap-1">
                            <MdDarkMode className="text-sm" />
                            <span>Dark</span>
                        </span>
                    )}
                </span>
                <label className="flex cursor-pointer select-none items-center transition">
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={isDark}
                            onChange={toggleDarkMode}
                            className="sr-only"
                        />
                        <div
                            className={`box block h-[16px] w-[28px] rounded-full ${
                                isDark ? "bg-yellow-500" : "bg-amber-400"
                            }`}
                        ></div>
                        {isDark ? (
                            <div
                                className="absolute left-[2px] top-[2px] flex h-[12px] w-[12px] items-center justify-center rounded-full bg-white border-1 border-black transition translate-x-full 
                            "
                            >
                            </div>
                        ) : (
                            <div
                                className="absolute left-[2px] top-[2px] flex h-[12px] w-[12px] items-center justify-center rounded-full bg-white border-1 border-black transition
                            "
                            >
                            </div>
                        )}
                    </div>
                </label>
            </div>
        );
    } else {
        return (
            <button
                onClick={toggleDarkMode}
                data-tip={`Enable ${isDark ? "Light" : "Dark"} Mode`}
                className="rounded-full glow-effect h-7 w-7 cursor-pointer bg-primary text-accent bg-opacity-60 flex items-center justify-center outline-none tooltip tooltip-right tooltip-secondary tool"
                aria-label="Toggle dark mode"
            >
                <div className="hover:scale-125 transition-transform duration-700 ease-in-out">
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
