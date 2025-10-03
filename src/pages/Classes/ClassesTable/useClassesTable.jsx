/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { bookClass, getBookedClasses } from "../../../api/bookApi";
import useDarkTheme from "../../../hooks/useDarkTheme";
import { toast } from "react-toastify";
import useSoundEffects from "../../../hooks/useSoundEffects";

const useClassesTable = (userDetails, user) => {
    const [userBookings, setUserBookings] = useState([]);
    const [bookedClasses, setBookedClasses] = useState([]);
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const unpaid = userBookings?.filter(
        (booking) => booking.paymentStatus === "unpaid"
    );
    const paid = userBookings?.filter(
        (booking) => booking.paymentStatus === "paid"
    );
    const { play } = useSoundEffects();

    const handleBook = (isBooked, classItem, booking, setBooking) => {
        const { instructorId, classIndex, startDate, endDate, name } =
            classItem;

        if (!user) {
            play("warning");
            toast.info(
                <div className="text-center">
                    To book a course, you have to <strong>login</strong>{" "}
                    first
                </div>,
                {
                    position: "top-center",
                    autoClose: 1100,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
            setTimeout(function () {
                window.location.replace("/login");
            }, 2000);
        } else if (user && !isBooked) {
            bookClass(
                userDetails?._id,
                instructorId,
                user.email,
                user.displayName,
                classIndex,
                startDate,
                endDate
            );
            setBooking(!booking);
            play("success");
            toast.success(
                <div className="text-center">
                    <span className="font-bold text-green-500 text-[18px]">{name}</span>
                    <br />
                    has been booked
                </div>,
                {
                    position: "top-center",
                    autoClose: 1100,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
        }
    };

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

    const isDarkTheme = useDarkTheme();

    return { bookedClasses, enrolledClasses, isDarkTheme, handleBook };
};

export default useClassesTable;
