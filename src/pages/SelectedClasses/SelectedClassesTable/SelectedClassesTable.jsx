import SelectedClassesTableHead from "./SelectedClassesTableHead";
import {
    BsFillCreditCardFill,
    BsFillTrash3Fill,
    BsInfoCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import ImageWithLoader from "../../../components/ui/ImageWithLoader";
import useSelectedClassesTable from "./useSelectedClassesTable";
import ClassDetail from "../../../components/ui/ClassDetail";

const SelectedClassesTable = ({
    userBookings,
    handleDelete,
    isSmallDevice,
    search,
    settings,
    userDetails,
}) => {
    const { updateProfile } = useSelectedClassesTable(userDetails);

    const { resultsPerPage, currentPage } = settings;

    if (userBookings?.length === 0) {
        return (
            <div
                className={`flex lg:h-[55vh] ${
                    search ? "mt-[40%]" : "mt-[80%]"
                } lg:mt-0 items-center justify-center`}
            >
                <h1 className="z-[10] text-accent lg:text-base-content description lg:text-5xl text-2xl text-center">
                    {search
                        ? "No Bookings Found For Your Search"
                        : "You Haven't Booked Any Courses Yet"}
                </h1>
            </div>
        );
    }

    return (
        <div
            className={`overflow-x-auto custom-scrollbar z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg ${
                userBookings.length > 5
                    ? "lg:max-h-[50vh] max-h-[45vh] overflow-y-auto"
                    : ""
            }`}
        >
            <table className="z-[100] table text-center description dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 whitespace-nowrap lg:whitespace-normal">
                {/* head */}
                <SelectedClassesTableHead />
                <tbody className="text-sm">
                    {userBookings.map((classItem, index) => {
                        const newIndex =
                            resultsPerPage * (currentPage - 1) + index;
                        const modalId = `class_modal_${index}`;

                        return (
                            <>
                                <tr className="" key={classItem._id}>
                                    <td>{newIndex + 1}</td>
                                    <td className="flex justify-center">
                                        <ImageWithLoader
                                            className={`lg:w-20 lg:h-12 h-6 rounded-lg lg:rounded-xl ${
                                                isSmallDevice && "object-cover"
                                            }`}
                                            src={classItem.classImage}
                                        />
                                    </td>
                                    <td>
                                        {isSmallDevice
                                            ? classItem?.["class-name"].length >
                                              15
                                                ? classItem["class-name"].slice(
                                                      0,
                                                      15
                                                  ) + "..."
                                                : classItem["class-name"]
                                            : classItem?.["class-name"]}
                                    </td>
                                    <td>{classItem.instructorName}</td>
                                    <td>$ {classItem.classFee}</td>
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
                                            onClick={updateProfile}
                                            to={
                                                userDetails?.address &&
                                                userDetails?.contactNo &&
                                                userDetails?.gender &&
                                                `/dashboard/selected-classes/${classItem.studentId}/${classItem._id}`
                                            }
                                            className="btn btn-xs text-xs lg:rounded-lg rounded-full text-base-content hover:bg-base-200 bg-base-100 dark:hover:bg-stone-700 dark:bg-stone-500 border-0"
                                        >
                                            {isSmallDevice ? (
                                                <>
                                                    <span className="text-[12px]">
                                                        Pay
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="custom-cursor-pointer flex items-center gap-2">
                                                    <BsFillCreditCardFill />
                                                    <span>Pay</span>
                                                </span>
                                            )}
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    classItem.studentId,
                                                    classItem.instructorId,
                                                    classItem.classIndex,
                                                    classItem._id
                                                )
                                            }
                                            className="btn btn-xs text-xs lg:rounded-lg rounded-full text-base-content hover:bg-base-200 bg-base-100 dark:hover:bg-stone-700 dark:bg-stone-500 border-0"
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
                                <ClassDetail
                                    i={index}
                                    detail={{
                                        name: classItem["class-name"],
                                        instructorId: classItem.instructorId,
                                        instructorName:
                                            classItem.instructorName,
                                        image: classItem.classImage,
                                        price: classItem.classFee,
                                        startDate: classItem.startDate,
                                        endDate: classItem.endDate,
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

export default SelectedClassesTable;
