import { useEffect, useState } from "react";
import "../../styles/splashscreen.css";

const SplashScreen = ({ onLogoLoaded, duration }) => {
    const [hide, setHide] = useState(false);
    const [showText, setShowText] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setHide(true), duration - 300);
        const textTimer = setTimeout(() => setShowText(true), duration - 1500);
        return () => {
            clearTimeout(timer);
            clearTimeout(textTimer);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center splash splash-fade bg-gradient-to-tr from-[#36280f] via-[#896727] to-[#e1a941]
 ${hide ? "hide" : ""} transition-opacity duration-700`}
        >
            <div className="relative flex items-center justify-center">
                <div className="absolute animate-spin-slow rounded-full bg-gradient-to-tr from-primary to-accent opacity-40 blur-2xl w-56 h-56" />
                <img
                    src="/public/logo.png"
                    alt="Logo"
                    className="lg:w-40 w-36 lg:h-40 h-36 drop-shadow-2xl z-10 animate-pulse"
                    onLoad={onLogoLoaded}
                />
            </div>
            <div
                className={`mt-8 text-yellow-100 font-extrabold text-2xl tracking-widest transition-opacity duration-700 ${
                    showText ? "opacity-100" : "opacity-0"
                }`}
            >
                MTB Coaching Network
            </div>
            <div
                className={`mt-2 text-yellow-50 text-sm font-light tracking-widest transition-opacity duration-700 ${
                    showText ? "opacity-80" : "opacity-0"
                }`}
            >
                Empowering Riders. Building Community.
            </div>
        </div>
    );
};

export default SplashScreen;
