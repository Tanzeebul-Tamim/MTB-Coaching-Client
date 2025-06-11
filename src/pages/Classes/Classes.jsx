import { useEffect, useRef } from "react";
import useTitle from "../../hooks/useTitle";
import SectionTitle from "../../reusable/SectionTitle";
import ClassesBanner from "./ClassesBanner/ClassesBanner";
import ClassesTable from "./ClassesTable/ClassesTable";
import { useState } from "react";
import { getAllClasses, getTotalClasses } from "../../api/api";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import useScreenSize from "../../hooks/useScreeSize";
import { GiTeacher } from "react-icons/gi";
import SklClasses from "../../skeletons/SklClasses";
import useAuth from "../../hooks/useAuth";
import useUserData from "../../hooks/useUserData";

const titleDescription =
    "Discover a wide range of mountain biking courses designed to help you level up your riding game. From mastering aerial skills to conquering challenging terrains, our courses offer expert instruction tailored to riders of all levels. Join us for an unforgettable learning experience!";

const Classes = () => {
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

    return (
        <div className="lg:pb-24 pb-8">
            <ClassesBanner />
            <div className={`lg:px-10 lg:pt-16 px-5 pt-8`}>
                <SectionTitle
                    title1={
                        isSmallDevice ? "Discover The" : "Discover The Perfect"
                    }
                    title2={isSmallDevice ? "Perfect Course" : "Course For You"}
                    textAlign={"text-end"}
                    description={titleDescription}
                />
                <div className="relative flex justify-center mb-2">
                    <input
                        onChange={handleSearch}
                        ref={searchRef}
                        type="text"
                        placeholder="Search by Course Name"
                        className="lg:py-3 lg:px-5 py-1 px-3 outline-none bg-base-200 description lg:placeholder:text-sm placeholder:text-xs placeholder-white rounded-full lg:w-1/3 w-3/4"
                    />
                    <button>
                        <BsSearch
                            style={{
                                color: "white",
                                position: "absolute",
                                top: "30%",
                                right: isSmallDevice ? "16%" : "35%",
                                fontSize: isSmallDevice ? "15px" : "20px",
                            }}
                        ></BsSearch>
                    </button>
                </div>

                {loading ? (
                    <SklClasses
                        isSmallDevice={isSmallDevice}
                        role={userDetails.role}
                    />
                ) : (
                    <div className="lg:pt-10 pt-5">
                        {classes.length > 0 && (
                            <div className="lg:mb-5 mb-2 flex gap-2 text-white description lg:text-xl">
                                <strong className="flex items-center gap-2">
                                    <GiTeacher className="lg:text-2xl text-xl" />
                                    <span>Courses Count :</span>
                                </strong>{" "}
                                {totalClasses.totalClasses}
                            </div>
                        )}
                        <ClassesTable
                            classes={classes}
                            tableRef={tableRef}
                            isSmallDevice={isSmallDevice}
                            rest={rest}
                            user={user}
                            userDetails={userDetails}
                            userLoading={userLoading}
                        />
                        {classes.length >= visibleCount && (
                            <div className="flex justify-center">
                                <button
                                    onClick={handleLoadMore}
                                    className="lg:mt-10 mt-6 btn btn-sm lg:btn-md text-sm lg:text-lg rounded-full hover:bg-stone-700 bg-stone-800"
                                >
                                    <BiDotsVerticalRounded />
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Classes;
