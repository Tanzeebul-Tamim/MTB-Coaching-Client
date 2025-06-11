import { useEffect, useState } from "react";

const InstallPWAButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [installReady, setInstallReady] = useState(false);
    const [visible, setVisible] = useState(false);

    const duration = 35; // seconds
    const fadeDuration = 2; // seconds

    useEffect(() => {
        let fadeTimeout;
        let removeTimeout;
        const onBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setInstallReady(true);
            setVisible(true);
        };
        window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
        if (installReady) {
            // Start fade out, then hide after fade duration
            fadeTimeout = setTimeout(() => setVisible(false), duration * 1000);
            removeTimeout = setTimeout(() => {
                setInstallReady(false);
                setDeferredPrompt(null);
            }, (duration + fadeDuration) * 1000);
        }
        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                onBeforeInstallPrompt
            );
            if (fadeTimeout) clearTimeout(fadeTimeout);
            if (removeTimeout) clearTimeout(removeTimeout);
        };
    }, [installReady]);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        // Trigger custom prompt
        deferredPrompt.prompt();

        await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        setInstallReady(false);
        setVisible(false);
    };

    // Only render the button if installReady or fading out
    if (!installReady && !visible) return null;

    const animation = visible
        ? "slideInUp 0.5s cubic-bezier(0.23, 1, 1, 1) forwards"
        : "slideOutDown 0.5s cubic-bezier(0.23, 1, 1, 1) forwards";

    return (
        <button
            onClick={handleInstall}
            className="z-[1000] fixed lg:bottom-5 bottom-3 lg:right-5 right-3 lg:text-base text-sm bg-yellow-500 bg-opacity-70 hover:bg-opacity-80 hover:bg-yellow-400 text-white hover:text-black lg:px-5 px-3 lg:py-3 py-1 font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out glow-effect tracking-wider lg:tracking-widest"
            style={{ animation }}
        >
            🚴‍♂️ Install the App
        </button>
    );
};

export default InstallPWAButton;
