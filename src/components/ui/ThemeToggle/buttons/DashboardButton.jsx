import { MdDarkMode, MdLightMode } from "react-icons/md";

const DashboardButton = ({ toggleDarkMode, isDark }) => {
    return (
        <div
            onClick={toggleDarkMode}
            className="transition-all duration-300 ease-in-out font-bold flex gap-3 items-center tracking-widest description lg:text-lg text-base custom-cursor-pointer"
        >
            {isDark ? (
                <>
                    <MdLightMode className="text-xl" />
                    Light Mode
                </>
            ) : (
                <>
                    <MdDarkMode className="text-xl" />
                    Dark Mode
                </>
            )}
        </div>
    );
};

export default DashboardButton;
