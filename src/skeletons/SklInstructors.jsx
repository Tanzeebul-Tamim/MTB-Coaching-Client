import { BiDotsVerticalRounded } from "react-icons/bi";
import useScreenSize from "../hooks/useScreeSize";
import { FaChalkboardTeacher } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const SklInstructors = () => {
    const { isSmallDevice } = useScreenSize();
    return (
        <div className="lg:pt-10 pt-5 animate-pulse description">
            <div className="lg:mb-5 mb-2 flex gap-2 text-white description lg:text-xl">
                <strong className="flex items-center gap-2">
                    <FaChalkboardTeacher className="lg:text-2xl text-xl" />
                    <span>Instructors Count :</span>
                    <ClipLoader color="rgb(256 256 256)" />
                </strong>{" "}
            </div>
            <div className="overflow-x-auto">
                <table className="table text-center lg:whitespace-normal whitespace-nowrap">
                    <thead className="bg-base-200">
                        <tr className="text-white lg:text-lg text-sm">
                            <th className="">No</th>
                            <th className="">Image</th>
                            <th className="">Name - Email</th>
                            <th className="">Quote</th>
                            <th className="">Courses Taken</th>
                            <th className="">See Courses</th>
                        </tr>
                    </thead>
                    <tbody className="lg:text-xl text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask lg:mask-squircle mask-circle lg:w-24 lg:h-24 h-10 w-10 bg-gray-200"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col justify-center items-center">
                                        <div>
                                            <div className="font-bold bg-gray-200 rounded h-3 lg:h-4 w-24"></div>
                                        </div>
                                        <div className="badge badge-ghost badge-md bg-gray-200 h-2 lg:h-5 w-32"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <div className="quote bg-gray-200 rounded h-3 lg:h-4 w-32"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <div className="bg-gray-200 rounded h-3 lg:h-4 w-4"></div>
                                    </div>
                                </td>
                                <td>
                                    <button
                                        disabled
                                        className="btn text-white btn-sm lg:rounded-lg rounded-full disabled:bg-stone-800 animate-bounce"
                                    >
                                        {isSmallDevice ? (
                                            <span className="text-[12px]">
                                                View
                                            </span>
                                        ) : (
                                            <>See Courses</>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <button
                    disabled
                    className="lg:mt-10 mt-6 disabled:bg-stone-800 btn btn-sm lg:btn-md text-sm lg:text-lg rounded-full hover:bg-stone-700 bg-stone-800 animate-bounce"
                >
                    <BiDotsVerticalRounded />
                    Load More
                </button>
            </div>
        </div>
    );
};

export default SklInstructors;
