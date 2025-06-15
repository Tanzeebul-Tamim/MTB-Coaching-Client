import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useScreenSize from "../../hooks/useScreenSize";
import useUserData from "../../hooks/useUserData";
import useTitle from "../../hooks/useTitle";
import { getAllClasses, getTotalClasses } from "../../api/api";

const useClasses = () => {
    const titleDescription =
        "Discover a wide range of mountain biking courses designed to help you level up your riding game. From mastering aerial skills to conquering challenging terrains, our courses offer expert instruction tailored to riders of all levels. Join us for an unforgettable learning experience!";

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5);
    const [search, setSearch] = useState("");
    const { user, ...rest } = useAuth();
    const searchRef = useRef(null);
    const tableRef = useRef(null);
    const { isSmallDevice } = useScreenSize();
    const { loading: userLoading, userDetails } = useUserData();
    useTitle("| Courses");

    const [totalClasses, setTotalClasses] = useState({});

    useEffect(() => {
        getTotalClasses()
            .then((data) => {
                setTotalClasses(data);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        setLoading(true);
        getAllClasses(visibleCount, search)
            .then((data) => {
                setClasses(data);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [visibleCount, search]);

    useEffect(() => {
        if (classes.length > 5) {
            scrollToBottom();
        }
    }, [classes]);

    const handleSearch = () => {
        setSearch(searchRef.current.value);
    };

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

    const texts = ["Exciting", "MTB Courses", "And", "Workshops"];

    const searchStyle = {
        position: "absolute",
        top: "30%",
        right: isSmallDevice ? "16%" : "35%",
        fontSize: isSmallDevice ? "15px" : "20px",
    };

    return {
        titleDescription,
        loading,
        user,
        rest,
        isSmallDevice,
        userLoading,
        userDetails,
        totalClasses,
        handleSearch,
        handleLoadMore,
        texts,
        searchRef,
        classes,
        tableRef,
        visibleCount,
        search,
        setSearch,
        searchStyle,
    };
};

export default useClasses;
