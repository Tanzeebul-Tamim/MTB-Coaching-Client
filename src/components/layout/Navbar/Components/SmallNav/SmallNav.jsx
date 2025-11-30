import ResponsiveNavbarStart from "./Components/ResponsiveNavbarStart";
import ResponsiveRoutes from "./Components/ResponsiveRoutes";
import ResponsiveRoutesBtn from "./Components/ResponsiveRoutesBtn";
import Logo from "../Utilities/Logo";

const SmallNav = ({ props }) => {
    const {
        isDarkTheme,
        user,
        userBookings,
        userDetails,
        userLoading,
        loading,
        myWallRoute,
        customColor,
        handleLogOut,
        open,
        setOpen,
        location,
        authenticationPage,
        isSmallDevice,
        navigate,
        handleScrollGlow,
        navRef,
    } = props;

    return (
        <div className="from-transparent to-black bg-gradient-to-t fixed z-[1500] gap-5 navbar px-5 transition ease-in-out lg:hidden">
            <ResponsiveNavbarStart
                props={{
                    user,
                    userBookings,
                    userDetails,
                    userLoading,
                    loading,
                    location,
                }}
            />

            <Logo isSmallDevice={isSmallDevice} isDarkTheme={isDarkTheme} />

            <div className="navbar-end">
                <ResponsiveRoutes
                    props={{
                        user,
                        userDetails,
                        myWallRoute,
                        customColor,
                        handleLogOut,
                        open,
                        setOpen,
                        authenticationPage,
                        navigate,
                        handleScrollGlow,
                    }}
                    navRef={navRef}
                />
                <ResponsiveRoutesBtn props={{ setOpen, open }} />
            </div>
        </div>
    );
};

export default SmallNav;
