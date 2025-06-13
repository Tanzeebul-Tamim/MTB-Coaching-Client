import { Link, useLoaderData, useParams } from "react-router-dom";
import { GiTeacher } from "react-icons/gi";
import SectionTitle from "../../reusable/SectionTitle";
import SingleInstructorClassCard from "./SingleInstructorClassCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import "../Home/PopularInstructors/style.css";
import { FaChalkboardTeacher, FaQuoteLeft } from "react-icons/fa";
import useTitle from "../../hooks/useTitle";
import { useEffect, useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import { ClipLoader } from "react-spinners";
import useUserData from "../../hooks/useUserData";

const SingleInstructorsClasses = () => {
    const instructor = useLoaderData();
    const { userDetails } = useUserData();
    const classes = instructor.classes;
    const isMyWall = instructor.email === userDetails.email;
    const name = isMyWall ? userDetails?.name : instructor?.name;
    const nameWords = name.split(" ");
    const [loading, setLoading] = useState(false);
    const title1 = nameWords[0];
    const title2 = nameWords.slice(1).join(" ");
    const firstName = name?.split(" ")[0];
    const { id } = useParams();
    const [totalAttendee, setTotalAttendee] = useState(0);
    const [numberOfSlides, setNumberOfSlides] = useState(null);
    const { isSmallDevice } = useScreenSize();
    const title = isMyWall ? "| My Wall" : `| ${firstName}'s Wall`;
    useTitle(title);

    useEffect(() => {
        setNumberOfSlides(isSmallDevice ? 1 : 4);
    }, [isSmallDevice]);

    useEffect(() => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/instructor/total/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTotalAttendee(data.totalStudents);
            })
            .catch((err) =>
                console.error("Failed to fetch total attendees:", err)
            )
            .finally(() => setLoading(false));
    }, [id]);

    const bannerStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.400), rgba(0, 0, 0, 0.400)), url('${
            instructor.cover
                ? instructor.cover
                : "/instructor_default_banner.avif"
        }')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    const InstructorHeader = () => (
        <div className="lg:mb-10 mb-5 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-0">
            <img
                className="mask mask-squircle h-32 w-32 md:h-44 md:w-44 lg:h-[180px] lg:w-[180px] lg:mb-0"
                src={instructor.image}
                alt=""
            />
            {instructor.quote && (
                <div className="w-full lg:w-2/5 text-2xl md:text-4xl lg:text-7xl bg-base-200 p-3 md:p-5 rounded-2xl bg-opacity-5 glass shadow-2xl text-white text-center lg:text-left">
                    <FaQuoteLeft className="text-xl md:text-3xl lg:text-5xl mb-3 md:mb-5 inline-block" />
                    <span className="ml-0 lg:ml-10">{instructor?.quote}</span>
                </div>
            )}
        </div>
    );

    return (
        <div
            className="lg:pb-20 pb-8 relative pt-16 lg:pt-36 px-5 lg:px-10"
            style={bannerStyle}
        >
            <InstructorHeader />
            <div
                className={
                    isMyWall &&
                    `flex lg:gap-4 gap-1 ${isSmallDevice && "flex-col-reverse"}`
                }
            >
                <SectionTitle
                    title1={title1}
                    title2={title2}
                    enlarge={true}
                    dark={true}
                    description={instructor?.quote}
                />
                {isMyWall && (
                    <span className="lg:text-4xl text-2xl text-stone-300 font-semibold">
                        (My Wall)
                    </span>
                )}
            </div>
            {classes?.length > 0 ? (
                <>
                    <div className="lg:mb-5 mb-2 flex flex-col md:flex-row gap-2 md:gap-6 text-accent description text-lg md:text-xl lg:text-2xl items-center lg:justify-normal justify-center">
                        <strong className="flex items-center gap-2">
                            <GiTeacher className="text-xl md:text-2xl" />
                            {classes.length}
                            <span>Courses</span>
                            <span className="mx-1">|</span>
                            {loading ? (
                                <ClipLoader color="rgb(256 256 256)" />
                            ) : (
                                totalAttendee
                            )}
                            <span>Attendees</span>
                        </strong>{" "}
                    </div>
                    <Swiper
                        slidesPerView={numberOfSlides}
                        spaceBetween={20}
                        navigation={true}
                        modules={[Navigation]}
                        className="popularClassSection"
                    >
                        {classes.map((classItem, index) => (
                            <SwiperSlide key={index}>
                                <SingleInstructorClassCard
                                    index={index}
                                    classItem={classItem}
                                    instructorId={instructor._id}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            ) : (
                <div className="flex justify-center text-accent">
                    <div className="text-2xl md:text-4xl lg:text-5xl my-5 z-[1] text-center">
                        {isMyWall
                            ? "You haven't added any courses yet"
                            : `${instructor.name} has't added any courses yet`}
                    </div>
                </div>
            )}
            <div className="flex justify-center">
                <Link
                    to="/instructors"
                    className="z-[10] mt-10 btn btn-md text-lg rounded-full hover:bg-base-300 dark:hover:bg-base-300 bg-base-100 dark:bg-base-200 border-0 text-base-content"
                >
                    <FaChalkboardTeacher />
                    Back To Instructors Page
                </Link>
            </div>
            <div className="absolute bottom-0 left-0 w-full dark:h-2/3 h-1/3 bg-gradient-to-b from-transparent to-base-100"></div>
        </div>
    );
};

export default SingleInstructorsClasses;
