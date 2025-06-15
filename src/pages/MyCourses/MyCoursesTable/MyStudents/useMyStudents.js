import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useScreenSize from "../../../../hooks/useScreenSize";
import useUserData from "../../../../hooks/useUserData";
import useTitle from "../../../../hooks/useTitle";
import usePagination from "../../../../hooks/usePagination";

const useMyStudents = () => {
    const { idx } = useParams();
    const parsedIdx = parseInt(idx);
    const [students, setStudents] = useState([]);
    const { isSmallDevice } = useScreenSize();
    const { loading, userDetails, setLoading } = useUserData();
    useTitle("| My Students");

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
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const wrapCondition = isSmallDevice && courseName?.length > 15;
    const renderCondition = students && students.length > 0;

    const searchableFields = [
        { field: "name", split: true },
        { field: "email", split: false },
    ];

    return {
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
        paginationHook
    };
};

export default useMyStudents;
