import { createContext, useEffect, useState } from "react";

export const ScreenSizeContext = createContext(null);

const ScreenSizeProvider = ({ children }) => {
    const [isSmallDevice, setIsSmallDevice] = useState(null);
    const [splashShown, setSplashShown] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const splashDuration = 1800;

    useEffect(() => {
        const handleResize = () => {
            setIsSmallDevice(window.innerWidth <= 576);
        };

        handleResize(); // check on load

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const doc = document;
            setIsFullscreen(
                !!(
                    doc.fullscreenElement ||
                    doc.webkitFullscreenElement ||
                    doc.mozFullScreenElement ||
                    doc.msFullscreenElement
                )
            );
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener(
            "webkitfullscreenchange",
            handleFullscreenChange
        );
        document.addEventListener(
            "mozfullscreenchange",
            handleFullscreenChange
        );
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);
        // Set initial state
        handleFullscreenChange();
        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "webkitfullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "mozfullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "MSFullscreenChange",
                handleFullscreenChange
            );
        };
    }, []);

    // Fullscreen toggle handler
    const handleFullscreen = () => {
        const doc = document;
        if (
            !doc.fullscreenElement &&
            !doc.webkitFullscreenElement &&
            !doc.mozFullScreenElement &&
            !doc.msFullscreenElement
        ) {
            const el = doc.documentElement;
            if (el.requestFullscreen) el.requestFullscreen();
            else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
            else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
            else if (el.msRequestFullscreen) el.msRequestFullscreen();
        } else {
            if (doc.exitFullscreen) doc.exitFullscreen();
            else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
            else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
            else if (doc.msExitFullscreen) doc.msExitFullscreen();
        }
    };

    const screenInfo = {
        isSmallDevice,
        splashShown,
        setSplashShown,
        splashDuration,
        isFullscreen,
        handleFullscreen,
    };

    return (
        <ScreenSizeContext.Provider value={screenInfo}>
            {children}
        </ScreenSizeContext.Provider>
    );
};

export default ScreenSizeProvider;
