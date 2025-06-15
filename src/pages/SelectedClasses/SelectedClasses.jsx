import DashboardPageTitle from "../../components/ui/DashboardPageTitle";
import SelectedClassesTable from "./SelectedClassesTable/SelectedClassesTable";
import { GiTeacher } from "react-icons/gi";
import SklSelectedClasses from "../../components/skeletons/SklSelectedClasses";
import Searchbar from "../../components/ui/Searchbar";
import Pagination from "../../components/ui/Pagination";
import useSelectedClasses from "./useSelectedClasses";

const SelectedClasses = () => {
    const {
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
    } = useSelectedClasses();

    if (loading) {
        return (
            <>
                <DashboardPageTitle
                    title={`${isSmallDevice ? "" : "My"} Booked Courses`}
                />
                <SklSelectedClasses isSmallDevice={isSmallDevice} />
            </>
        );
    }

    return (
        <>
            <DashboardPageTitle
                title={`${isSmallDevice ? "" : "My"} Booked Courses`}
            />
            {renderCondition && (
                <>
                    <Searchbar
                        items={unpaidBookings}
                        searchableFields={searchableFields}
                        isSmallDevice={isSmallDevice}
                        setFilteredItems={setFilteredBookings}
                        paginatedItems={paginatedBookings}
                        search={search}
                        setSearch={setSearch}
                        placeholder="Search by Course Name"
                    />
                    <div className="lg:mb-5 mb-2 lg:mt-0 z-10 flex justify-between gap-2 text-base-content description lg:text-xl">
                        <span className="z-[100] flex items-center gap-2 dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200">
                            <GiTeacher className="lg:text-2xl" />
                            <strong>
                                {!isSmallDevice && "My Booked"} Courses Count :{" "}
                            </strong>
                            <span>{unpaidBookings?.length}</span>
                        </span>{" "}
                        <button
                            onClick={handleClearList}
                            className="z-[100] btn btn-xs text-xs lg:rounded-lg rounded-full text-base-content hover:bg-base-200 bg-base-100 dark:hover:bg-stone-700 dark:bg-stone-500 border-0"
                        >
                            <span>Clear List</span>
                        </button>
                    </div>
                </>
            )}
            <SelectedClassesTable
                search={search}
                isSmallDevice={isSmallDevice}
                userBookings={filteredBookings}
                settings={paginationSettings}
                userDetails={userDetails}
            ></SelectedClassesTable>
            {/* Pagination Controls at the bottom */}
            <Pagination search={search} paginationHook={paginationHook} />
        </>
    );
};

export default SelectedClasses;
