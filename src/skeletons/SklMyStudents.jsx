import { FaBookOpen } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { ClipLoader } from "react-spinners";

const SklMyStudents = ({ isSmallDevice }) => {
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
                    <FaBookOpen className="lg:text-2xl" />
                    <strong>
                        {!isSmallDevice && "Offered"} Courses Name :{" "}
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
                                            src="/user_avatar.png"
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
