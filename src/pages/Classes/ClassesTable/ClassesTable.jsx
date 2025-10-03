import ClassesTableHead from "./ClassesTableHead";
import {
    BsCartFill,
    BsFillCartCheckFill,
    BsInfoCircleFill,
} from "react-icons/bs";
import { BeatLoader } from "react-spinners";
import ImageWithLoader from "../../../components/ui/ImageWithLoader";
import { light, dark } from "../../../styles/colors.json";
import useClassesTable from "./useClassesTable";
import ClassDetail from "../../../components/ui/ClassDetail";
import getStatus from "../../../hooks/getStatus";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { RxCircleBackslash } from "react-icons/rx";

const ClassesTable = ({
    classes,
    tableRef,
    isSmallDevice,
    rest,
    user,
    userDetails,
    userLoading,
    isLoggedIn,
    navigate,
    play,
}) => {
    const { booking, setBooking, loading } = rest;
    const { bookedClasses, enrolledClasses, isDarkTheme, handleBook } =
        useClassesTable(userDetails, user);

    const sliceChar = 20;
    const mobileSliceChar = 25;

    return (
        <>
            {classes?.length == 0 ? (
                <div className="lg:text-5xl text-2xl text-center flex justify-center py-28">
                    <h1>No results found for your search</h1>
                </div>
            ) : (
                <div ref={tableRef} className="overflow-x-auto table-wrapper">
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

                                const status = getStatus(
                                    classItem?.startDate,
                                    classItem?.endDate
                                );
                                const colorCondition =
                                    status === "Ended"
                                        ? "red"
                                        : status === "Ongoing"
                                        ? "green"
                                        : "blue";
                                const color = `text-${colorCondition}-600`;

                                const modalId = `class_modal_${index}`;

                                return (
                                    <>
                                        <tr
                                            className={
                                                availableSeat == 0 &&
                                                "dark:bg-red-950 bg-red-400"
                                            }
                                            key={classItem?._id}
                                        >
                                            <td>{index + 1}</td>
                                            <td className="lg:flex lg:justify-center">
                                                <Link
                                                    to={`/instructors/${classItem?.instructorId}`}
                                                >
                                                    <ImageWithLoader
                                                        className="lg:w-32 lg:rounded-xl rounded-lg lg:h-16"
                                                        src={classItem?.image}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </Link>
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/instructors/${classItem?.instructorId}`}
                                                >
                                                    <div>
                                                        {isSmallDevice
                                                            ? classItem?.name
                                                                  .length >
                                                              mobileSliceChar
                                                                ? classItem.name.slice(
                                                                      0,
                                                                      mobileSliceChar
                                                                  ) + "..."
                                                                : classItem.name
                                                            : classItem?.name
                                                                  .length >
                                                              sliceChar
                                                            ? classItem.name.slice(
                                                                  0,
                                                                  sliceChar
                                                              ) + "..."
                                                            : classItem.name}
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className={color}>{status}</td>
                                            <td>$ {classItem?.price}</td>
                                            <td
                                                className={
                                                    availableSeat == 0 &&
                                                    "text-red-700"
                                                }
                                            >
                                                {availableSeat}
                                            </td>
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
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            if (isLoggedIn) {
                                                                window[
                                                                    modalId
                                                                ].showModal();
                                                            } else {
                                                                toast.info(
                                                                    <div className="text-center">
                                                                        To view
                                                                        course
                                                                        details,
                                                                        you have
                                                                        to{" "}
                                                                        <strong>
                                                                            login
                                                                        </strong>{" "}
                                                                        first
                                                                    </div>,
                                                                    {
                                                                        position:
                                                                            "top-center",
                                                                        autoClose: 2000,
                                                                        hideProgressBar: false,
                                                                        closeOnClick: true,
                                                                        pauseOnFocusLoss: false,
                                                                        draggable: true,
                                                                        toastId:
                                                                            "unauthorized",
                                                                        progress:
                                                                            undefined,
                                                                    }
                                                                );
                                                                navigate(
                                                                    "/login",
                                                                    {
                                                                        state: {
                                                                            from: location,
                                                                        },
                                                                    }
                                                                );
                                                                play("warning");
                                                                return;
                                                            }
                                                        }}
                                                        className={`btn text-base-content btn-sm lg:rounded-lg rounded-full ${
                                                            availableSeat == 0
                                                                ? "dark:bg-red-800 bg-red-600 hover:bg-red-700 hover:text-stone-300 dark:hover:text-stone-800 dark:hover:bg-red-700"
                                                                : "hover:bg-base-300 bg-base-200 hover:text-stone-300 dark:hover:text-stone-950"
                                                        } border-0`}
                                                    >
                                                        <BsInfoCircleFill />
                                                        {isSmallDevice ? (
                                                            <span className="text-[12px]">
                                                                {" "}
                                                                View
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                View Detail
                                                            </span>
                                                        )}
                                                    </button>
                                                )}
                                            </td>
                                            {userDetails?.role !==
                                                "Instructor" && (
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
                                                        <div className="flex gap-2 items-center justify-center">
                                                            <BsFillCartCheckFill />{" "}
                                                            <span>Added</span>
                                                        </div>
                                                    ) : isEnrolled ? (
                                                        availableSeat == 0 ? (
                                                            <div className="flex gap-2 items-center justify-center text-red-700">
                                                                <RiVerifiedBadgeFill />{" "}
                                                                <span>
                                                                    Enrolled
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex gap-2 items-center justify-center">
                                                                <RiVerifiedBadgeFill />{" "}
                                                                <span>
                                                                    Enrolled
                                                                </span>
                                                            </div>
                                                        )
                                                    ) : availableSeat == 0 ? (
                                                        <div className="flex gap-2 items-center justify-center text-red-700">
                                                            <RxCircleBackslash />{" "}
                                                            <span>
                                                                Fully Booked
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() =>
                                                                handleBook(
                                                                    isBooked,
                                                                    classItem,
                                                                    booking,
                                                                    setBooking
                                                                )
                                                            }
                                                            disabled={
                                                                availableSeat ==
                                                                    0 ||
                                                                userDetails?.role ==
                                                                    "Instructor" ||
                                                                isBooked ||
                                                                isEnrolled ||
                                                                loading ||
                                                                userLoading
                                                            }
                                                            className={`${
                                                                availableSeat ==
                                                                0
                                                                    ? "dark:disabled:bg-red-800 disabled:bg-red-600 "
                                                                    : "dark:disabled:bg-[#1c1917] disabled:bg-[#a79d83]"
                                                            } btn text-base-content btn-sm lg:rounded-lg rounded-full hover:bg-base-300 bg-base-200 border-0 hover:text-stone-300 dark:hover:text-stone-950`}
                                                        >
                                                            <BsCartFill />{" "}
                                                            {isSmallDevice ? (
                                                                <span className="text-[12px]">
                                                                    {" "}
                                                                    Add
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    Add to Cart
                                                                </span>
                                                            )}
                                                        </button>
                                                    )}
                                                </td>
                                            )}
                                        </tr>
                                        <ClassDetail
                                            i={index}
                                            detail={classItem}
                                        />
                                    </>
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
