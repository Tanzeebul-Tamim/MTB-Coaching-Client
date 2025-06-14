/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getBookedClasses } from "../../../api/bookApi";
import useDarkTheme from "../../../hooks/useDarkTheme";

const useClassesTable = ( userDetails, user ) => {
    const [userBookings, setUserBookings] = useState([]);
    const [bookedClasses, setBookedClasses] = useState([]);
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const unpaid = userBookings?.filter(
        (booking) => booking.paymentStatus === "unpaid"
    );
    const paid = userBookings?.filter(
        (booking) => booking.paymentStatus === "paid"
    );

    useEffect(() => {
        if (user && user.email && userDetails._id) {
            getBookedClasses(userDetails._id)
                .then((data) => {
                    setUserBookings(data);
                })
                .catch((error) => console.error(error));
        } else if (!user) {
            setUserBookings(null);
            setBookedClasses(null);
            setEnrolledClasses(null);
        }
    }, [userDetails, userBookings]);

    useEffect(() => {
        if (unpaid?.length > 0) {
            const bookedClassNames = unpaid.map(
                (booking) => booking["class-name"]
            );
            setBookedClasses(bookedClassNames);
        }
        if (paid?.length > 0) {
            const enrolledClassNames = paid.map(
                (booking) => booking["class-name"]
            );
            setEnrolledClasses(enrolledClassNames);
        }
    }, [userBookings, user]);

    const isDarkTheme = useDarkTheme();

    return { bookedClasses, enrolledClasses, isDarkTheme };
};

export default useClassesTable;
