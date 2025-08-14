import { useEffect, useState } from "react";
import useDarkTheme from "../../../hooks/useDarkTheme";
import useAuth from "../../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import useUserData from "../../../hooks/useUserData";
import { getBookedClasses } from "../../../api/bookApi";

const useNavbar = () => {
    const isDarkTheme = useDarkTheme();
    const [open, setOpen] = useState(false);
    const customColor = "text-secondary";
    const { user, logOut, loading, booking } = useAuth();
    const [userBookings, setUserBookings] = useState([]);
    const location = useLocation();
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
        location
    };
};

export default useNavbar;
