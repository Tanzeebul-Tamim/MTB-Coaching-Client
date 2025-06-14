import { useEffect, useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import useUserData from "../../hooks/useUserData";
import useTitle from "../../hooks/useTitle";
import usePagination from "../../hooks/usePagination";

const useMyCourses = () => {
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

    const renderCondition = instructorCourses && instructorCourses.length > 0;
    const searchableFields = [{ field: "name", split: false }];

    // Pagination logic
    const paginationHook = usePagination(instructorCourses);
    const paginatedCourses = paginationHook?.paginatedItems;
    const { resultsPerPage, currentPage } = paginationHook;
    const paginationSettings = { resultsPerPage, currentPage };

    return {
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
        searchableFields
    };
};

export default useMyCourses;
