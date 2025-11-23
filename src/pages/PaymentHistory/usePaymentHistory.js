import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useScreen from "../../hooks/useScreen";
import useUserData from "../../hooks/useUserData";
import useTitle from "../../hooks/useTitle";
import { getBookedClasses } from "../../api/bookApi";
import usePagination from "../../hooks/usePagination";

const usePaymentHistory = () => {
    const { user } = useAuth();
    const [userBookings, setUserBookings] = useState([]);
    const paidBookings = userBookings.filter(
        (booking) => booking.paymentStatus === "paid"
    );
    const { isSmallDevice } = useScreen();
    const { loading, userDetails } = useUserData();
    useTitle("| Payment History");

    useEffect(() => {
        if (user && user.email && userDetails?._id) {
            getBookedClasses(userDetails?._id)
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
    const [filteredHistory, setFilteredHistory] = useState(paidBookings || []);
    const resultsPerPage = isSmallDevice ? 5 : 8;

    const renderCondition = paidBookings && paidBookings.length > 0;
    const searchableFields = [{ field: "class-name", split: false }];

    // Pagination logic
    const paginationHook = usePagination(paidBookings, resultsPerPage);
    const paginatedHistory = paginationHook?.paginatedItems;
    const { currentPage } = paginationHook;
    const paginationSettings = { resultsPerPage, currentPage };

    return {
        loading,
        search,
        setSearch,
        filteredHistory,
        setFilteredHistory,
        renderCondition,
        searchableFields,
        paginatedHistory,
        paginationSettings,
        isSmallDevice,
        paidBookings,
        paginationHook,
    };
};

export default usePaymentHistory;
