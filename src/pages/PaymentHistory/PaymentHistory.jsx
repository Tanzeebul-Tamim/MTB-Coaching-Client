import DashboardPageTitle from "../../components/ui/DashboardPageTitle";
import PaymentHistoryTable from "./PaymentHistoryTable/PaymentHistoryTable";
import { BsFillCreditCardFill } from "react-icons/bs";
import SklPaymentHistory from "../../components/skeletons/SklPaymentHistory";
import Searchbar from "../../components/ui/Searchbar";
import Pagination from "../../components/ui/Pagination";
import usePaymentHistory from "./usePaymentHistory";

const PaymentHistory = () => {
    const {
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
    } = usePaymentHistory();

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
                    <div className="lg:mt-0 lg:mb-5 mb-2 z-10 flex justify-between lg:gap-2 text-base-content description lg:text-xl">
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
                isSmallDevice={isSmallDevice}
            ></PaymentHistoryTable>
            {/* Pagination Controls at the bottom */}
            <Pagination search={search} paginationHook={paginationHook} />
        </>
    );
};

export default PaymentHistory;
