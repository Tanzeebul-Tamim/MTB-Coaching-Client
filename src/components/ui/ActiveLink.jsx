import { NavLink, useLocation } from "react-router-dom";
import useUserData from "../../hooks/useUserData";

const ActiveLink = ({ to, children, customColor, dark: isDark }) => {
    const { userDetails } = useUserData();
    const myWallRoute = `/instructors/${userDetails._id}`;
    const location = useLocation();
    const primary =
        location.pathname === myWallRoute ? "text-accent" : "text-primary";

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? primary
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
