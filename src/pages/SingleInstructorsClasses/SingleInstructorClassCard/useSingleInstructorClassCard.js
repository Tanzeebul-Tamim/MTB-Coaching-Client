/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useUserData from "../../../hooks/useUserData";
import { bookClass, getBookedClasses } from "../../../api/bookApi";
import { toast } from "react-toastify";

const useSingleInstructorClassCard = (classItem, instructorId, index) => {
    const availableSeat = classItem.studentSlot - classItem.totalStudent;
    const { user, booking, setBooking, loading } = useAuth();
    const [userBookings, setUserBookings] = useState([]);
    const [bookedClasses, setBookedClasses] = useState([]);
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const unpaid = userBookings?.filter(
        (booking) => booking.paymentStatus === "unpaid"
    );
    const paid = userBookings?.filter(
        (booking) => booking.paymentStatus === "paid"
    );
    const { loading: userLoading, userDetails } = useUserData();

    useEffect(() => {
        if (user && user.email && userDetails?._id) {
            getBookedClasses(userDetails?._id)
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

    const isBooked = bookedClasses && bookedClasses.includes(classItem.name);
    const isEnrolled =
        enrolledClasses && enrolledClasses.includes(classItem.name);

    const handleBook = () => {
        if (user && !isBooked) {
            bookClass(
                userDetails?._id,
                instructorId,
                user.email,
                user.displayName,
                index,
                classItem.startDate,
                classItem.endDate
            );
            setBooking(!booking);
            toast.success(`"${classItem.name}" has been booked`, {
                position: "top-center",
                autoClose: 1100,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return {
        availableSeat,
        loading,
        userLoading,
        isEnrolled,
        handleBook,
        userDetails,
        isBooked,
    };
};

export default useSingleInstructorClassCard;
