import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useScreenSize from "../../../hooks/useScreenSize";
import useUserData from "../../../hooks/useUserData";
import { getBookedClasses } from "../../../api/bookApi";

const useSideNav = () => {
    const { loading, user, booking, setBooking } = useAuth();
    const [title, setTitle] = useState("User");
    const { isSmallDevice } = useScreenSize();
    const [paidBookings, setPaidBookings] = useState([]);
    const { loading: userLoading, userDetails } = useUserData();

    useEffect(() => {
        if (!loading && !userLoading) {
            if (userDetails?.role === "Instructor") {
                setTitle("Instructor");
            } else if (userDetails?.role === "Student") {
                setTitle("Student");
            }
        }
    }, [loading, userDetails?.role, userLoading]);

    useEffect(() => {
        if (user && user.email && userDetails?._id) {
            getBookedClasses(userDetails?._id)
                .then((data) => {
                    setPaidBookings(
                        data.filter(
                            (booking) => booking.paymentStatus === "paid"
                        )
                    );
                    setBooking(
                        data.filter(
                            (booking) => booking.paymentStatus === "unpaid"
                        )
                    );
                })
                .catch((error) => console.error(error));
        } else if (!user) {
            setPaidBookings([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetails, booking]);

    return {
        title,
        isSmallDevice,
        paidBookings,
        userDetails,
        loading,
        userLoading,
        booking,
    };
};

export default useSideNav;
