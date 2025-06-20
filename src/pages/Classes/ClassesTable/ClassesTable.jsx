import ClassesTableHead from "./ClassesTableHead";
import { MdLibraryAdd } from "react-icons/md";
import { bookClass } from "../../../api/bookApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import ImageWithLoader from "../../../components/ui/ImageWithLoader";
import { light, dark } from "../../../styles/colors.json";
import useClassesTable from "./useClassesTable";

const ClassesTable = ({
    classes,
    tableRef,
    isSmallDevice,
    rest,
    user,
    userDetails,
    userLoading,
}) => {
    const { booking, setBooking, loading } = rest;
    const { bookedClasses, enrolledClasses, isDarkTheme } = useClassesTable(
        userDetails,
        user
    );

    return (
        <>
            {classes?.length == 0 ? (
                <div className="lg:text-5xl text-2xl text-center flex justify-center py-28">
                    <h1>No results found for your search</h1>
                </div>
            ) : (
                <div ref={tableRef} className="overflow-x-auto">
                    <table className="table text-center description text-base-content lg:whitespace-normal whitespace-nowrap">
                        {/* head */}
                        <ClassesTableHead
                            isSmallDevice={isSmallDevice}
                            userDetails={userDetails}
                        />
                        <tbody className="lg:text-xl text-xs">
                            {classes.map((classItem, index) => {
                                const availableSeat =
                                    classItem?.studentSlot -
                                    classItem?.totalStudent;
                                const isBooked =
                                    bookedClasses &&
                                    bookedClasses.includes(classItem?.name);
                                const isEnrolled =
                                    enrolledClasses &&
                                    enrolledClasses.includes(classItem?.name);

                                const handleBook = () => {
                                    if (!user) {
                                        toast.warning(
                                            "To book courses, you have to login first",
                                            {
                                                position: "top-center",
                                                autoClose: 1100,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            }
                                        );
                                        setTimeout(function () {
                                            window.location.replace("/login");
                                        }, 2000);
                                    } else if (user && !isBooked) {
                                        bookClass(
                                            userDetails._id,
                                            classItem.instructorId,
                                            user.email,
                                            user.displayName,
                                            classItem.classIndex
                                        );
                                        setBooking(!booking);
                                        toast.success(
                                            `"${classItem.name}" has been booked`,
                                            {
                                                position: "top-center",
                                                autoClose: 1100,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            }
                                        );
                                    }
                                };

                                return (
                                    <tr
                                        className={
                                            availableSeat == 0 &&
                                            "dark:bg-red-950 bg-red-400"
                                        }
                                        key={classItem?._id}
                                    >
                                        <td>{index + 1}</td>
                                        <td className="lg:flex lg:justify-center">
                                            <ImageWithLoader
                                                className="lg:w-32 lg:rounded-xl rounded-lg lg:h-16"
                                                src={classItem?.image}
                                                alt="Avatar Tailwind CSS Component"
                                            />
                                        </td>
                                        <td>
                                            <div>
                                                <div>
                                                    {isSmallDevice
                                                        ? classItem?.name
                                                              .length > 25
                                                            ? classItem.name.slice(
                                                                  0,
                                                                  25
                                                              ) + "..."
                                                            : classItem.name
                                                        : classItem?.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <Link
                                                    to={`/instructors/${classItem?.instructorId}`}
                                                    className="font-bold"
                                                >
                                                    {classItem?.instructorName}
                                                </Link>
                                            </div>
                                        </td>
                                        <td>$ {classItem?.price}</td>
                                        <td>
                                            {availableSeat == 0 ? (
                                                <div className="dark:text-red-800 text-red-700">
                                                    Fully Booked
                                                </div>
                                            ) : (
                                                availableSeat
                                            )}
                                        </td>
                                        {userDetails.role !== "Instructor" && (
                                            <td>
                                                {loading || userLoading ? (
                                                    <button
                                                        disabled
                                                        className="btn w-3/4 text-base-content btn-sm lg:rounded-lg rounded-full disabled:bg-base-300"
                                                    >
                                                        <BeatLoader
                                                            color={
                                                                isDarkTheme
                                                                    ? dark.accent
                                                                    : light.accent
                                                            }
                                                        />
                                                    </button>
                                                ) : isBooked ? (
                                                    <div>Booked</div>
                                                ) : isEnrolled ? (
                                                    availableSeat == 0 ? (
                                                        <div className="dark:text-red-800 text-red-700">
                                                            Enrolled
                                                        </div>
                                                    ) : (
                                                        <div>Enrolled</div>
                                                    )
                                                ) : (
                                                    <button
                                                        onClick={handleBook}
                                                        disabled={
                                                            availableSeat ==
                                                                0 ||
                                                            userDetails.role ==
                                                                "Instructor" ||
                                                            isBooked ||
                                                            isEnrolled ||
                                                            loading ||
                                                            userLoading
                                                        }
                                                        className={`${
                                                            availableSeat == 0
                                                                ? "dark:disabled:bg-red-800 disabled:bg-red-600"
                                                                : "dark:disabled:bg-[#1c1917] disabled:bg-[#a79d83]"
                                                        } btn text-base-content btn-sm lg:rounded-lg rounded-full hover:bg-base-300 bg-base-200 border-0`}
                                                    >
                                                        <MdLibraryAdd />{" "}
                                                        {isSmallDevice ? (
                                                            <span className="text-[12px]">
                                                                {" "}
                                                                Book
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                Book Course
                                                            </span>
                                                        )}
                                                    </button>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ClassesTable;
