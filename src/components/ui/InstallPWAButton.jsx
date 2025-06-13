import { useEffect, useState } from "react";

const InstallPWAButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [installReady, setInstallReady] = useState(false);
    const [visible, setVisible] = useState(false);

    const duration = 30; // seconds the button stays fully visible
    const reappearEvery = 90; // seconds between reappearances
    const fadeDuration = 2; // seconds for fade-out

    useEffect(() => {
        const onBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setInstallReady(true);
            setVisible(true);
        };

        window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
        return () => {
            window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
        };
    }, []);

    useEffect(() => {
        if (!installReady) return;

        setVisible(true);

        const interval = setInterval(() => {
            setVisible(true); // Re-show every N seconds
        }, reappearEvery * 1000);

        return () => clearInterval(interval);
    }, [installReady]);

    useEffect(() => {
        if (!visible) return;

        const hideTimeout = setTimeout(() => {
            setVisible(false);
        }, duration * 1000); // Fade out after duration

        return () => clearTimeout(hideTimeout);
    }, [visible]);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        await deferredPrompt.userChoice;

        setDeferredPrompt(null);
        setInstallReady(false);
        setVisible(false);
    };

    if (!installReady && !visible) return null;

    const animation = visible
        ? `slideInUp ${fadeDuration}s cubic-bezier(0.23, 1, 1, 1) forwards`
        : `slideOutDown ${fadeDuration}s cubic-bezier(0.23, 1, 1, 1) forwards`;

    return (
        <button
            onClick={handleInstall}
            className="z-[1000] fixed lg:bottom-5 bottom-3 lg:right-5 right-3 lg:text-base text-sm bg-primary bg-opacity-70 hover:bg-opacity-80 hover:bg-secondary text-accent hover:text-accent lg:px-5 px-3 lg:py-3 py-1 font-semibold rounded-full shadow-lg transition-all duration-500 ease-in-out glow-effect tracking-wider lg:tracking-widest"
            style={{ animation }}
        >
            🚴‍♂️ Install the App
        </button>
    );
};

export default InstallPWAButton;