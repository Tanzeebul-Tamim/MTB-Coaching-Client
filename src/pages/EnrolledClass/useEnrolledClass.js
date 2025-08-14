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
    const [filteredPaidBookings, setFilteredPaidBookings] = useState(
        paidBookings || []
    );

    function calculateTotalWithTax(price, taxRate = 0.1) {
        const taxAmount = price * taxRate;
        const total = price + taxAmount;
        const prices = [
            price.toFixed(2),
            taxAmount.toFixed(2),
            total.toFixed(2),
        ];

        // Find the length of the longest price string
        const maxLength = Math.max(...prices.map((p) => p.length));

        // Pad each price on the left with spaces so they align
        const paddedPrices = prices.map((p) => p.padStart(maxLength, "\u00A0"));

        return {
            basePrice: paddedPrices[0],
            taxAmount: paddedPrices[1],
            total: paddedPrices[2],
        };
    }

    const generateInvoiceId = () => {
        const timestamp = Date.now().toString(36); // Base36 timestamp
        const random = Math.random().toString(36).substring(2, 6); // 4 random chars
        return `INV-${timestamp}-${random}`.toUpperCase(); // e.g., INV-LS8EJ3Z-4G5K
    };

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
        searchableFields,
        generateInvoiceId,
        userDetails,
        calculateTotalWithTax,
    };
};

export default useEnrolledClass;
