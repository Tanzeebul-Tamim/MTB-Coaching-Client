import { BsFillCreditCardFill, BsFillTrash3Fill, BsInfoCircleFill } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { ClipLoader } from "react-spinners";
import useDarkTheme from "../../hooks/useDarkTheme";
import { light, dark } from "../../styles/colors.json";

const SklSelectedClasses = ({ isSmallDevice }) => {
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
            <div className="lg:mb-5 mb-2 mt-[35%] lg:mt-0 z-10 flex justify-between gap-2 text-base-content description lg:text-xl">
                <div className="z-[100] flex items-center gap-2 dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200">
                    <GiTeacher className="lg:text-2xl" />
                    <strong>
                        {!isSmallDevice && "My Booked"} Courses Count :{" "}
                    </strong>
                    <ClipLoader color={color} />
                </div>{" "}
                <button
                    disabled
                    className="z-[100] btn white btn-xs text-sx border-0 rounded-lg disabled:bg-base-200 animate-bounce"
                >
                    <span>Clear List</span>
                </button>
            </div>
            <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg table-wrapper">
                <table className="z-[100] table text-center description text-base-content whitespace-nowrap lg:whitespace-normal">
                    {/* head */}
                    <thead className="bg-base-200 bg-opacity-50">
                        <tr className="dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 text-xs">
                            <th className="">No</th>
                            <th className="">Image</th>
                            <th className="">Course</th>
                            <th className="">Instructor</th>
                            <th className="">Price</th>
                            <th className="">Details</th>
                            <th className="">Enroll</th>
                            <th className="">Delete</th>
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
                                            src="/assets/class-loading.gif"
                                        />
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-4 bg-gray-500 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-4 bg-gray-500 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-4 bg-gray-500 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            disabled
                                            className="btn btn-xs text-xs border-0 lg:rounded-lg rounded-full animate-bounce disabled:bg-base-200"
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
                                            className="btn btn-xs text-xs border-0 lg:rounded-lg rounded-full animate-bounce disabled:bg-base-200"
                                        >
                                            {isSmallDevice ? (
                                                <>
                                                    <span className="text-[12px]">
                                                        Pay
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <BsFillCreditCardFill />
                                                    <span>Pay</span>
                                                </>
                                            )}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            disabled
                                            className="btn btn-xs text-xs border-0 lg:rounded-lg rounded-full animate-bounce disabled:bg-base-200"
                                        >
                                            {isSmallDevice ? (
                                                <>
                                                    <span className="text-[12px]">
                                                        Delete
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <BsFillTrash3Fill />
                                                    <span>Delete</span>
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

export default SklSelectedClasses;
