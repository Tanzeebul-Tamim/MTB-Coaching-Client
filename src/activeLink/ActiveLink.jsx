import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children, customColor }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "text-amber-300"
                    : customColor
                    ? customColor
                    : "text-white"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;
