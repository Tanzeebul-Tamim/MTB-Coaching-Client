import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children, customColor, dark: isDark }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "text-primary"
                    : customColor
                    ? customColor
                    : isDark
                    ? "text-accent"
                    : "text-base-content"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;
