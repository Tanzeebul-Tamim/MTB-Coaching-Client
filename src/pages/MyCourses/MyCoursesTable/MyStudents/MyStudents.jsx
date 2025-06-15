import DashboardPageTitle from "../../../../components/ui/DashboardPageTitle";
import MyStudentsTable from "./MyStudentsTable/MyStudentsTable";
import { Link } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import SklMyStudents from "../../../../components/skeletons/SklMyStudents";
import Searchbar from "../../../../components/ui/Searchbar";
import Pagination from "../../../../components/ui/Pagination";
import useMyStudents from "./useMyStudents";

const MyStudents = () => {
    const {
        loading,
        search,
        setSearch,
        filteredStudents,
        setFilteredStudents,
        paginatedStudents,
        paginationSettings,
        wrapCondition,
        renderCondition,
        searchableFields,
        students,
        isSmallDevice,
        courseName,
        paginationHook,
    } = useMyStudents();

    if (loading) {
        return (
            <>
                <DashboardPageTitle title={"My Students"} />
                <SklMyStudents isSmallDevice={isSmallDevice} />
            </>
        );
    }

    return (
        <>
            <DashboardPageTitle title={"My Students"} />
            {renderCondition && (
                <Searchbar
                    items={students}
                    searchableFields={searchableFields}
                    isSmallDevice={isSmallDevice}
                    setFilteredItems={setFilteredStudents}
                    paginatedItems={paginatedStudents}
                    search={search}
                    setSearch={setSearch}
                    placeholder="Search by Name or Email"
                />
            )}
            <div
                className={`lg:mb-5 mb-2 z-10 ${
                    wrapCondition
                        ? "flex lg:flex-row lg:justify-between flex-col items-center"
                        : "flex justify-between"
                } lg:gap-2 text-base-content description lg:text-xl`}
            >
                <span className="z-[100] flex items-center gap-2 dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200">
                    <FaBookOpen className="lg:text-2xl" />
                    <strong>Course {!isSmallDevice && "Name"} : </strong>
                    <span>{courseName}</span>
                </span>
                {renderCondition && (
                    <span className="z-[100] flex items-center gap-2 dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200">
                        <PiStudentFill className="lg:text-2xl" />
                        <strong>Total Students : </strong>
                        <span>{students.length}</span>
                    </span>
                )}
            </div>
            <MyStudentsTable
                search={search}
                isSmallDevice={isSmallDevice}
                students={filteredStudents}
                settings={paginationSettings}
            />
            {/* Pagination Controls at the bottom */}
            <Pagination search={search} paginationHook={paginationHook} />
            <div className="flex justify-center items-center mt-3">
                <Link
                    to="/dashboard/my-classes"
                    className="lg:z-[100] btn text-accent btn-xs border-0 rounded-lg hover:bg-base-300 bg-base-200 dark:bg-base-300 dark:hover:bg-base-200"
                >
                    <span>Go Back</span>
                </Link>
            </div>
        </>
    );
};

export default MyStudents;
