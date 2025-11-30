import { useEffect, useRef, useState } from "react";
import useDarkTheme from "../../../hooks/useDarkTheme";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useUserData from "../../../hooks/useUserData";
import { getBookedClasses } from "../../../api/bookApi";
import useScreen from "../../../hooks/useScreen";
import useGlowingTitle from "../../../hooks/useGlowingTitle";

const useNavbar = () => {
    const isDarkTheme = useDarkTheme();
    const { isSmallDevice, isFullscreen, handleFullscreen } = useScreen();
    const [open, setOpen] = useState(false);
    const customColor = "text-secondary";
    const { user, logOut, loading, booking } = useAuth();
    const [userBookings, setUserBookings] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { handleScrollGlow } = useGlowingTitle();
    const navRef = useRef(null);

    const checkPrivatePath =
        location.pathname === "/" ||
        location.pathname === "/instructors" ||
        location.pathname === "/classes" ||
        location.pathname === "/legal" ||
        location.pathname === "/about-us";

    if (!user && checkPrivatePath) {
        localStorage.setItem("location", location.pathname);
    }

    const { userDetails, setUserDetails, loading: userLoading } = useUserData();
    const myWallRoute = `/instructors/${userDetails?._id}`;

    useEffect(() => {
        if (user && user.email && userDetails?._id) {
            getBookedClasses(userDetails?._id)
                .then((data) => {
                    const filteredBookings = data.filter(
                        (booking) => booking.paymentStatus === "unpaid"
                    );
                    setUserBookings(filteredBookings);
                })
                .catch((error) => console.error(error));
        } else if (!user) {
            setUserDetails({});
            setUserBookings([]);
        }
    }, [user, userDetails?._id, booking, setUserDetails]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                open &&
                navRef.current &&
                !navRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleLogOut = () => {
        logOut()
            .then()
            .catch((error) => console.error(error));
    };

    return {
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
    };
};

export default useNavbar;
