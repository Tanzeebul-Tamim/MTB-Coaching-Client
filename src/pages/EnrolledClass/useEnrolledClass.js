import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useScreenSize from "../../hooks/useScreenSize";
import useUserData from "../../hooks/useUserData";
import useTitle from "../../hooks/useTitle";
import { getBookedClasses } from "../../api/bookApi";
import usePagination from "../../hooks/usePagination";

const useEnrolledClass = () => {
    const { user } = useAuth();
    const [userBookings, setUserBookings] = useState([]);
    const paidBookings = userBookings.filter(
        (booking) => booking.paymentStatus === "paid"
    );
    const { isSmallDevice } = useScreenSize();
    const { loading, userDetails } = useUserData();
    useTitle("| Enrolled Courses");

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

    const [search, setSearch] = useState("");
    const [filteredPaidBookings, setFilteredPaidBookings] = useState(
        paidBookings || []
    );

    const renderCondition = paidBookings && paidBookings.length > 0;
    const searchableFields = [{ field: "class-name", split: false }];

    // Pagination logic
    const paginationHook = usePagination(paidBookings);
    const paginatedPaidBookings = paginationHook?.paginatedItems;
    const { resultsPerPage, currentPage } = paginationHook;
    const paginationSettings = { resultsPerPage, currentPage };

    return {
        isSmallDevice,
        loading,
        search,
        setSearch,
        filteredPaidBookings,
        setFilteredPaidBookings,
        paginatedPaidBookings,
        paginationSettings,
        paidBookings,
        paginationHook,
        renderCondition,
        searchableFields
    };
};

export default useEnrolledClass;
