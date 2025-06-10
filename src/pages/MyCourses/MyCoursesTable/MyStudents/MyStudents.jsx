import { useEffect, useState } from "react";
import useTitle from "../../../../Helmet/useTitle";
import { getUserData } from "../../../../api/authApi";
import DashboardPageTitle from "../../../../shared_components/DashboardPageTitle/DashboardPageTitle";
import MyStudentsTable from "./MyStudentsTable/MyStudentsTable";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useScreenSize from "../../../../hooks/useScreeSize";
import { PiStudentFill } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import SklMyStudents from "../../../../skeletons/SklMyStudents";
import Searchbar from "../../../../reusable/Searchbar";
import usePagination from "../../../../hooks/usePagination";
import Pagination from "../../../../reusable/Pagination";

const MyStudents = () => {
    const { idx } = useParams();
    const parsedIdx = parseInt(idx);
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isSmallDevice } = useScreenSize();
    useTitle("| My Students");

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
        setLoading(true);
        if (userDetails && userDetails._id) {
            fetch(
                `${import.meta.env.VITE_API_URL}/instructor/students/${
                    userDetails._id
                }/${idx}`
            )
                .then(async (res) => await res.json())
                .then((data) => {
                    setStudents(data.students);
                    setLoading(false);
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    }, [idx, userDetails]);

    const [search, setSearch] = useState("");
    const [filteredStudents, setFilteredStudents] = useState(students || []);

    // Pagination logic
    const paginationHook = usePagination(students);
    const paginatedStudents = paginationHook?.paginatedItems;
    const { resultsPerPage, currentPage } = paginationHook;
    const paginationSettings = { resultsPerPage, currentPage };

    let courseName;

    if (userDetails && userDetails?.classes) {
        courseName = userDetails?.classes[parsedIdx]?.name;
    }

    if (loading) {
        return (
            <>
                <DashboardPageTitle title={"My Students"} />
                <SklMyStudents isSmallDevice={isSmallDevice} />
            </>
        );
    }

    const wrapCondition = isSmallDevice && courseName?.length > 15;
    const renderCondition = students && students.length > 0;

    const searchableFields = [
        { field: "name", split: true },
        { field: "email", split: false },
    ];

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
                } lg:gap-2 text-white description lg:text-xl`}
            >
                <span className="z-[100] flex items-center gap-2">
                    <FaBookOpen className="lg:text-2xl" />
                    <strong>Course {!isSmallDevice && "Name"} : </strong>
                    <span>{courseName}</span>
                </span>
                {renderCondition && (
                    <span className="z-[100] flex items-center gap-2">
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
                <Link to="/dashboard/my-classes" className="lg:z-[100] btn text-white btn-xs text-sx border-0 rounded-lg hover:bg-stone-800 bg-stone-700">
                    <span>Go Back</span>
                </Link>
            </div>
        </>
    );
};

export default MyStudents;
