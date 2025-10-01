import { FaList } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { ClipLoader } from "react-spinners";
import useDarkTheme from "../../hooks/useDarkTheme";
import { light, dark } from "../../styles/colors.json";
import { BsInfoCircleFill } from "react-icons/bs";

const SklMyCourses = ({ isSmallDevice }) => {
    const isDarkTheme = useDarkTheme();
    const color = isSmallDevice
        ? isDarkTheme
            ? dark.accent
            : light.accent
        : isDarkTheme
        ? dark.baseContent
        : light.baseContent;

    return (
        <div className="animate-pulse">
            <div
                className={`lg:mb-5 mb-2 mt-[35%] z-10 lg:mt-0 ${
                    isSmallDevice
                        ? "flex lg:flex-row lg:justify-between flex-col items-center"
                        : "flex justify-between"
                } lg:gap-2 text-base-content description lg:text-xl`}
            >
                <span className="z-[100] flex items-center gap-2 lg:text-base-content text-accent">
                    <GiTeacher className="lg:text-2xl" />
                    <strong>
                        {!isSmallDevice && "Offered"} Courses Count :{" "}
                    </strong>
                    <ClipLoader color={color} />
                </span>

                <span className="z-[100] flex items-center gap-2 lg:text-base-content text-accent">
                    <PiStudentFill className="lg:text-2xl" />
                    <strong>Total Students : </strong>
                    <ClipLoader color={color} />
                </span>
            </div>
            <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg table-wrapper">
                <table className="z-[100] table text-center description text-base-content whitespace-nowrap lg:whitespace-normal">
                    {/* head */}
                    <thead className="bg-base-200 dark:lg:bg-opacity-50 dark:bg-opacity-50 lg:bg-opacity-50 bg-opacity-70">
                        <tr className="dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 text-sm">
                            <th>No</th>
                            <th>Image</th>
                            <th>Course Name</th>
                            <th>Price</th>
                            <th>Seats</th>
                            <th>Enrolled</th>
                            <th>Status</th>
                            <th>Details</th>
                            <th>Student List</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {Array.from({ length: 5 }).map((_, i) => {
                            return (
                                <tr className="" key={i}>
                                    <td>{i + 1}</td>
                                    <td className="flex justify-center">
                                        <img
                                            className="lg:w-20 lg:h-12 h-6 rounded-lg lg:rounded-xl object-cover"
                                            src="/assets/images/class-loading.gif"
                                        />
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-500 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-500 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-500 rounded"></div>
                                        </div>
                                    </td>
                                    {!isSmallDevice && (
                                        <td>
                                            <div className="flex items-center justify-center">
                                                <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-500 rounded"></div>
                                            </div>
                                        </td>
                                    )}
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-500 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            disabled
                                            className="btn btn-xs text-xs lg:rounded-lg rounded-full text-base-content dark:bg-stone-500  border-0 disabled:bg-base-200 dark:disabled:bg-base-200"
                                        >
                                            {isSmallDevice ? (
                                                <>
                                                    <span className="text-[12px]">
                                                        View
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <BsInfoCircleFill />
                                                    <span>View</span>
                                                </>
                                            )}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            disabled
                                            className="btn btn-xs text-xs lg:rounded-lg rounded-full text-base-content dark:bg-stone-500  border-0 disabled:bg-base-200 dark:disabled:bg-base-200"
                                        >
                                            {isSmallDevice ? (
                                                <>
                                                    <span className="text-[12px]">
                                                        View
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaList />
                                                    <span>View</span>
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SklMyCourses;
