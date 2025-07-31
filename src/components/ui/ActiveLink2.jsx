import { NavLink } from "react-router-dom";
import useScreenSize from "../../hooks/useScreenSize";

const ActiveLink2 = ({ to, children, setSideNavOpen }) => {
    const { isSmallDevice } = useScreenSize();

    return (
        <NavLink
            onClick={() => isSmallDevice && setSideNavOpen(false)}
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "text-primary font-bold description tracking-widest description lg:text-lg text-base"
                    : "text-accent font-bold description tracking-widest description lg:text-lg text-base"
            }
        >
            <span className="hover:scale-105 transition-transform flex items-center justify-between">
                {children}
            </span>
        </NavLink>
    );
};

export default ActiveLink2;
