import SectionTitle from "../../components/ui/SectionTitle";
import ClassesTable from "./ClassesTable/ClassesTable";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import SklClasses from "../../components/skeletons/SklClasses";
import PageBanner from "../../components/ui/PageBanner";
import useClasses from "./useClasses";
import { RxCross2 } from "react-icons/rx";

const Classes = () => {
    const {
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
    } = useClasses();

    return (
        <div className="lg:pb-24 pb-8">
            <PageBanner src="courses" texts={texts} side="right" />
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
                        className="lg:py-3 lg:px-5 py-1 px-3 outline-none bg-base-200 description lg:placeholder:text-sm placeholder:text-xs placeholder-base-content rounded-full lg:w-1/3 w-3/4 bg-opacity-60"
                    />
                    <button
                        onClick={
                            search &&
                            (() => {
                                setSearch("");
                                searchRef.current.value = "";
                            })
                        }
                    >
                        {search ? (
                            <RxCross2
                                className="text-base-content"
                                style={searchStyle}
                            ></RxCross2>
                        ) : (
                            <BsSearch
                                className="text-base-content"
                                style={searchStyle}
                            ></BsSearch>
                        )}
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
                            <div className="lg:mb-5 mb-2 flex gap-2 text-base-content description lg:text-xl">
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
                                    className="lg:mt-10 mt-6 btn btn-sm lg:btn-md text-sm lg:text-lg rounded-full hover:bg-base-300 bg-base-200 border-0 text-base-content"
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
