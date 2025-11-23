import { useEffect, useState } from "react";

const ScrollProgressBar = ({ isFullscreen }) => {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setWidth(scrolled);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div
            className={`fixed top-0 left-0 w-full ${
                isFullscreen ? "h-[0.25rem]" : "h-[0.1rem]"
            } z-[1600]`}
        >
            <div
                className="h-full bg-primary transition-all duration-75"
                style={{ width: `${width}%` }}
            />
        </div>
    );
};

export default ScrollProgressBar;
