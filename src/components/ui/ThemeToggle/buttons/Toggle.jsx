import { MdDarkMode, MdLightMode } from "react-icons/md";

const Toggle = ({ toggleDarkMode, isDark }) => {
    return (
        <button
            onClick={toggleDarkMode}
            data-tip={`Enable ${isDark ? "Light" : "Dark"} Mode`}
            className="rounded-full glow-effect h-7 w-7 custom-cursor-pointer bg-primary text-accent bg-opacity-60 flex items-center justify-center outline-none tooltip tooltip-right tooltip-secondary tool"
            aria-label="Toggle dark mode"
        >
            <div className="hover:scale-125 transition-transform duration-700 ease-in-out">
                {isDark ? (
                    <MdLightMode className="text-xl" />
                ) : (
                    <MdDarkMode className="text-xl" />
                )}
            </div>
        </button>
    );
};

export default Toggle;
