import DashboardPageTitle from "../../components/ui/DashboardPageTitle";
import EnrolledClassesTable from "./EnrolledClassesTable/EnrolledClassesTable";
import { GiTeacher } from "react-icons/gi";
import SklEnrolledClass from "../../components/skeletons/SklEnrolledClass";
import Searchbar from "../../components/ui/Searchbar";
import Pagination from "../../components/ui/Pagination";
import useEnrolledClass from "./useEnrolledClass";

const EnrolledClass = () => {
const {
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
    } = useEnrolledClass();

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
                    <div className="z-10 lg:mt-0 lg:mb-5 mb-2 flex justify-between lg:gap-2 lg:text-base-content text-accent description lg:text-xl">
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
