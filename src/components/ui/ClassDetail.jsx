import useScreenSize from "../../hooks/useScreenSize";
import { AiFillCloseCircle } from "react-icons/ai";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import ImageWithLoader from "./ImageWithLoader";
import getStatus from "../../hooks/getStatus";

const ClassDetail = ({ i, detail }) => {
    const { isSmallDevice } = useScreenSize();
    const location = useLocation();

    const {
        name,
        instructorName,
        image,
        price,
        studentSlot,
        totalStudent,
        startDate,
        endDate,
        instructorId,
    } = detail;

    const availableSeat = studentSlot - totalStudent;

    const status = getStatus(startDate, endDate);
    
    const duration = Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );

    const CourseEndNotice = () => (
        <div
            className={`mt-6 text-start ${
                (location.pathname === "/classes" ||
                    location.pathname === "/dashboard/selected-classes") &&
                "lg:w-1/2"
            }`}
        >
            <strong className="text-secondary text-lg">⚠️ Course Ended</strong>
            <br />
            <span className="text-sm over break-words whitespace-normal">
                Pre-recorded lessons and materials will be provided. Independent
                learning is required as in-person trail sessions are no longer
                being conducted.
            </span>
        </div>
    );

    return (
        <dialog
            id={`class_modal_${i}`}
            className="modal text-base-content"
            onClick={(e) => {
                if (e.target === e.currentTarget && isSmallDevice) {
                    e.currentTarget.close();
                }
            }}
        >
            <form
                method="dialog"
                className="relative modal-box lg:max-w-3xl max-w-full bg-base-100 bg-opacity-80 border border-gray-500 border-opacity-50 shadow-xl p-6 md:p-8 rounded-xl overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <h1 className="text-xl lg:text-2xl font-bold text-center mb-1">
                    {name}
                </h1>
                <p className="text-lg text-center text-gray-500 lg:mb-7 mb-3 font-semibold">
                    Course details overview
                </p>
                <button
                    type="button"
                    className="absolute lg:top-5 lg:right-5 top-3 right-3"
                    onClick={() => {
                        // implement modal close
                        document.getElementById(`class_modal_${i}`).close();
                    }}
                >
                    <AiFillCloseCircle className="lg:text-3xl text-2xl" />
                </button>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-20 gap-7">
                    {/* Image */}
                    <div className="w-full lg:h-60 h-48 rounded-xl overflow-hidden">
                        <ImageWithLoader
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    {/* Details */}
                    <div className="text-start lg:space-y-2 space-y-1 text-sm md:text-base">
                        {(location.pathname === "/classes" ||
                            location.pathname ===
                                "/dashboard/selected-classes") && (
                            <p>
                                <span className="font-semibold">
                                    Instructor:
                                </span>{" "}
                                {instructorName}
                            </p>
                        )}
                        <p>
                            <span className="font-semibold">Price:</span> ${" "}
                            {price}
                        </p>
                        <p>
                            <span className="font-semibold">Start Date:</span>{" "}
                            {moment(startDate).format("ddd, Do MMM YYYY")}
                        </p>
                        <p>
                            <span className="font-semibold">End Date:</span>{" "}
                            {moment(endDate).format("ddd, Do MMM YYYY")}
                        </p>
                        <p>
                            <span className="font-semibold">Duration:</span>{" "}
                            {duration} Days
                        </p>
                        <p>
                            <span className="font-semibold">Status:</span>{" "}
                            <span
                                className={`font-semibold ${
                                    status === "Ongoing"
                                        ? "text-green-600"
                                        : status === "Upcoming"
                                        ? "text-blue-600"
                                        : "text-red-600"
                                }`}
                            >
                                {status}
                            </span>
                        </p>
                        {location.pathname !==
                            "/dashboard/selected-classes" && (
                            <p>
                                <span className="font-semibold">
                                    Available Slots:
                                </span>{" "}
                                <span
                                    className={
                                        availableSeat == 0 &&
                                        "font-semibold text-red-600"
                                    }
                                >
                                    {availableSeat == 0
                                        ? "Fully Booked"
                                        : availableSeat}
                                </span>
                            </p>
                        )}
                        {(location.pathname === "/classes" ||
                            location.pathname ===
                                "/dashboard/selected-classes") && (
                            <div>
                                <Link
                                    to={`/instructors/${instructorId}`}
                                    type="button"
                                    className="btn lg:btn-sm btn-xs btn-secondary mt-2"
                                    onClick={() => {}}
                                >
                                    View {instructorName?.split(" ")[0]}&apos;s
                                    Other Courses
                                </Link>
                            </div>
                        )}
                        {location.pathname.includes("/instructors/") &&
                            status === "Ended" && (
                                <div className="mt-3">
                                    <CourseEndNotice />
                                </div>
                            )}
                    </div>
                </div>

                {/* Footer */}
                {status === "Ended" &&
                    (location.pathname === "/classes" ||
                        location.pathname ===
                            "/dashboard/selected-classes") && (
                        <CourseEndNotice />
                    )}
            </form>
        </dialog>
    );
};

export default ClassDetail;
