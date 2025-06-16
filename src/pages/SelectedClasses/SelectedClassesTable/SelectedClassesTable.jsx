import SelectedClassesTableHead from "./SelectedClassesTableHead";
import { BsFillCreditCardFill, BsFillTrash3Fill } from "react-icons/bs";
import { Link } from "react-router-dom";
import ImageWithLoader from "../../../components/ui/ImageWithLoader";
import useSelectedClassesTable from "./useSelectedClassesTable";

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
            className={`overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg ${
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
                        return (
                            <tr className="" key={classItem._id}>
                                <td>
                                    {resultsPerPage * (currentPage - 1) +
                                        (index + 1)}
                                </td>
                                <td className="flex justify-center">
                                    <ImageWithLoader
                                        className={`lg:w-20 lg:h-12 h-6 rounded-lg lg:rounded-xl ${
                                            isSmallDevice && "object-cover"
                                        }`}
                                        src={classItem.classImage}
                                    />
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">
                                            {isSmallDevice
                                                ? classItem?.["class-name"]
                                                      .length > 15
                                                    ? classItem[
                                                          "class-name"
                                                      ].slice(0, 15) + "..."
                                                    : classItem["class-name"]
                                                : classItem?.["class-name"]}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">
                                            {classItem.instructorName}
                                        </div>
                                    </div>
                                </td>
                                <td>$ {classItem.classFee}</td>
                                <td>
                                    <Link
                                        onClick={updateProfile}
                                        to={
                                            userDetails.address &&
                                            userDetails.contactNo &&
                                            userDetails.gender &&
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
                                            <>
                                                <BsFillCreditCardFill />
                                                <span>Pay</span>
                                            </>
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
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default SelectedClassesTable;
