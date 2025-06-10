import { useEffect, useState } from "react";
import useTitle from "../../Helmet/useTitle";
import { getUserData } from "../../api/authApi";
import { getBookedClasses } from "../../api/bookApi";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";
import EnrolledClassesTable from "./EnrolledClassesTable/EnrolledClassesTable";
import useAuth from "../../hooks/useAuth";
import { GiTeacher } from "react-icons/gi";
import useScreenSize from "../../hooks/useScreeSize";
import SklEnrolledClass from "../../skeletons/SklEnrolledClass";
import usePagination from "../../hooks/usePagination";
import Searchbar from "../../reusable/Searchbar";
import Pagination from "../../reusable/Pagination";

const EnrolledClass = () => {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [userBookings, setUserBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const paidBookings = userBookings.filter(
        (booking) => booking.paymentStatus === "paid"
    );
    const { isSmallDevice } = useScreenSize();
    useTitle("| Enrolled Courses");

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
    const [filteredPaidBookings, setFilteredPaidBookings] = useState(
        paidBookings || []
    );

    // Pagination logic
    const paginationHook = usePagination(paidBookings);
    const paginatedPaidBookings = paginationHook?.paginatedItems;
    const { resultsPerPage, currentPage } = paginationHook;
    const paginationSettings = { resultsPerPage, currentPage };

    if (loading) {
        return (
            <>
                <DashboardPageTitle
                    title={`${isSmallDevice ? "" : "My"} Enrolled Courses`}
                />
                <SklEnrolledClass isSmallDevice={isSmallDevice} />
            </>
        );
    }

    const renderCondition = paidBookings && paidBookings.length > 0;
    const searchableFields = [{ field: "class-name", split: false }];

    return (
        <>
            <DashboardPageTitle
                title={`${isSmallDevice ? "" : "My"} Enrolled Courses`}
            />
            {renderCondition && (
                <>
                    <Searchbar
                        items={paidBookings}
                        searchableFields={searchableFields}
                        isSmallDevice={isSmallDevice}
                        setFilteredItems={setFilteredPaidBookings}
                        paginatedItems={paginatedPaidBookings}
                        search={search}
                        setSearch={setSearch}
                        placeholder="Search by Course Name"
                    />
                    <div className="z-10 lg:mt-0 lg:mb-5 mb-2 flex justify-between lg:gap-2 text-white description lg:text-xl">
                        <span className="z-[100] flex items-center gap-2">
                            <GiTeacher className="lg:text-2xl" />
                            <strong>
                                {!isSmallDevice && "Enrolled"} Courses Count :{" "}
                            </strong>
                            <span>{paidBookings?.length}</span>
                        </span>{" "}
                    </div>
                </>
            )}
            <EnrolledClassesTable
                search={search}
                isSmallDevice={isSmallDevice}
                userBookings={filteredPaidBookings}
                settings={paginationSettings}
            ></EnrolledClassesTable>
            {/* Pagination Controls at the bottom */}
            <Pagination search={search} paginationHook={paginationHook} />
        </>
    );
};

export default EnrolledClass;
