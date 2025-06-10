/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import ClassesTableHead from "./ClassesTableHead";
import { MdLibraryAdd } from "react-icons/md";
import { bookClass, getBookedClasses } from "../../../api/bookApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const ClassesTable = ({
    classes,
    tableRef,
    isSmallDevice,
    rest,
    user,
    userDetails,
    userLoading,
}) => {
    const [userBookings, setUserBookings] = useState([]);
    const [bookedClasses, setBookedClasses] = useState([]);
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const unpaid = userBookings?.filter(
        (booking) => booking.paymentStatus === "unpaid"
    );
    const paid = userBookings?.filter(
        (booking) => booking.paymentStatus === "paid"
    );

    const { booking, setBooking, loading } = rest;

    useEffect(() => {
        if (user && user.email && userDetails._id) {
            getBookedClasses(userDetails._id)
                .then((data) => {
                    setUserBookings(data);
                })
                .catch((error) => console.error(error));
        } else if (!user) {
            setUserBookings(null);
            setBookedClasses(null);
            setEnrolledClasses(null);
        }
    }, [userDetails, userBookings]);

    useEffect(() => {
        if (unpaid?.length > 0) {
            const bookedClassNames = unpaid.map(
                (booking) => booking["class-name"]
            );
            setBookedClasses(bookedClassNames);
        }
        if (paid?.length > 0) {
            const enrolledClassNames = paid.map(
                (booking) => booking["class-name"]
            );
            setEnrolledClasses(enrolledClassNames);
        }
    }, [userBookings, user]);

    return (
        <>
            {classes?.length == 0 ? (
                <div className="lg:text-5xl text-2xl text-center flex justify-center py-28">
                    <h1>No results found for your search</h1>
                </div>
            ) : (
                <div ref={tableRef} className="overflow-x-auto">
                    <table className="table text-center description text-white lg:whitespace-normal whitespace-nowrap">
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
                                                theme: "dark",
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
                                                theme: "dark",
                                            }
                                        );
                                    }
                                };

                                return (
                                    <tr
                                        className={
                                            availableSeat == 0 && "bg-red-950"
                                        }
                                        key={classItem?._id}
                                    >
                                        <td>{index + 1}</td>
                                        <td className="lg:flex lg:justify-center">
                                            <img
                                                className="lg:w-32 lg:rounded-xl rounded-lg lg:h-16"
                                                src={classItem?.image}
                                                alt="Avatar Tailwind CSS Component"
                                            />
                                        </td>
                                        <td>
                                            <div>
                                                <div className="font-bold">
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
                                                    to={`/instructor/${classItem?.instructorId}`}
                                                    className="font-bold"
                                                >
                                                    {classItem?.instructorName}
                                                </Link>
                                            </div>
                                        </td>
                                        <td>
                                            {availableSeat == 0
                                                ? "Fully Booked"
                                                : availableSeat}
                                        </td>
                                        <td>$ {classItem?.price}</td>
                                        {userDetails.role !== "Instructor" && (
                                            <td>
                                                {loading || userLoading ? (
                                                    <div className="flex justify-center items-center">
                                                        <BeatLoader color="rgb(256 256 256)" />
                                                    </div>
                                                ) : isBooked ? (
                                                    "Booked"
                                                ) : isEnrolled ? (
                                                    availableSeat == 0 ? (
                                                        <div className="text-red-500">
                                                            Enrolled
                                                        </div>
                                                    ) : (
                                                        "Enrolled"
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
                                                            isEnrolled
                                                        }
                                                        className={`${
                                                            availableSeat == 0
                                                                ? "disabled:bg-red-900"
                                                                : "disabled:bg-stone-900"
                                                        } btn text-white btn-sm lg:rounded-lg rounded-full hover:bg-stone-700 bg-stone-800`}
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
