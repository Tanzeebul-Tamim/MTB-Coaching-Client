import SelectedClassesTableHead from "./SelectedClassesTableHead";
import { BsFillCreditCardFill, BsFillTrash3Fill } from "react-icons/bs";
import { deleteClass } from "../../../api/bookApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import ImageWithLoader from "../../../reusable/ImageWithLoader";

const SelectedClassesTable = ({
    userBookings,
    isSmallDevice,
    search,
    settings,
    userDetails,
}) => {
    const { resultsPerPage, currentPage } = settings;
    const [deletingId, setDeletingId] = useState(null);

    if (userBookings?.length === 0) {
        return (
            <div
                className={`flex lg:h-[55vh] ${
                    search ? "mt-[40%]" : "mt-[80%]"
                } lg:mt-0 items-center justify-center`}
            >
                <h1 className="z-[10] description lg:text-5xl text-2xl text-center">
                    {search
                        ? "No Bookings Found For Your Search"
                        : "You Haven't Booked Any Courses Yet"}
                </h1>
            </div>
        );
    }

    const updateProfile = () => {
        if (
            typeof userDetails.address === "undefined" ||
            typeof userDetails.contactNo === "undefined" ||
            userDetails.gender === "undefined"
        ) {
            toast.warning(
                "To purchase classes, you have to update your profile first!",
                {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }
            );
            setTimeout(function () {
                window.location.replace("/dashboard/profile");
            }, 2400);
        }
    };

    return (
        <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg">
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
