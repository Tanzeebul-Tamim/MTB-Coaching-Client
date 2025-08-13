import { Link } from "react-router-dom";
import MyCoursesTableHead from "./MyCoursesTableHead";
import { FaList } from "react-icons/fa";
import ImageWithLoader from "../../../components/ui/ImageWithLoader";
import getStatus from "../../../hooks/getStatus";
import { BsInfoCircleFill } from "react-icons/bs";
import ClassDetail from "../../../components/ui/ClassDetail";

const MyCoursesTable = ({
    userDetails,
    courses,
    isSmallDevice,
    search,
    settings,
}) => {
    const { resultsPerPage, currentPage } = settings;

    if (!courses || courses.length === 0) {
        return (
            <div
                className={`flex lg:h-[55vh] ${
                    search ? "mt-[40%]" : "mt-[80%]"
                } lg:mt-0 items-center justify-center`}
            >
                <h1 className="z-[10] text-accent lg:text-base-content description lg:text-5xl text-2xl text-center">
                    {search
                        ? "No Courses Found For Your Search"
                        : "You Haven't Created Any Courses Yet"}
                </h1>
            </div>
        );
    }

    return (
        <div
            className={`overflow-x-auto custom-scrollbar z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg ${
                courses.length > 5
                    ? "lg:max-h-[50vh] max-h-[45vh] overflow-y-auto"
                    : ""
            }`}
        >
            <table className="z-[100] table text-center description dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 whitespace-nowrap lg:whitespace-normal">
                {/* head */}
                <MyCoursesTableHead isSmallDevice={isSmallDevice} />
                <tbody className="text-sm">
                    {courses.map((course, index) => {
                        const {
                            name,
                            price,
                            image,
                            startDate,
                            endDate,
                            totalStudent,
                            studentSlot
                        } = course;
                        const newIndex = resultsPerPage * (currentPage - 1) + index;
                        const modalId = `class_modal_${index}`;
                        const status = getStatus(startDate, endDate);

                        return (
                            <>
                                <tr key={course._id}>
                                    <td>
                                        {newIndex + 1}
                                    </td>
                                    <td className="flex justify-center">
                                        <ImageWithLoader
                                            className={`lg:w-20 lg:h-12 h-6 rounded-lg lg:rounded-xl ${
                                                isSmallDevice && "object-cover"
                                            }`}
                                            src={course.image}
                                            alt={course["class-name"]}
                                        />
                                    </td>
                                    <td>
                                        {isSmallDevice
                                            ? course?.name.length > 15
                                                ? course.name.slice(0, 15) +
                                                  "..."
                                                : course.name
                                            : course?.name}
                                    </td>
                                    <td>$ {course.price}</td>
                                    {!isSmallDevice && (
                                        <td>{course.studentSlot}</td>
                                    )}
                                    <td>{course.totalStudent}</td>
                                    <td
                                        className={`text-base-content ${
                                            status === "Ongoing"
                                                ? "text-green-600"
                                                : status === "Upcoming"
                                                ? "text-blue-600"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {status}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                window[modalId].showModal()
                                            }
                                            className="btn btn-xs text-xs lg:rounded-lg rounded-full text-base-content hover:bg-base-200 bg-base-100 dark:hover:bg-stone-700 dark:bg-stone-500 border-0"
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
                                        <Link
                                            to={`/dashboard/my-classes/students/${userDetails?._id}/${newIndex}`}
                                            className="btn btn-xs text-xs lg:rounded-lg rounded-full text-base-content hover:bg-base-200 bg-base-100 dark:hover:bg-stone-700 dark:bg-stone-500 border-0"
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
                                <ClassDetail
                                    i={index}
                                    detail={{
                                        name,
                                        price,
                                        image,
                                        startDate,
                                        endDate,
                                        totalStudent,
                                        studentSlot
                                    }}
                                />
                            </>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default MyCoursesTable;
