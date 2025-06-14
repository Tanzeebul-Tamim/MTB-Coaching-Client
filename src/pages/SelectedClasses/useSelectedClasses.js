import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useScreenSize from "../../hooks/useScreenSize";
import useUserData from "../../hooks/useUserData";
import { deleteAllClass, getBookedClasses } from "../../api/bookApi";
import Swal from "sweetalert2";
import usePagination from "../../hooks/usePagination";
import useTitle from "../../hooks/useTitle";

const useSelectedClasses = () => {
    const { user } = useAuth();
    const [userBookings, setUserBookings] = useState([]);
    const unpaidBookings = userBookings.filter(
        (booking) => booking.paymentStatus === "unpaid"
    );
    const { isSmallDevice } = useScreenSize();
    const { loading, userDetails } = useUserData();
    useTitle("| Booked Courses");

    useEffect(() => {
        if (user && user.email && userDetails._id) {
            getBookedClasses(userDetails._id)
                .then((data) => {
                    setUserBookings(data);
                })
                .catch((error) => console.error(error));
        } else if (!user) {
            setUserBookings([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetails, userBookings]);

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
            }
        });
    };

    const [search, setSearch] = useState("");
    const [filteredBookings, setFilteredBookings] = useState(
        unpaidBookings || []
    );

    const renderCondition = unpaidBookings && unpaidBookings.length > 0;
    const searchableFields = [{ field: "class-name", split: false }];

    // Pagination logic
    const paginationHook = usePagination(unpaidBookings);
    const paginatedBookings = paginationHook?.paginatedItems;
    const { resultsPerPage, currentPage } = paginationHook;
    const paginationSettings = { resultsPerPage, currentPage };

    return {
        isSmallDevice,
        loading,
        handleClearList,
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
