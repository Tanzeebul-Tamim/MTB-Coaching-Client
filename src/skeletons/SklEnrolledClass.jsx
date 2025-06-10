import { GiTeacher } from "react-icons/gi";
import { ClipLoader } from "react-spinners";

const SklEnrolledClass = ({ isSmallDevice }) => {
    return (
        <div className="animate-pulse">
            <div className="z-10 mt-[35%] lg:mt-0 lg:mb-5 mb-2 flex justify-between lg:gap-2 text-white description lg:text-xl">
                <span className="z-[100] flex items-center gap-2">
                    <GiTeacher className="lg:text-2xl" />
                    <strong>
                        {!isSmallDevice && "Enrolled"} Courses Count :{" "}
                    </strong>
                    <ClipLoader color="rgb(256 256 256)" />
                </span>{" "}
            </div>
            <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg">
                <table className="z-[100] table text-center description text-white whitespace-nowrap lg:whitespace-normal">
                    {/* head */}
                    <thead className="bg-base-200 bg-opacity-50">
                        <tr className="text-white text-xs">
                            <th className="">No</th>
                            <th className="">Image</th>
                            <th className="">Course</th>
                            <th className="">Instructor</th>
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
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SklEnrolledClass;
