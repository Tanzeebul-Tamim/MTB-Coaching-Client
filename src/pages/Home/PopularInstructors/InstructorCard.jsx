import { IoSchoolSharp } from "react-icons/io5";
import { GiTeacher } from "react-icons/gi";
import { Link } from "react-router-dom";
import {
    FaRankingStar,
    FaStar,
    FaRegStarHalfStroke,
    FaRegStar,
} from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const InstructorCard = ({
    topInstructor,
    isLoggedIn,
    play,
    i,
    isSmallDevice,
}) => {
    const [visible, setVisible] = useState(false);
    const ratingMap = [5, 4.5, 3.5, 4, 4.5, 3, 3.5, 3.5, 3.5, 2.5];
    const { _id, name, ranking, totalStudents, classes, image, quote } =
        topInstructor;

    return (
        <Link
            onClick={() => {
                if (!isLoggedIn) {
                    setTimeout(() => {
                        play("warning");
                    }, 500);
                    return;
                }
            }}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            to={`/instructors/${_id}`}
            className="card h-full description rounded-2xl card-compact lg:mx-3 bg-base-200 dark:shadow-xl group"
        >
            <div className="flex justify-center items-center">
                <div className="card-body z-50">
                    <h2 className="card-title text-secondary">{name}</h2>
                    <div className="text-base-content flex gap-2 items-center">
                        <FaRankingStar className="text-lg" />
                        <strong>Instructor Rank:</strong>{" "}
                        <span
                            className={
                                i <= 2
                                    ? "text-xl font-extrabold dark:text-primary text-secondary"
                                    : ""
                            }
                        >
                            {ranking}
                        </span>
                    </div>
                    <div className="text-base-content flex gap-2 items-center">
                        <IoSchoolSharp className="text-lg" />
                        <strong>Total Attendees:</strong> {totalStudents}
                    </div>
                    <div className="text-base-content flex gap-2 items-center">
                        <GiTeacher className="text-lg" />
                        <strong>Courses Taken:</strong> {classes.length}
                    </div>
                    <div className="text-base-content flex gap-2 items-center">
                        <IoIosStar className="text-lg" />
                        <strong>Rating:</strong>{" "}
                        <div className="flex gap-1 items-center">
                            <span>{ratingMap[i].toFixed(1)}</span> -
                            {[...Array(5)].map((_, idx) => {
                                const rating = ratingMap[i]; // 0-based index of instructor
                                const full = idx + 1;
                                const half = idx + 0.5;

                                if (rating >= full) {
                                    return (
                                        <FaStar
                                            className="dark:text-primary text-secondary"
                                            key={idx}
                                        />
                                    );
                                } else if (rating >= half) {
                                    return (
                                        <FaRegStarHalfStroke
                                            className="dark:text-primary text-secondary"
                                            key={idx}
                                        />
                                    );
                                } else {
                                    return (
                                        <FaRegStar
                                            className="dark:text-primary text-secondary"
                                            key={idx}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </div>
                    {isSmallDevice && quote && (
                        <div className="flex justify-center mt-2">
                            <div className="text-base-content flex gap-2 items-center font-bold text-center">
                                <FaQuoteLeft className="text-lg" />
                                {quote}
                            </div>
                        </div>
                    )}
                </div>
                <div className="lg:mr-5 hidden lg:block">
                    <div className="relative inline-block">
                        <img
                            className={`duration-200 lg:w-[6vw] lg:h-[6vw] rounded-full border-gray-500 dark:border-zinc-400 lg:border-[4px] transition-all ease-in-out ${
                                quote && visible
                                    ? "translate-y-5 group-hover:scale-90"
                                    : "group-hover:scale-110"
                            }`}
                            src={image}
                        />

                        <div
                            className={`absolute -top-5 right-1 mb-1 w-max bg-base-300 text-white text-xs py-2 px-3 rounded-full shadow-lg z-50 whitespace-normal text-center ${
                                quote && visible ? "opacity-100" : "opacity-0"
                            } transition-opacity ease-in-out duration-300 flex items-center gap-2`}
                        >
                            <FaQuoteLeft className="text-xs" />
                            <span>{quote}</span>
                            <div className="absolute bottom-[-6px] right-3 transform -translate-x-1/2 w-3 h-3 bg-base-300 rotate-45 z-50"></div>
                        </div>
                    </div>
                </div>
                <div className="lg:hidden absolute right-[2%] mr-2">
                    <img
                        className="group-hover:scale-105 duration-200 w-[calc(20vw)] h-[calc(20vw)] rounded-full border-gray-500 dark:border-zinc-400 border-[3px] transition-all ease-in-out"
                        src={image}
                    />
                </div>
            </div>
            <div className="absolute lg:bottom-0 left-0 w-1/2 h-full bg-gradient-to-l from-transparent to-base-100"></div>
        </Link>
    );
};

export default InstructorCard;
