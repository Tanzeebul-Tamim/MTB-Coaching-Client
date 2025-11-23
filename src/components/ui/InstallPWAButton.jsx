import { useEffect, useState } from "react";
import "../../styles/pwa.css";
import useAuth from "../../hooks/useAuth";
import { IoMdClose } from "react-icons/io";
import useScreen from "../../hooks/useScreen";

const InstallPWAButton = () => {
    const { isIOS } = useAuth();
    const { isSmallDevice } = useScreen();
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [installReady, setInstallReady] = useState(false);
    const [visible, setVisible] = useState(false);
    const [closed, setClosed] = useState(false);
    const [dismissCount, setDismissCount] = useState(0);
    const [side, setSide] = useState(isSmallDevice ? false : true); // true = right, false = left

    const duration = 20; // seconds the button stays fully visible
    const reappearEvery = 90; // seconds between reappearances
    const fadeDuration = 1.5; // seconds for fade-out

    useEffect(() => {
        const onBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setInstallReady(true);
            setVisible(true);
        };

        window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                onBeforeInstallPrompt
            );
        };
    }, []);

    // Swap sides
    useEffect(() => {
        if (!visible) {
            setTimeout(() => setSide((side) => !side), 1000 * fadeDuration);
        }
    }, [setVisible, visible]);

    useEffect(() => {
        if (!installReady) return;

        setVisible(true);

        const interval = setInterval(() => {
            setVisible(true); // Re-show every N seconds
        }, reappearEvery * 1000);

        return () => clearInterval(interval);
    }, [installReady, closed]);

    useEffect(() => {
        if (!visible || closed) return;

        const hideTimeout = setTimeout(() => {
            setVisible(false);
        }, duration * 1000); // Fade out after duration

        return () => clearTimeout(hideTimeout);
    }, [visible, closed]);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        await deferredPrompt.userChoice;

        setDeferredPrompt(null);
        setInstallReady(false);
        setVisible(false);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setClosed(true);
        setVisible(false);

        // Mark it dismissed so next cycle is longer
        setDismissCount((c) => c++);

        // Reset closed after delay (so it's allowed to reappear)
        setTimeout(() => {
            setClosed(false);
        }, (reappearEvery + 5 * dismissCount) * 1000);
    };

    // Don't render if closed, or not ready and not visible
    if (closed || (!installReady && !visible)) return null;

    const animation = visible
        ? `slideInUp ${fadeDuration}s cubic-bezier(0.23, 1, 1, 1) forwards`
        : `slideOutDown ${fadeDuration}s cubic-bezier(0.23, 1, 1, 1) forwards`;

    const btnCls = `z-[1000] glow-effect lg:bottom-5 bottom-3 ${
        side ? "lg:right-5 right-3" : "lg:left-5 left-3"
    } lg:text-base text-sm bg-primary dark:bg-opacity-70 bg-opacity-75 hover:bg-opacity-80 text-accent transition-all duration-500 ease-in-out lg:px-5 px-3 lg:py-3 py-1 font-semibold rounded-full shadow-lg tracking-wider lg:tracking-widest`;

    // pointer-events: none when not visible, auto when visible
    const pointerEvents = visible ? "auto" : "none";

    if (isIOS) {
        // iOS Safari does not support before installprompt
        return (
            <div
                style={{
                    animation: `slideInUp ${fadeDuration}s cubic-bezier(0.23, 1, 1, 1) forwards`,
                    pointerEvents,
                }}
                className={`z-[1000] fixed lg:bottom-5 bottom-3 ${
                    side ? "lg:right-5 right-3" : "lg:left-5 left-3"
                }`}
            >
                <button
                    className={`absolute -top-2 ${
                        side ? "-right-2" : "-left-2"
                    } bg-accent text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md border border-primary`}
                    style={{ zIndex: 1001 }}
                    aria-label="Close install button"
                    onClick={handleClose}
                >
                    ×
                </button>
                <button
                    className={btnCls}
                    style={{ pointerEvents: "auto" }}
                    onClick={() => {
                        alert(
                            "To install this app, tap the Share icon (square with arrow) and choose 'Add to Home Screen'."
                        );
                    }}
                >
                    🚴‍♂️ Install the App
                </button>
            </div>
        );
    }

    return (
        <div
            style={{
                animation,
                pointerEvents,
            }}
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
                🚴‍♂️ Install the App
            </button>
        </div>
    );
};

export default InstallPWAButton;
