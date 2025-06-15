import DashboardPageTitle from "../../components/ui/DashboardPageTitle";
import MyCoursesTable from "./MyCoursesTable/MyCoursesTable";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import SklMyCourses from "../../components/skeletons/SklMyCourses";
import Searchbar from "../../components/ui/Searchbar";
import Pagination from "../../components/ui/Pagination";
import useMyCourses from "./useMyCourses";

const MyCourses = () => {
    const {
        totalStudent,
        isSmallDevice,
        loading,
        search,
        setSearch,
        filteredCourses,
        setFilteredCourses,
        paginatedCourses,
        paginationSettings,
        instructorCourses,
        userDetails,
        paginationHook,
        renderCondition,
        searchableFields,
    } = useMyCourses();

    if (loading) {
        return (
            <>
                <DashboardPageTitle
                    title={`My ${isSmallDevice ? "" : "Offered"} Courses`}
                />
                <SklMyCourses isSmallDevice={isSmallDevice} />
            </>
        );
    }

    return (
        <>
            <DashboardPageTitle
                title={`My ${isSmallDevice ? "" : "Offered"} Courses`}
            />
            {renderCondition && (
                <>
                    <Searchbar
                        items={instructorCourses}
                        searchableFields={searchableFields}
                        isSmallDevice={isSmallDevice}
                        setFilteredItems={setFilteredCourses}
                        paginatedItems={paginatedCourses}
                        search={search}
                        setSearch={setSearch}
                        placeholder="Search by Course Name"
                    />
                    <div
                        className={`lg:mb-5 mb-2 z-10 lg:mt-0 ${
                            isSmallDevice
                                ? "flex lg:flex-row lg:justify-between flex-col items-center"
                                : "flex justify-between"
                        } lg:gap-2 lg:text-base-content text-accent description lg:text-xl`}
                    >
                        <span className="z-[100] flex items-center gap-2">
                            <GiTeacher className="lg:text-2xl" />
                            <strong>
                                {!isSmallDevice && "Offered"} Courses Count :{" "}
                            </strong>
                            <span>{instructorCourses.length}</span>
                        </span>

                        <span className="z-[100] flex items-center gap-2">
                            <PiStudentFill className="lg:text-2xl" />
                            <strong>Total Students : </strong>
                            <span>{totalStudent}</span>
                        </span>
                    </div>
                </>
            )}
            <MyCoursesTable
                search={search}
                isSmallDevice={isSmallDevice}
                courses={filteredCourses}
                settings={paginationSettings}
                userDetails={userDetails}
            />
            {/* Pagination Controls at the bottom */}
            <Pagination search={search} paginationHook={paginationHook} />
        </>
    );
};

export default MyCourses;
