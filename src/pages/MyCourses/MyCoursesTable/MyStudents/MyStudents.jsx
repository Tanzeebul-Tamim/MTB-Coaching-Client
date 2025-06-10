import { useEffect, useState } from "react";
import useTitle from "../../../../Helmet/useTitle";
import { getUserData } from "../../../../api/authApi";
import DashboardPageTitle from "../../../../shared_components/DashboardPageTitle/DashboardPageTitle";
import MyStudentsTable from "./MyStudentsTable/MyStudentsTable";
import { useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useScreenSize from "../../../../hooks/useScreeSize";
import { BsSearch } from "react-icons/bs";
import { PiStudentFill } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import SklMyStudents from "../../../../skeletons/SklMyStudents";

const MyStudents = () => {
    const { idx } = useParams();
    const parsedIdx = parseInt(idx);
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isSmallDevice } = useScreenSize();
    // const [isSearchFocused, setIsSearchFocused] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    // const resultsPerPage = 5;
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
        if (userDetails && userDetails._id) {
            setLoading(true);
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

    // Update filtered students when students or search changes
    useEffect(() => {
        if (!search) {
            setFilteredStudents(students);
        } else {
            const lowerSearch = search.toLowerCase();
            setFilteredStudents(
                students.filter(
                    (student) =>
                        student?.name?.toLowerCase().includes(lowerSearch) ||
                        student?.email?.toLowerCase().includes(lowerSearch)
                )
            );
        }
        // setCurrentPage(1); // Reset to first page on search change
    }, [students, search]);

    let courseName;

    if (userDetails && userDetails?.classes) {
        courseName = userDetails?.classes[parsedIdx]?.name;
    }

    // Pagination logic
    // const totalPages = Math.ceil((students?.length || 0) / resultsPerPage);
    // const paginatedStudents = students.slice(
    //   (currentPage - 1) * resultsPerPage,
    //   currentPage * resultsPerPage
    // );

    if (loading) {
        return (
            <>
                <DashboardPageTitle title={"My Students"} />
                <SklMyStudents isSmallDevice={isSmallDevice} />
            </>
        );
    }

    // Always show search bar, even if no results
    const SearchBar = (
        <div className="relative flex justify-center mb-2">
            <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="Search by Name or Email"
                className="z-10 mt-[35%] lg:mt-0 lg:py-3 lg:px-5 py-1 px-3 outline-none bg-base-200 description lg:placeholder:text-sm placeholder:text-xs placeholder-white rounded-full lg:w-1/3 w-3/4"
            />
            <button>
                <BsSearch
                    className="z-50"
                    style={{
                        color: "white",
                        position: "absolute",
                        top: isSmallDevice ? "86%" : "30%",
                        right: isSmallDevice ? "16%" : "35%",
                        fontSize: isSmallDevice ? "15px" : "20px",
                    }}
                ></BsSearch>
            </button>
        </div>
    );

    const wrapCondition = isSmallDevice && courseName?.length > 15;
    const renderCondition = students && students.length > 0;

    return (
        <>
            <DashboardPageTitle title={"My Students"} />
            {renderCondition && SearchBar}
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
                filteredStudents={filteredStudents}
                isSmallDevice={isSmallDevice}
                students={students}
            />
            {/* Pagination Controls at the bottom */}
            {/* {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            className="z-[100] btn btn-xs rounded bg-stone-700 text-white px-3 disabled:bg-stone-800"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`z-[100] btn btn-xs rounded px-3 ${currentPage === i + 1 ? 'bg-yellow-500 text-black' : 'bg-stone-700 text-white'}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="z-[100] btn btn-xs rounded bg-stone-700 text-white px-3 disabled:bg-stone-800"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )} */}
        </>
    );
};

export default MyStudents;
