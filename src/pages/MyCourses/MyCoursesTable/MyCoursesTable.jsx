import { Link } from "react-router-dom";
import MyCoursesTableHead from "./MyCoursesTableHead";
import { FaList } from "react-icons/fa";

const MyCoursesTable = ({ userDetails, instructorCourses, isSmallDevice }) => {
    if (!instructorCourses || instructorCourses.length === 0) {
        return (
            <div className="flex lg:h-[55vh] mt-[80%] lg:mt-0 items-center justify-center">
                <h1 className="z-[10] description lg:text-5xl text-2xl text-center">
                    You Haven&apos;t Created Any Courses Yet
                </h1>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg">
            <table className="z-[100] table text-center description text-white whitespace-nowrap lg:whitespace-normal">
                {/* head */}
                <MyCoursesTableHead isSmallDevice={isSmallDevice} />
                <tbody className={"text-sm"}>
                    {instructorCourses.map((course, index) => {
                        const remainingCount =
                            course.studentSlot - course.totalStudent;

                        return (
                            <tr key={course._id}>
                                <td>{index + 1}</td>
                                <td className="flex justify-center">
                                    <img
                                        className={`w-16 rounded-lg lg:rounded-xl ${
                                            isSmallDevice && "object-cover"
                                        }`}
                                        src={course.image}
                                        alt={course["class-name"]}
                                    />
                                </td>
                                <td>
                                    {isSmallDevice
                                        ? course?.name.length > 15
                                            ? course.name.slice(0, 15) + "...."
                                            : course.name
                                        : course?.name}
                                </td>
                                <td>$ {course.price}</td>
                                {!isSmallDevice && (
                                    <td>{course.studentSlot}</td>
                                )}
                                <td>{course.totalStudent}</td>
                                <td>{remainingCount}</td>
                                <td>
                                    <Link
                                        to={`/dashboard/my-class/students/${userDetails._id}/${index}`}
                                        className="btn text-white btn-xs text-xs border-0 lg:rounded-lg rounded-full hover:bg-stone-800 bg-stone-700"
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
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default MyCoursesTable;
