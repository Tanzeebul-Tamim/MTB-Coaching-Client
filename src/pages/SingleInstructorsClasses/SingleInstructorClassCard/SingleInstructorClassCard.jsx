import { BsFillPersonPlusFill, BsInfoCircleFill } from "react-icons/bs";
import { ImPriceTags } from "react-icons/im";
import { MdLibraryAdd } from "react-icons/md";
import ImageWithLoader from "../../../components/ui/ImageWithLoader";
import useSingleInstructorClassCard from "./useSingleInstructorClassCard";
import ClassDetail from "../../../components/ui/ClassDetail";
import getStatus from "../../../hooks/getStatus";

const SingleInstructorClassCard = ({ classItem, index, instructorId }) => {
    const {
        availableSeat,
        loading,
        userLoading,
        isEnrolled,
        handleBook,
        userDetails,
        isBooked,
    } = useSingleInstructorClassCard(classItem, instructorId, index);
    const { startDate, endDate } = classItem;
    const status = getStatus(startDate, endDate);

    const modalId = `class_modal_${index}`;

    return (
        <>
            <div className="group card relative h-full description rounded-2xl card-compact w-full bg-base-200 shadow-xl">
                <div>
                    <ImageWithLoader
                        style={{
                            objectPosition: "left",
                            objectFit: "cover",
                        }}
                        src={classItem.image}
                        className="rounded-t-2xl h-[240px] z-0 w-full"
                    />
                </div>
                <div className="card-body z-50">
                    <h2 className="card-title text-secondary">
                        {classItem.name}
                    </h2>
                    <div className="flex justify-between">
                        <div className="text-base-content flex gap-2 items-center">
                            <ImPriceTags className="text-lg" />
                            <strong>Price:</strong> $ {classItem.price}
                        </div>
                        <strong
                            className={`text-base-content flex gap-2 items-center ${
                                status === "Ongoing"
                                    ? "text-green-600"
                                    : status === "Upcoming"
                                    ? "text-blue-600"
                                    : "text-red-600"
                            }`}
                        >
                            {status}
                        </strong>
                    </div>
                    {availableSeat == 0 ? (
                        <div className="flex gap-2 items-center">
                            <p className="text-red-600 font-bold text-end">
                                Fully Booked
                            </p>
                        </div>
                    ) : (
                        <div className="text-base-content flex gap-2 items-center">
                            <BsFillPersonPlusFill className="text-lg" />
                            <strong>Available Slots:</strong> {availableSeat}
                        </div>
                    )}
                    <button
                        onClick={() => window[modalId].showModal()}
                        className="btn text-base-content btn-sm rounded-full hover:bg-[#a79d83] dark:hover:bg-[#2e2926] bg-base-300 border-0"
                    >
                        <span>
                            <div className="flex gap-2">
                                <BsInfoCircleFill /> <span>View Detail</span>
                            </div>
                        </span>
                    </button>
                    {userDetails?.role !== "Instructor" &&
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
                                        ? "dark:disabled:bg-red-950 dark:disabled:text-red-900 disabled:bg-red-800 disabled:text-red-600"
                                        : "dark:disabled:bg-[#2e2926] disabled:bg-[#a79d83]"
                                } btn text-base-content btn-sm rounded-full hover:bg-[#a79d83] dark:hover:bg-[#2e2926] bg-base-300 border-0`}
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
            <ClassDetail i={index} detail={classItem} />
        </>
    );
};

export default SingleInstructorClassCard;
