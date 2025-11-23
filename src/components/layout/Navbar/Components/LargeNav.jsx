import Logo from "./Logo";
import Routes from "./Routes";
import NavbarEnd from "./NavbarEnd";
import Dropdown from "./Dropdown";

const LargeNav = ({ props }) => {
    const {
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
    } = props;

    return (
        <div className="from-transparent to-black bg-gradient-to-t fixed z-[1500] gap-5 navbar px-10 py-8 transition ease-in-out hidden lg:flex">
            <div className="navbar-start gap-6 flex items-center">
                <Logo isDarkTheme={isDarkTheme} />
            </div>

            <div
                onMouseLeave={() => setDropdownOpen(false)}
                className="navbar-center uppercase relative"
            >
                <Routes
                    props={{
                        user,
                        myWallRoute,
                        userDetails,
                        dropdownOpen,
                        setDropdownOpen,
                    }}
                />
                <Dropdown
                    props={{
                        isOpen: dropdownOpen,
                        navigate,
                        play,
                        handleScrollGlow,
                        authenticationPage,
                        isFullscreen,
                        handleFullscreen,
                    }}
                />
            </div>

            <NavbarEnd
                props={{
                    user,
                    handleLogOut,
                    userDetails,
                    userLoading,
                    userBookings,
                    loading,
                    location,
                }}
            />
        </div>
    );
};

export default LargeNav;
