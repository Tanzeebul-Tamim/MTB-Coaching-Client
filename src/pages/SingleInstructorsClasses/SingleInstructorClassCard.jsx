/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { ImPriceTags } from "react-icons/im";
import { MdLibraryAdd } from "react-icons/md";
import { bookClass, getBookedClasses } from "../../api/bookApi";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import ImageWithLoader from "../../reusable/ImageWithLoader";
import useUserData from "../../hooks/useUserData";

const SingleInstructorClassCard = ({ classItem, index, instructorId }) => {
    const availableSeat = classItem.studentSlot - classItem.totalStudent;
    const { user, booking, setBooking, loading } = useAuth();
    const [userBookings, setUserBookings] = useState([]);
    const [bookedClasses, setBookedClasses] = useState([]);
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const unpaid = userBookings?.filter(
        (booking) => booking.paymentStatus === "unpaid"
    );
    const paid = userBookings?.filter(
        (booking) => booking.paymentStatus === "paid"
    );
    const { loading: userLoading, userDetails } = useUserData();

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

    const isBooked = bookedClasses && bookedClasses.includes(classItem.name);
    const isEnrolled =
        enrolledClasses && enrolledClasses.includes(classItem.name);

    const handleBook = () => {
        if (user && !isBooked) {
            bookClass(
                userDetails._id,
                instructorId,
                user.email,
                user.displayName,
                index
            );
            setBooking(!booking);
            toast.success(`"${classItem.name}" has been booked`, {
                position: "top-center",
                autoClose: 1100,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    return (
        <div className="group card relative h-full description rounded-2xl card-compact w-full bg-base-200 shadow-xl">
            <div>
                <ImageWithLoader
                    src={classItem.image}
                    className="rounded-t-2xl h-[240px] z-0 w-full"
                />
            </div>
            <div className="card-body z-50">
                <h2 className="card-title text-yellow-500">{classItem.name}</h2>
                <div className="text-white flex gap-2 items-center">
                    <ImPriceTags className="text-lg" />
                    <strong>Price:</strong> $ {classItem.price}
                </div>
                {availableSeat == 0 ? (
                    <div className="flex gap-2 items-center">
                        <p className="text-red-600 font-bold">Fully Booked</p>
                    </div>
                ) : (
                    <div className="text-white flex gap-2 items-center">
                        <BsFillPersonPlusFill className="text-lg" />
                        <strong>Available Slots:</strong> {availableSeat}
                    </div>
                )}
                {userDetails.role !== "Instructor" &&
                    !loading &&
                    !userLoading && (
                        <button
                            onClick={handleBook}
                            disabled={
                                isBooked ||
                                isEnrolled ||
                                availableSeat == 0 ||
                                userDetails?.role === "Instructor"
                            }
                            className={`${
                                availableSeat == 0
                                    ? "disabled:bg-red-950"
                                    : "disabled:bg-stone-800"
                            } btn text-white btn-sm rounded-full hover:bg-stone-700 border-0 bg-base-100`}
                        >
                            <span>
                                {isBooked ? (
                                    "Booked"
                                ) : isEnrolled ? (
                                    "Enrolled"
                                ) : (
                                    <div className="flex gap-2">
                                        <MdLibraryAdd />{" "}
                                        <span>Book Course</span>
                                    </div>
                                )}
                            </span>
                        </button>
                    )}
            </div>
        </div>
    );
};

export default SingleInstructorClassCard;
