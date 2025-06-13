import { useEffect, useState } from "react";

const useDarkTheme = () => {
    const [theme, setTheme] = useState(() =>
        document.documentElement.classList.contains("dark") ? true : false
    );

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains("dark");
            setTheme(isDark ? true : false);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return theme; // true or false
};

export default useDarkTheme;
