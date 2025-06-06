import { useEffect, useState } from "react";
import useTitle from "../../Helmet/useTitle";
import SectionTitle from "../../reusable/SectionTitle";
import InstructorsBanner from "./InstructorsBanner/InstructorsBanner";
import InstructorsTable from "./InstructorsTable/InstructorsTable";
import { getAllInstructors, getTotalInstructors } from "../../api/api";
import { ScaleLoader } from "react-spinners";
import { BsSearch } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useRef } from "react";
import { getUserData } from "../../api/authApi";
import { FaChalkboardTeacher } from "react-icons/fa";
import useScreenSize from "../../hooks/useScreeSize";

const titleDescription =
    "Get to know our team of experienced and passionate mountain bike instructors. Our instructors are dedicated to sharing their expertise and guiding riders of all levels on exhilarating mountain biking adventures. Join us and learn from the best in the field as we navigate the thrilling world of mountain biking together.";

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5);
    const [search, setSearch] = useState("");
    const [totalInstructors, setTotalInstructors] = useState({});
    const searchRef = useRef(null);
    const tableRef = useRef(null);
    const { isSmallDevice } = useScreenSize();
    useTitle("| Instructors");

    useEffect(() => {
        setLoading(true);
        getTotalInstructors()
            .then((data) => {
                setTotalInstructors(data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        setLoading(true);
        getAllInstructors(visibleCount, search)
            .then((data) => {
                setInstructors(data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
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

    return (
        <div className="lg:pb-24 pb-8">
            <InstructorsBanner />
            <div className={`lg:px-10 lg:pt-16 px-5 pt-8`}>
                <SectionTitle
                    title1="Meet Our"
                    title2="Expert Instructors"
                    description={titleDescription}
                />
                <div className="relative flex justify-center mb-2">
                    <input
                        onChange={handleSearch}
                        ref={searchRef}
                        type="text"
                        placeholder="Search by Instructor's Name"
                        className="lg:py-3 lg:px-5 py-1 px-3 outline-none bg-base-200 description lg:placeholder:text-sm placeholder:text-xs placeholder-white rounded-full lg:w-1/3 w-3/4"
                    />
                    <button>
                        <BsSearch
                            style={{
                                color: "white",
                                position: "absolute",
                                top: isSmallDevice ? "30%" : "30%",
                                right: isSmallDevice ? "16%" : "35%",
                                fontSize: isSmallDevice ? "15px" : "20px",
                            }}
                        ></BsSearch>
                    </button>
                </div>

                {loading ? (
                    <div className="lg:pt-10 pt-5 flex justify-center pb-24">
                        <ScaleLoader
                            height={85}
                            width={10}
                            radius={8}
                            margin={8}
                            color="rgb(202 138 4)"
                        />
                    </div>
                ) : (
                    <div className="lg:pt-10 pt-5">
                        {instructors.length > 0 && (
                            <div className="lg:mb-5 mb-2 flex gap-2 text-white description lg:text-xl">
                                <strong className="flex items-center gap-2">
                                    <FaChalkboardTeacher className="lg:text-2xl text-xl" />
                                    <span>Instructors Count :</span>
                                </strong>{" "}
                                {totalInstructors.totalInstructors}
                            </div>
                        )}
                        <InstructorsTable
                            tableRef={tableRef}
                            instructors={instructors}
                            isSmallDevice={isSmallDevice}
                        />
                        {instructors.length >= visibleCount && (
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

export default Instructors;
