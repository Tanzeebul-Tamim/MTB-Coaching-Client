import { useEffect, useState } from "react";
import useScreen from "./useScreen";

export default function usePWAInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const { pwaInstallReady: installReady, setPWAInstallReady } = useScreen();

    useEffect(() => {
        const onBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setPWAInstallReady(true);
        };

        window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                onBeforeInstallPrompt
            );
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const install = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        setPWAInstallReady(false);
    };

    return { install, installReady };
}
