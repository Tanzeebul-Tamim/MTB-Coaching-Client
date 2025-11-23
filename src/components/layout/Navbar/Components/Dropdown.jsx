import { BiSupport } from "react-icons/bi";
import ThemeToggle from "../../../ui/ThemeToggle/ThemeToggle";
import { RiRobot2Fill } from "react-icons/ri";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const Dropdown = ({ props }) => {
    const {
        isOpen,
        navigate,
        play,
        handleScrollGlow,
        authenticationPage,
        isFullscreen,
        handleFullscreen,
    } = props;

    return (
        <div
            className={`absolute right-0 top-14 flex nav-btn shadow-lg py-3 px-6 rounded-xl gap-5 tracking-[2px] text-xl items-center transition-opacity ease-in-out duration-300 z-50 bg-black bg-opacity-60 ${
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
                            setTimeout(() => play("alert"), 1000);
                        }, 300);
                    } else {
                        handleScrollGlow();
                        setTimeout(() => play("alert"), 1000);
                    }
                }}
                data-tip="Support Request"
                className="rounded-lg glow-effect h-7 w-7 custom-cursor-pointer bg-primary text-accent bg-opacity-60 flex items-center justify-center outline-none tooltip tooltip-bottom tooltip-secondary"
                aria-label="Support Request"
            >
                <div className="hover:scale-125 transition-transform duration-500 ease-in-out">
                    <BiSupport className="text-xl" />
                </div>
            </button>
            <button
                data-tip="AI Assistant"
                className="rounded-lg glow-effect h-7 w-7 custom-cursor-pointer bg-primary text-accent bg-opacity-60 flex items-center justify-center outline-none tooltip tooltip-bottom tooltip-secondary"
                aria-label="AI Assistant"
            >
                <div className="hover:scale-125 transition-transform duration-500 ease-in-out">
                    <RiRobot2Fill className="text-xl" />
                </div>
            </button>
            <button
                data-tip={`${isFullscreen ? "Exit" : "Toggle"} Fullscreen`}
                className="rounded-lg glow-effect h-7 w-7 custom-cursor-pointer bg-primary text-accent bg-opacity-60 flex items-center justify-center outline-none tooltip tooltip-bottom tooltip-secondary"
                aria-label="Toggle Fullscreen"
                onClick={handleFullscreen}
            >
                <div className="hover:scale-125 hover:rotate-[360deg] transition-transform duration-500 ease-in-out">
                    {isFullscreen ? (
                        <MdFullscreenExit className="text-xl" />
                    ) : (
                        <MdFullscreen className="text-xl" />
                    )}
                </div>
            </button>
            <ThemeToggle />
        </div>
    );
};

export default Dropdown;
