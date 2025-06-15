import useThemeToggle from "./useThemeToggle";
import DashboardButton from "./buttons/DashboardButton";
import MobileToggle from "./buttons/MobileToggle";
import Toggle from "./buttons/Toggle";

const ThemeToggle = () => {
    const { isDark, isSmallDevice, isDashboard, toggleDarkMode } =
        useThemeToggle();

    if (isDashboard) {
        return (
            <DashboardButton toggleDarkMode={toggleDarkMode} isDark={isDark} />
        );
    }

    if (isSmallDevice) {
        return <MobileToggle isDark={isDark} toggleDarkMode={toggleDarkMode} />;
    } else {
        return <Toggle toggleDarkMode={toggleDarkMode} isDark={isDark} />;
    }
};

export default ThemeToggle;
