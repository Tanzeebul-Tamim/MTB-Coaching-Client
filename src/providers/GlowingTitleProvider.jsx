import { useState, createContext } from "react";
import { toast } from "react-toastify";
import useScreen from "../hooks/useScreen";
import useAuth from "../hooks/useAuth";
import useSoundEffects from "../hooks/useSoundEffects";

export const GlowingTitleContext = createContext(null);

const sections = [
    "gettingStarted",
    "troubleShooting",
    "accountAndData",
    "contactSupport",
    "privacy",
    "termsOfService",
    "userDataDeletion",
    "cookieNotice",
    "support",
];

const GlowingTitleProvider = ({ children }) => {
    const { isSmallDevice } = useScreen();
    const { user } = useAuth();
    const { play } = useSoundEffects();

    const glowingSections = sections.map((section) => section + "Glow");

    // Footer sections' states
    const [glows, setGlows] = useState(
        glowingSections.reduce(
            (acc, section) => ({ ...acc, [section]: false }),
            {}
        )
    );

    const Message = () => (
        <div className="text-center">
            <span className="font-bold text-blue-500 text-[18px]">
                Hey {user ? user?.displayName?.split(" ")[0] : "rider"}!
            </span>{" "}
            <br />
            <span className={`text-sm ${!isSmallDevice && "text-justify"}`}>
                Fill out the <strong>&quot;Support Request&quot;</strong> form
                to report your issue.
            </span>
        </div>
    );

    const config = {
        delay: 1000,
        position: "top-center",
        autoClose: 3100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const triggerGlow = (section, duration1 = 500, duration2 = 4000) => {
        setTimeout(() => {
            setGlows((prev) => {
                for (const [key] of Object.entries(prev)) {
                    prev[key] = false;
                }
                return { ...prev, [section]: true };
            });
        }, duration1);
        setTimeout(() => {
            setGlows((prev) => ({ ...prev, [section]: false }));
        }, duration2);
    };

    const handleScrollGlow = async () => {
        toast.info(<Message />, config);

        const start = performance.now();
        const target = document.body.scrollHeight;

        triggerGlow("supportGlow", 0, isSmallDevice ? 1200 : 800);

        window.scrollTo({
            top: target,
            behavior: "smooth",
        });

        const duration = await new Promise((resolve) => {
            const checkScroll = () => {
                const current = window.scrollY + window.innerHeight;

                if (current >= target - 2) {
                    const end = performance.now();
                    resolve(end - start);
                } else {
                    requestAnimationFrame(checkScroll);
                }
            };

            requestAnimationFrame(checkScroll);
        });

        setTimeout(() => play("alert"), Math.max(duration - 100, 0));

        return duration;
    };

    // dynamically create handlers for other sections
    const handlers = glowingSections.reduce(
        (acc, glowingSection) => {
            if (glowingSection !== "supportGlow")
                acc[
                    `handle${
                        glowingSection[0].toUpperCase() +
                        glowingSection.slice(1)
                    }`
                ] = () => triggerGlow(glowingSection);
            return acc;
        },
        { handleScrollGlow }
    );

    return (
        <GlowingTitleContext.Provider value={{ ...glows, ...handlers }}>
            {children}
        </GlowingTitleContext.Provider>
    );
};

export default GlowingTitleProvider;
