import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useScreenSize from "../../hooks/useScreenSize";
import useUserData from "../../hooks/useUserData";
import {
    deleteAllClass,
    deleteClass,
    getBookedClasses,
} from "../../api/bookApi";
import Swal from "sweetalert2";
import usePagination from "../../hooks/usePagination";
import useTitle from "../../hooks/useTitle";

const useSelectedClasses = () => {
    const { user } = useAuth();
    const [unpaidBookings, setUnpaidBookings] = useState([]);
    const { isSmallDevice } = useScreenSize();
    const { loading, userDetails } = useUserData();
    useTitle("| Booked Courses");

    useEffect(() => {
        if (user && user.email && userDetails._id) {
            getBookedClasses(userDetails._id)
                .then((data) => {
                    setUnpaidBookings(
                        data.filter(
                            (booking) => booking.paymentStatus === "unpaid"
                        )
                    );
                })
                .catch((error) => console.error(error));
        } else if (!user) {
            setUnpaidBookings([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetails]);

    const handleClearList = () => {
        Swal.fire({
            title: "Are you sure you want to clear your booking list?",
            text: "You won't be able to revert this!",
            icon: "warning",
            color: "white",
            iconColor: "rgb(234 179 8)",
            showCancelButton: true,
            confirmButtonColor: "rgb(234 179 8)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, clear list!",
            background: "#201e1e",
            backdrop: "#00000",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Booking List has been Cleared!",
                    icon: "success",
                    color: "white",
                    iconColor: "lightgreen",
                    confirmButtonColor: "lightgreen",
                    confirmButtonText: "OK",
                    background: "#201e1e",
                    backdrop: "#00000",
                });
                deleteAllClass(userDetails._id);
                setUnpaidBookings([]);
                setFilteredBookings([]);
                paginatedBookings = [];
            }
        });
    };

    const handleDelete = (studentId, instructorId, classIndex, bookingId) => {
        deleteClass(studentId, instructorId, classIndex);
        const updatedBookings = filteredBookings.filter(
            (booking) => booking._id !== bookingId
        );

        setFilteredBookings(updatedBookings);
        setUnpaidBookings((prev) =>
            prev.filter((booking) => booking._id !== bookingId)
        );
    };

    const [search, setSearch] = useState("");
    const [filteredBookings, setFilteredBookings] = useState(
        unpaidBookings || []
    );

    const renderCondition = unpaidBookings && unpaidBookings.length > 0;
    const searchableFields = [{ field: "class-name", split: false }];

    // Pagination logic
    const paginationHook = usePagination(unpaidBookings);
    let paginatedBookings = paginationHook?.paginatedItems;
    const { resultsPerPage, currentPage } = paginationHook;
    const paginationSettings = { resultsPerPage, currentPage };

    return {
        isSmallDevice,
        loading,
        handleClearList,
        handleDelete,
        search,
        setSearch,
        filteredBookings,
        setFilteredBookings,
        renderCondition,
        searchableFields,
        paginatedBookings,
        paginationSettings,
        unpaidBookings,
        userDetails,
        paginationHook,
    };
};

export default useSelectedClasses;
