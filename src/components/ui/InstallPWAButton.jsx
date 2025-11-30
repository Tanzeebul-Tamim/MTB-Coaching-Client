import { useEffect, useState } from "react";
import "../../styles/pwa.css";
import { IoMdClose } from "react-icons/io";
import useScreen from "../../hooks/useScreen";
import usePWAInstall from "../../hooks/usePWAInstall";

const InstallPWAButton = () => {
    const { install: handleInstall, installReady } = usePWAInstall();
    const { isSmallDevice } = useScreen();

    const [visible, setVisible] = useState(false);
    const [closed, setClosed] = useState(false);
    const [dismissCount, setDismissCount] = useState(0);
    const [side, setSide] = useState(isSmallDevice ? false : true); // true = right, false = left

    const duration = 20; // seconds the button stays fully visible
    const reappearEvery = 90; // seconds between reappearances
    const fadeDuration = 1.5; // seconds for fade-out

    // When install becomes ready, show the button for the first time
    useEffect(() => {
        if (!installReady) return;
        setVisible(true);

        const interval = setInterval(() => {
            setVisible(true);
        }, reappearEvery * 1000);

        return () => clearInterval(interval);
    }, [installReady, closed]);

    // Swap sides after fade out
    useEffect(() => {
        if (!visible) {
            setTimeout(() => setSide((s) => !s), fadeDuration * 1000);
        }
    }, [visible]);

    // Auto hide after duration
    useEffect(() => {
        if (!visible || closed) return;

        const hide = setTimeout(() => {
            setVisible(false);
        }, duration * 1000);

        return () => clearTimeout(hide);
    }, [visible, closed]);

    const handleClose = (e) => {
        e.stopPropagation();
        setClosed(true);
        setVisible(false);

        setDismissCount((c) => c + 1);

        setTimeout(() => {
            setClosed(false);
        }, (reappearEvery + 5 * dismissCount) * 1000);
    };

    // Should not render at all
    if (closed || (!installReady && !visible)) return null;

    const animation = visible
        ? `slideInUp ${fadeDuration}s cubic-bezier(0.23, 1, 1, 1) forwards`
        : `slideOutDown ${fadeDuration}s cubic-bezier(0.23, 1, 1, 1) forwards`;

    const btnCls = `z-[1000] glow-effect lg:bottom-5 bottom-3 ${
        side ? "lg:right-5 right-3" : "lg:left-5 left-3"
    } lg:text-base text-sm bg-primary dark:bg-opacity-70 bg-opacity-75 hover:bg-opacity-80 text-accent transition-all duration-500 ease-in-out lg:px-5 px-3 lg:py-3 py-1 font-semibold rounded-full shadow-lg tracking-wider lg:tracking-widest`;

    const pointerEvents = visible ? "auto" : "none";

    return (
        <div
            style={{ animation, pointerEvents }}
            className={`z-[1000] fixed lg:bottom-5 bottom-3 ${
                side ? "lg:right-5 right-3" : "lg:left-5 left-3"
            } flex items-center`}
        >
            <button
                className={`absolute ${
                    side ? "lg:-left-3 -left-2" : "lg:-right-3 -right-2"
                } bg-accent text-secondary rounded-full lg:w-7 w-4 lg:h-7 h-4 flex items-center justify-center text-lg shadow-md border border-primary glow-effect`}
                style={{ zIndex: 1001 }}
                aria-label="Close install button"
                onClick={handleClose}
            >
                <IoMdClose />
            </button>

            <button
                onClick={handleInstall}
                className={btnCls}
                style={{ pointerEvents: "auto" }}
            >
                🚴‍♂️ Install Web App
            </button>
        </div>
    );
};

export default InstallPWAButton;
