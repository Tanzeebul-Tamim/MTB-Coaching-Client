import { useState, createContext } from "react";
import { toast } from "react-toastify";
import useScreenSize from "../hooks/useScreenSize";
import useAuth from "../hooks/useAuth";

export const GlowingTitleContext = createContext(null);

const GlowingTitleProvider = ({ children }) => {
    const [supportGlow, setSupportGlow] = useState(false);
    const { isSmallDevice } = useScreenSize();
    const { user } = useAuth();

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

    const handleScrollGlow = () => {
        toast.info(<Message />, config);
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
        setSupportGlow(true);
        setTimeout(() => setSupportGlow(false), 4000);
    };

    const info = {
        supportGlow,
        handleScrollGlow,
    };

    return (
        <GlowingTitleContext.Provider value={info}>
            {children}
        </GlowingTitleContext.Provider>
    );
};

export default GlowingTitleProvider;
