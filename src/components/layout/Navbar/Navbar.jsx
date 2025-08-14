import { Link } from "react-router-dom";
import "../../../styles/navbar.css";
import ResponsiveRoutes from "./Components/ResponsiveRoutes";
import Routes from "./Components/Routes";
import NavbarEnd from "./Components/NavbarEnd";
import ResponsiveNavbarEnd from "./Components/ResponsiveNavbarEnd";
import { useRef } from "react";
import useNavbar from "./useNavbar";
import ResponsiveRoutesBtn from "./Components/ResponsiveRoutesBtn";

const Navbar = () => {
    const navRef = useRef(null);
    const {
        isDarkTheme,
        loading,
        userBookings,
        userLoading,
        myWallRoute,
        handleLogOut,
        customColor,
        userDetails,
        user,
        open,
        setOpen,
        location
    } = useNavbar();

    const Logo = ({ screen }) => (
        <Link to="/">
            <img
                className={`w-[400px] ${screen} hover:scale-110 duration-200 transition-transform`}
                src={`/assets/MTB_Coaching_${
                    isDarkTheme ? "Dark" : "Light"
                }.png`}
                alt="Logo"
            />
        </Link>
    );

    return (
        <div className="from-transparent to-black bg-gradient-to-t fixed z-[1500] gap-5 navbar px-5 lg:px-10 lg:py-8 transition ease-in-out">
            <div className="navbar-start gap-1 lg:gap-6 flex items-center">
                <ResponsiveRoutes
                    props={{
                        user,
                        userDetails,
                        myWallRoute,
                        customColor,
                        handleLogOut,
                        open,
                        setOpen,
                    }}
                    navRef={navRef}
                />
                <ResponsiveRoutesBtn props={{ setOpen, open }} />
                <Logo screen="hidden lg:block" />
            </div>

            <Logo screen="lg:hidden" />

            <Routes props={{ user, myWallRoute, userDetails }} />

            <NavbarEnd
                props={{
                    user,
                    handleLogOut,
                    userDetails,
                    userLoading,
                    userBookings,
                    loading,
                    location
                }}
            />

            <ResponsiveNavbarEnd
                props={{
                    user,
                    userBookings,
                    userDetails,
                    userLoading,
                    loading,
                    location
                }}
            />
        </div>
    );
};

export default Navbar;
