import { useEffect, useState } from "react";
import useTitle from "../../Helmet/useTitle";
import { getUserData } from "../../api/authApi";
import { getBookedClasses } from "../../api/bookApi";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";
import PaymentHistoryTable from "./PaymentHistoryTable/PaymentHistoryTable";
import useAuth from "../../hooks/useAuth";
import { BsFillCreditCardFill } from "react-icons/bs";
import useScreenSize from "../../hooks/useScreeSize";
import SklPaymentHistory from "../../skeletons/SklPaymentHistory";
import usePagination from "../../hooks/usePagination";
import Searchbar from "../../reusable/Searchbar";
import Pagination from "../../reusable/Pagination";

const PaymentHistory = () => {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [userBookings, setUserBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const paidBookings = userBookings.filter(
        (booking) => booking.paymentStatus === "paid"
    );
    const { isSmallDevice } = useScreenSize();
    useTitle("| Payment History");

    useEffect(() => {
        if (user && user.email) {
            setLoading(true);
            getUserData(user.email)
                .then((data) => {
                    setUserDetails(data);
                    setLoading(false);
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    }, [user]);

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
    const [filteredHistory, setFilteredHistory] = useState(paidBookings || []);
    const resultsPerPage = isSmallDevice ? 5 : 10;

    // Pagination logic
    const paginationHook = usePagination(paidBookings, resultsPerPage);
    const paginatedHistory = paginationHook?.paginatedItems;
    const { currentPage } = paginationHook;
    const paginationSettings = { resultsPerPage, currentPage };

    if (loading) {
        return (
            <>
                <DashboardPageTitle
                    title={`${isSmallDevice ? "" : "My"} Payment History`}
                />
                <SklPaymentHistory isSmallDevice={isSmallDevice} />
            </>
        );
    }

    const renderCondition = paidBookings && paidBookings.length > 0;
    const searchableFields = [{ field: "class-name", split: false }];

    return (
        <>
            <DashboardPageTitle
                title={`${isSmallDevice ? "" : "My"} Payment History`}
            />
            {renderCondition && (
                <>
                    <Searchbar
                        items={paidBookings}
                        searchableFields={searchableFields}
                        isSmallDevice={isSmallDevice}
                        setFilteredItems={setFilteredHistory}
                        paginatedItems={paginatedHistory}
                        search={search}
                        setSearch={setSearch}
                        placeholder="Search by Course Name"
                    />
                    <div className="lg:mt-0 lg:mb-5 mb-2 z-10 flex justify-between lg:gap-2 text-white description lg:text-xl">
                        <span className="z-[100] flex items-center gap-2">
                            <BsFillCreditCardFill className="lg:text-2xl" />
                            <strong>Transactions Count :</strong>
                            <span>{paidBookings?.length}</span>
                        </span>{" "}
                    </div>
                </>
            )}
            <PaymentHistoryTable
                search={search}
                userBookings={filteredHistory}
                settings={paginationSettings}
            ></PaymentHistoryTable>
            {/* Pagination Controls at the bottom */}
            <Pagination search={search} paginationHook={paginationHook} />
        </>
    );
};

export default PaymentHistory;
