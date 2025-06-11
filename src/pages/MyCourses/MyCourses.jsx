import { useEffect, useState } from "react";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";
import useTitle from "../../hooks/useTitle";
import MyCoursesTable from "./MyCoursesTable/MyCoursesTable";
import useScreenSize from "../../hooks/useScreenSize";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import SklMyCourses from "../../skeletons/SklMyCourses";
import usePagination from "../../hooks/usePagination";
import Searchbar from "../../reusable/Searchbar";
import Pagination from "../../reusable/Pagination";
import useUserData from "../../hooks/useUserData";

const MyCourses = () => {
    const [totalStudent, setTotalStudent] = useState(0);
    const { isSmallDevice } = useScreenSize();
    const { loading, userDetails } = useUserData();
    useTitle("| My Courses");

    useEffect(() => {
        if (userDetails && userDetails._id) {
            fetch(
                `${import.meta.env.VITE_API_URL}/instructor/total/${
                    userDetails._id
                }`
            )
                .then(async (res) => await res.json())
                .then((data) => {
                    setTotalStudent(data.totalStudents);
                });
        }
    }, [userDetails]);

    let instructorCourses = [];

    if (userDetails && userDetails?.role === "Instructor") {
        instructorCourses = userDetails?.classes;
    }

    const [search, setSearch] = useState("");
    const [filteredCourses, setFilteredCourses] = useState(
        instructorCourses || []
    );

    // Pagination logic
    const paginationHook = usePagination(instructorCourses);
    const paginatedCourses = paginationHook?.paginatedItems;
    const { resultsPerPage, currentPage } = paginationHook;
    const paginationSettings = { resultsPerPage, currentPage };

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

    const renderCondition = instructorCourses && instructorCourses.length > 0;

    const searchableFields = [{ field: "name", split: false }];

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
                        } lg:gap-2 text-white description lg:text-xl`}
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
