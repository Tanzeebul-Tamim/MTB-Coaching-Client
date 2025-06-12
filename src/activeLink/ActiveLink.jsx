import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children, customColor, dark }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "text-amber-300"
                    : customColor
                    ? customColor
                    : dark
                    ? "text-[#f5f3f0]"
                    : "text-base-content"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;
