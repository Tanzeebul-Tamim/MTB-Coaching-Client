import { FaBookOpen } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { ClipLoader } from "react-spinners";
import { light, dark } from "../../styles/colors.json";
import useDarkTheme from "../../hooks/useDarkTheme";

const SklMyStudents = ({ isSmallDevice }) => {
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
                } lg:gap-2 text-white description lg:text-xl`}
            >
                <span className="z-[100] flex items-center gap-2 dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200">
                    <FaBookOpen className="lg:text-2xl" />
                    <strong>
                        {!isSmallDevice && "Offered"} Courses Name :{" "}
                    </strong>
                    <ClipLoader color={color} />
                </span>

                <span className="z-[100] flex items-center gap-2 dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200">
                    <PiStudentFill className="lg:text-2xl" />
                    <strong>Total Students : </strong>
                    <ClipLoader color={color} />
                </span>
            </div>
            <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg table-wrapper">
                <table className="z-[100] table text-center description text-base-content whitespace-nowrap lg:whitespace-normal">
                    {/* head */}
                    <thead className="bg-base-200 bg-opacity-50">
                        <tr className="dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 text-xs">
                            <th>No</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>ContactNo</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {Array.from({ length: 5 }).map((_, i) => {
                            return (
                                <tr className="" key={i}>
                                    <td>{i + 1}</td>
                                    <td className="flex justify-center">
                                        <img
                                            className="rounded-full w-[4.5vh]"
                                            src="/assets/user_avatar.png"
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
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SklMyStudents;
