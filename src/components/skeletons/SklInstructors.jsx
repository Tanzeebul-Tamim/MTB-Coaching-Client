import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import useScreenSize from "../../hooks/useScreenSize";
import useDarkTheme from "../../hooks/useDarkTheme";
import { light, dark } from "../../styles/colors.json";

const SklInstructors = () => {
    const { isSmallDevice } = useScreenSize();
    const isDarkTheme = useDarkTheme();
    const color = isDarkTheme ? dark.baseContent : light.baseContent;

    return (
        <div className="lg:pt-10 pt-5 animate-pulse">
            <div className="lg:mb-5 mb-2 flex gap-2 text-base-content description lg:text-xl">
                <strong className="flex items-center gap-2">
                    <FaChalkboardTeacher className="lg:text-2xl text-xl" />
                    <span>Instructors Count :</span>
                    <ClipLoader color={color} />
                </strong>{" "}
            </div>
            <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg">
                <table className="description table text-center lg:whitespace-normal whitespace-nowrap text-base-content">
                    <thead className="bg-base-200">
                        <tr className="lg:text-lg text-sm">
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
                                        <div className="mask lg:mask-squircle mask-circle lg:w-24 lg:h-24 h-10 w-10 bg-gray-500"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col justify-center items-center">
                                        <div>
                                            <div className="font-bold bg-gray-500 rounded h-3 lg:h-4 w-24"></div>
                                        </div>
                                        <div className="badge badge-ghost badge-md bg-gray-500 h-2 lg:h-5 w-32"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <div className="quote bg-gray-500 rounded h-3 lg:h-4 w-32"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <div className="bg-gray-500 rounded h-3 lg:h-4 w-4"></div>
                                    </div>
                                </td>
                                <td>
                                    <button
                                        disabled
                                        className="btn text-base-content btn-sm lg:rounded-lg rounded-full disabled:bg-base-300 animate-bounce"
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
                    className="lg:mt-10 mt-6 disabled:bg-base-300 btn btn-sm lg:btn-md text-sm lg:text-lg rounded-full animate-bounce"
                >
                    <BiDotsVerticalRounded />
                    Load More
                </button>
            </div>
        </div>
    );
};

export default SklInstructors;
