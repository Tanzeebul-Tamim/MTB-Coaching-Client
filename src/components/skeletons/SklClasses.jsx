import { BiDotsVerticalRounded } from "react-icons/bi";
import { GiTeacher } from "react-icons/gi";
import { MdLibraryAdd } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import useDarkTheme from "../../hooks/useDarkTheme";
import { light, dark } from "../../styles/colors.json";

const SklClasses = ({ isSmallDevice, role }) => {
    const isDarkTheme = useDarkTheme();
    const color = isDarkTheme ? dark.baseContent : light.baseContent;

    return (
        <div className="lg:pt-10 pt-5 animate-pulse">
            <div className="lg:mb-5 mb-2 flex gap-2 text-base-content description lg:text-xl">
                <strong className="flex items-center gap-2">
                    <GiTeacher className="lg:text-2xl text-xl" />
                    <span>Courses Count :</span>
                    <ClipLoader color={color} />
                </strong>{" "}
            </div>
            <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg">
                <table className="table text-center description text-base-content whitespace-nowrap lg:whitespace-normal">
                    <thead className="bg-base-200">
                        <tr className="lg:text-lg text-sm">
                            <th className="">No</th>
                            <th className="">Image</th>
                            <th className="">Course</th>
                            <th className="">Instructor</th>
                            <th className="">Available Slots</th>
                            <th className="">Price</th>
                            {role !== "Instructor" && (
                                <th className="">Book Courses</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="flex justify-center items-center">
                                        <div className="h-8 sm:h-16 lg:w-20 w-14 sm:w-32 bg-gray-500 rounded-lg"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center items-center">
                                        <div className="w-14 sm:w-64 lg:h-4 h-3 bg-gray-500 rounded"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center items-center">
                                        <div className="w-14 sm:w-64 lg:h-4 h-3 bg-gray-500 rounded"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center items-center">
                                        <div className="w-20 sm:w-32 lg:h-4 h-3 bg-gray-500 rounded"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center items-center">
                                        <div className="w-14 sm:w-20 lg:h-4 h-3 bg-gray-500 rounded"></div>
                                    </div>
                                </td>
                                {role !== "Instructor" && (
                                    <td>
                                        <button
                                            disabled
                                            className="btn text-base-content btn-sm lg:rounded-lg rounded-full disabled:bg-base-300 animate-bounce"
                                        >
                                            <MdLibraryAdd />{" "}
                                            {isSmallDevice ? (
                                                <span className="text-[12px]">
                                                    {" "}
                                                    Book
                                                </span>
                                            ) : (
                                                <span>Book Course</span>
                                            )}
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <button
                    disabled
                    className="lg:mt-10 mt-6 disabled:bg-base-300 btn btn-sm lg:btn-md text-sm lg:text-lg rounded-full animate-bounce"
                >
                    <BiDotsVerticalRounded />
                    Load More
                </button>
            </div>
        </div>
    );
};

export default SklClasses;
