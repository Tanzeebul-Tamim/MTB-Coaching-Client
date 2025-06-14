import SelectedClassesTableHead from "./SelectedClassesTableHead";
import { BsFillCreditCardFill, BsFillTrash3Fill } from "react-icons/bs";
import { deleteClass } from "../../../api/bookApi";
import { Link } from "react-router-dom";
import ImageWithLoader from "../../../components/ui/ImageWithLoader";
import useSelectedClassesTable from "./useSelectedClassesTable";

const SelectedClassesTable = ({
    userBookings,
    isSmallDevice,
    search,
    settings,
    userDetails,
}) => {
    const {
        resultsPerPage,
        currentPage,
        deletingId,
        setDeletingId,
        updateProfile,
    } = useSelectedClassesTable(settings, userBookings, search, userDetails);

    return (
        <div
            className={`overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg ${
                userBookings.length > 5
                    ? "lg:max-h-[50vh] max-h-[45vh] overflow-y-auto"
                    : ""
            }`}
        >
            <table className="z-[100] table text-center description text-white whitespace-nowrap lg:whitespace-normal">
                {/* head */}
                <SelectedClassesTableHead />
                <tbody className="text-sm">
                    {userBookings.map((classItem, index) => {
                        const handleDelete = (
                            studentId,
                            instructorId,
                            classIndex,
                            bookingId
                        ) => {
                            setDeletingId(bookingId);
                            deleteClass(
                                studentId,
                                instructorId,
                                classIndex
                            ).finally(() => setDeletingId(null));
                        };

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
                                        className="btn text-white btn-xs text-xs border-0 lg:rounded-lg rounded-full hover:bg-stone-800 bg-stone-700"
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
                                        disabled={deletingId === classItem._id}
                                        className="btn text-white btn-xs text-xs border-0 lg:rounded-lg rounded-full hover:bg-stone-800 bg-stone-700 disabled:bg-stone-700 disabled:cursor-not-allowed"
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
