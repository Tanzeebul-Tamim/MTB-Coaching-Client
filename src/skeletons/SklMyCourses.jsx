import { FaList } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { ClipLoader } from "react-spinners";

const SklMyCourses = ({ isSmallDevice }) => {
    return (
        <div className="animate-pulse">
            <div
                className={`lg:mb-5 mb-2 mt-[35%] z-10 lg:mt-0 ${
                    isSmallDevice
                        ? "flex lg:flex-row lg:justify-between flex-col items-center"
                        : "flex justify-between"
                } lg:gap-2 text-white description lg:text-xl`}
            >
                <span className="z-[100] flex items-center gap-2">
                    <GiTeacher className="lg:text-2xl" />
                    <strong>
                        {!isSmallDevice && "Offered"} Courses Count :{" "}
                    </strong>
                    <ClipLoader color="rgb(256 256 256)" />
                </span>

                <span className="z-[100] flex items-center gap-2">
                    <PiStudentFill className="lg:text-2xl" />
                    <strong>Total Students : </strong>
                    <ClipLoader color="rgb(256 256 256)" />
                </span>
            </div>
            <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg">
                <table className="z-[100] table text-center description text-white whitespace-nowrap lg:whitespace-normal">
                    {/* head */}
                    <thead className="bg-base-200 bg-opacity-50">
                        <tr className="text-white text-xs">
                            <th>No</th>
                            <th>Image</th>
                            <th>Course Name</th>
                            <th>Price</th>
                            {!isSmallDevice && <th>Seats</th>}
                            <th>Enrolled</th>
                            <th>Remaining</th>
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
                                            src="/class-loading.gif"
                                        />
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </td>
                                    {!isSmallDevice && (
                                        <td>
                                            <div className="flex items-center justify-center">
                                                <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-200 rounded"></div>
                                            </div>
                                        </td>
                                    )}
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            disabled
                                            className="btn text-white btn-xs text-xs border-0 lg:rounded-lg rounded-full disabled:bg-stone-700 animate-bounce"
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
