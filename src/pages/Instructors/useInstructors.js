import { useEffect, useRef, useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import { getAllInstructors, getTotalInstructors } from "../../api/api";
import { getUserData } from "../../api/authApi";
import useTitle from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";
import useSoundEffects from "../../hooks/useSoundEffects";

const useInstructors = () => {
    const titleDescription =
        "Get to know our team of experienced and passionate mountain bike instructors. Our instructors are dedicated to sharing their expertise and guiding riders of all levels on exhilarating mountain biking adventures. Join us and learn from the best in the field as we navigate the thrilling world of mountain biking together.";

    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5);
    const [search, setSearch] = useState("");
    const [totalInstructors, setTotalInstructors] = useState({});
    const searchRef = useRef(null);
    const tableRef = useRef(null);
    const { isSmallDevice } = useScreenSize();
    const { user } = useAuth();
    const { play } = useSoundEffects();
    useTitle("| Instructors");

    useEffect(() => {
        setLoading(true);
        getTotalInstructors()
            .then((data) => {
                setTotalInstructors(data);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setLoading(true);
        getAllInstructors(visibleCount, search)
            .then((data) => {
                setInstructors(data);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [visibleCount, search]);

    useEffect(() => {
        if (instructors.length > 5) {
            scrollToBottom();
        }
    }, [instructors]);

    const handleSearch = () => {
        setSearch(searchRef.current.value);
    };

    getUserData();
    const handleLoadMore = () => {
        if (visibleCount % 5 == 0) {
            setVisibleCount((prevCount) => prevCount + 5);
        } else {
            setVisibleCount((prevCount) => prevCount + (visibleCount % 5));
        }
    };

    const scrollToBottom = () => {
        if (tableRef.current) {
            tableRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    };

    const texts = ["Training", "Instructions", "& Guides", "WorldWide"];

    const searchStyle = {
        position: "absolute",
        top: "30%",
        right: isSmallDevice ? "16%" : "35%",
        fontSize: isSmallDevice ? "15px" : "20px",
    };

    return {
        titleDescription,
        loading,
        totalInstructors,
        isSmallDevice,
        handleSearch,
        handleLoadMore,
        texts,
        searchRef,
        instructors,
        tableRef,
        visibleCount,
        search,
        setSearch,
        searchStyle,
        user,
        play,
    };
};

export default useInstructors;
