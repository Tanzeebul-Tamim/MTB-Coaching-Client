import SectionTitle from "../../components/ui/SectionTitle";
import InstructorsTable from "./InstructorsTable/InstructorsTable";
import { BsSearch } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import SklInstructors from "../../components/skeletons/SklInstructors";
import PageBanner from "../../components/ui/PageBanner";
import useInstructors from "./useInstructors";

const Instructors = () => {
    const {
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
    } = useInstructors();

    return (
        <div className="lg:pb-24 pb-8">
            <PageBanner src="instructors" texts={texts} side="left" />
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
                        className="lg:py-3 lg:px-5 py-1 px-3 outline-none bg-base-200 description lg:placeholder:text-sm placeholder:text-xs placeholder-base-content rounded-full lg:w-1/3 w-3/4 bg-opacity-60"
                    />
                    <button>
                        <BsSearch
                            className="text-base-content"
                            style={{
                                position: "absolute",
                                top: "30%",
                                right: isSmallDevice ? "16%" : "35%",
                                fontSize: isSmallDevice ? "15px" : "20px",
                            }}
                        ></BsSearch>
                    </button>
                </div>

                {loading ? (
                    <SklInstructors />
                ) : (
                    <div className="lg:pt-10 pt-5">
                        {instructors.length > 0 && (
                            <div className="lg:mb-5 mb-2 flex gap-2 text-base-content description lg:text-xl">
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
                                    className={
                                        "lg:mt-10 mt-6 btn btn-sm lg:btn-md text-sm lg:text-lg rounded-full hover:bg-base-300 bg-base-200 border-0 text-base-content"
                                    }
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
