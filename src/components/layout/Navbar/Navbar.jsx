import "../../../styles/navbar.css";
import useNavbar from "./useNavbar";
import ScrollProgressBar from "./ScrollbarProgress";
import LargeNav from "./Components/LargeNav/LargeNav";
import SmallNav from "./Components/SmallNav/SmallNav";

const Navbar = ({ authenticationPage }) => {
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
        location,
        isSmallDevice,
        navigate,
        handleScrollGlow,
        isFullscreen,
        handleFullscreen,
        dropdownOpen,
        setDropdownOpen,
        navRef,
    } = useNavbar();

    return (
        <>
            {!authenticationPage && (
                <ScrollProgressBar isFullscreen={isFullscreen} />
            )}
            {/* For large Devices */}
            <LargeNav
                props={{
                    isDarkTheme,
                    user,
                    myWallRoute,
                    userDetails,
                    handleLogOut,
                    userLoading,
                    userBookings,
                    loading,
                    location,
                    navigate,
                    handleScrollGlow,
                    authenticationPage,
                    isFullscreen,
                    handleFullscreen,
                    dropdownOpen,
                    setDropdownOpen,
                }}
            />

            {/* For mobile devices */}
            <SmallNav
                props={{
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
                }}
            />
        </>
    );
};

export default Navbar;
