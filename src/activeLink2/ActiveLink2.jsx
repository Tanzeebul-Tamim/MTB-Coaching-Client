import { NavLink } from "react-router-dom";
import useScreenSize from "../hooks/useScreeSize";

const ActiveLink2 = ({ to, children, setSideNavOpen }) => {
    const { isSmallDevice } = useScreenSize();

    return (
        <NavLink
            onClick={() => isSmallDevice && setSideNavOpen(false)}
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "text-yellow-500 font-bold description tracking-widest description lg:text-lg text-base"
                    : "text-white font-bold description tracking-widest description lg:text-lg text-base"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink2;
