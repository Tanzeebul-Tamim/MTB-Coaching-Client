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
import { HiDotsHorizontal } from "react-icons/hi";

const MyStudents = () => {
    const { idx } = useParams();
    const parsedIdx = parseInt(idx);
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isSmallDevice } = useScreenSize();
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 5;
    const paginationSettings = { resultsPerPage, currentPage };
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
    const totalPages = Math.ceil((students?.length || 0) / resultsPerPage);
    const paginatedStudents = students.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    );

    // Update filtered students when students or search changes
    useEffect(() => {
        if (!search) {
            setFilteredStudents(paginatedStudents);
        } else {
            const lowerSearch = search.toLowerCase();
            setFilteredStudents(
                students.filter((student) => {
                    const name = student?.name || "";
                    const email = student?.email || "";
                    const nameWords = name.split(" ");
                    const nameMatch = nameWords.some((nameWord) =>
                        nameWord.toLowerCase().startsWith(lowerSearch)
                    );
                    const emailMatch = email
                        .toLowerCase()
                        .startsWith(lowerSearch);
                    return nameMatch || emailMatch;
                })
            );
        }
    }, [students, search, paginatedStudents]);

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

    // Always show search bar, even if no results
    const SearchBar = (
        <div className="relative flex justify-center mb-2">
            <input
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
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
                isSmallDevice={isSmallDevice}
                students={filteredStudents}
                settings={paginationSettings}
            />
            {/* Pagination Controls at the bottom */}
            {totalPages > 1 && !search && (
                <div className="flex justify-center mt-4 gap-2">
                    {/* Prev Button */}
                    <button
                        className="lg:z-[100] btn btn-xs rounded bg-stone-700 text-white px-3 disabled:bg-stone-800"
                        onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>

                    {/* Dynamic Page Buttons */}
                    {(() => {
                        const pageButtons = [];
                        const maxButtons = 3;
                        const startPage =
                            Math.floor((currentPage - 1) / maxButtons) *
                                maxButtons +
                            1;
                        const endPage = Math.min(
                            startPage + maxButtons - 1,
                            totalPages
                        );

                        // First page if we’re not in the first group
                        if (startPage > 1) {
                            pageButtons.push(
                                <button
                                    key={1}
                                    className={`lg:z-[100] btn btn-xs rounded px-3 ${
                                        currentPage === 1
                                            ? "bg-yellow-500 text-black"
                                            : "bg-stone-700 text-white"
                                    }`}
                                    onClick={() => setCurrentPage(1)}
                                >
                                    1
                                </button>
                            );

                            if (startPage > 2) {
                                pageButtons.push(
                                    <span
                                        key="start-ellipsis"
                                        className="lg:z-[100] btn btn-xs px-2 cursor-default"
                                    >
                                        <HiDotsHorizontal/>
                                    </span>
                                );
                            }
                        }

                        // Main group buttons
                        for (let i = startPage; i <= endPage; i++) {
                            pageButtons.push(
                                <button
                                    key={i}
                                    className={`lg:z-[100] btn btn-xs rounded px-3 ${
                                        currentPage === i
                                            ? "bg-yellow-500 text-black"
                                            : "bg-stone-700 text-white"
                                    }`}
                                    onClick={() => setCurrentPage(i)}
                                >
                                    {i}
                                </button>
                            );
                        }

                        // Last page if not in this group
                        if (endPage < totalPages) {
                            if (endPage < totalPages - 1) {
                                pageButtons.push(
                                    <span
                                        key="end-ellipsis"
                                        className="lg:z-[100] btn btn-xs px-2 cursor-default"
                                    >
                                        <HiDotsHorizontal/>
                                    </span>
                                );
                            }

                            pageButtons.push(
                                <button
                                    key={totalPages}
                                    className={`lg:z-[100] btn btn-xs rounded px-3 ${
                                        currentPage === totalPages
                                            ? "bg-yellow-500 text-black"
                                            : "bg-stone-700 text-white"
                                    }`}
                                    onClick={() => setCurrentPage(totalPages)}
                                >
                                    {totalPages}
                                </button>
                            );
                        }

                        return pageButtons;
                    })()}

                    {/* Next Button */}
                    <button
                        className="lg:z-[100] btn btn-xs rounded bg-stone-700 text-white px-3 disabled:bg-stone-800"
                        onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default MyStudents;
