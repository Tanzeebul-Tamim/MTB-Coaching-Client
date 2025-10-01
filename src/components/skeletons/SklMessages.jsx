import { GiTeacher } from "react-icons/gi";
import { ClipLoader } from "react-spinners";
import useDarkTheme from "../../hooks/useDarkTheme";
import { light, dark } from "../../styles/colors.json";
import { MdMessage } from "react-icons/md";

const SklMessages = ({ isSmallDevice }) => {
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
            <div className="z-10 mt-[35%] lg:mt-0 lg:mb-5 mb-2 flex justify-between lg:gap-2 text-base-content description lg:text-xl">
                <span className="z-[100] flex items-center gap-2 lg:text-base-content text-accent">
                    <GiTeacher className="lg:text-2xl" />
                    <strong>
                        {!isSmallDevice && "Submitted"} Tickets Count :{" "}
                    </strong>
                    <ClipLoader color={color} />
                </span>{" "}
            </div>
            <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg table-wrapper">
                <table className="z-[100] table text-center description text-base-content whitespace-nowrap lg:whitespace-normal">
                    {/* head */}
                    <thead className="bg-base-200 dark:lg:bg-opacity-50 dark:bg-opacity-50 lg:bg-opacity-50 bg-opacity-70">
                        <tr className="dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 text-sm">
                            <th className="">No</th>
                            <th className="">Ticket No</th>
                            <th className="">Subject</th>
                            <th className="">Date</th>
                            <th className="">Time</th>
                            <th className="">Status</th>
                            <th className="">Message</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {Array.from({ length: 8 }).map((_, i) => {
                            return (
                                <tr className="" key={i}>
                                    <td>{i + 1}</td>
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
                                        <button
                                            disabled
                                            className="btn btn-xs text-xs lg:rounded-lg rounded-full text-base-content dark:bg-stone-500 border-0 disabled:bg-base-200 dark:disabled:bg-base-200 animate-bounce"
                                        >
                                            {isSmallDevice ? (
                                                <>
                                                    <span className="text-[12px]">
                                                        View
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <MdMessage />
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

export default SklMessages;
