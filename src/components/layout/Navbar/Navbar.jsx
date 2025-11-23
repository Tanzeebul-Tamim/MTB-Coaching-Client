import "../../../styles/navbar.css";
import useNavbar from "./useNavbar";
import LargeNav from "./Components/LargeNav";
import SmallNav from "./Components/SmallNav";
import ScrollProgressBar from "./Components/ScrollbarProgress";

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
        play,
        handleScrollGlow,
        isFullscreen,
        handleFullscreen,
        dropdownOpen,
        setDropdownOpen,
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
                    play,
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
                }}
            />
        </>
    );
};

export default Navbar;
