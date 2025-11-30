import { BiSupport } from "react-icons/bi";
import ThemeToggle from "../../../../../ui/ThemeToggle/ThemeToggle";
import { RiRobot2Fill } from "react-icons/ri";
import {
    MdFullscreen,
    MdFullscreenExit,
    MdInstallDesktop,
} from "react-icons/md";
import usePWAInstall from "../../../../../../hooks/usePWAInstall";

const Dropdown = ({ props }) => {
    const {
        isOpen,
        navigate,
        handleScrollGlow,
        authenticationPage,
        isFullscreen,
        handleFullscreen,
    } = props;

    const className =
        "rounded-lg glow-effect h-7 w-7 custom-cursor-pointer bg-primary text-accent bg-opacity-60 flex items-center justify-center outline-none tooltip tooltip-bottom tooltip-secondary";
    const { install, installReady } = usePWAInstall();

    return (
        <div
            className={`absolute right-0 top-14 flex nav-btn shadow-lg py-3 px-6 rounded-xl gap-5 tracking-[2px] text-xl items-center transition-opacity ease-in-out duration-300 z-50 bg-black bg-opacity-50 ${
                isOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            <button
                onClick={() => {
                    if (authenticationPage) {
                        navigate("/");
                        setTimeout(() => {
                            handleScrollGlow();
                        }, 300);
                    } else handleScrollGlow();
                }}
                data-tip="Support Request"
                className={className}
                aria-label="Support Request"
            >
                <div className="hover:scale-125 transition-transform duration-500 ease-in-out">
                    <BiSupport className="text-xl" />
                </div>
            </button>
            {installReady && (
                <button
                    onClick={install}
                    data-tip="Install Web App"
                    className="rounded-lg glow-effect h-7 w-7 custom-cursor-pointer bg-primary text-accent bg-opacity-60 flex items-center justify-center outline-none tooltip tooltip-bottom tooltip-secondary"
                    aria-label="Install Web App"
                >
                    <div className="hover:scale-125 transition-transform duration-500 ease-in-out">
                        <MdInstallDesktop className="text-xl" />
                    </div>
                </button>
            )}
            <button
                data-tip="AI Assistant (Coming Soon)"
                className={className}
                aria-label="AI Assistant"
            >
                <div className="hover:scale-125 transition-transform duration-500 ease-in-out">
                    <RiRobot2Fill className="text-xl" />
                </div>
            </button>
            <button
                data-tip={`${isFullscreen ? "Exit" : "Toggle"} Fullscreen`}
                className={className}
                aria-label="Toggle Fullscreen"
                onClick={handleFullscreen}
            >
                <div className="hover:scale-125 hover:rotate-90 transition-transform duration-500 ease-in-out">
                    {isFullscreen ? (
                        <MdFullscreenExit className="text-xl" />
                    ) : (
                        <MdFullscreen className="text-xl" />
                    )}
                </div>
            </button>
            <ThemeToggle dropDownClass={className} />
        </div>
    );
};

export default Dropdown;
