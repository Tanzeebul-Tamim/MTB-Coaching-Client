import { Link, useLoaderData, useParams } from "react-router-dom";
import { GiTeacher } from "react-icons/gi";
import SectionTitle from "../../reusable/SectionTitle";
import SingleInstructorClassCard from "./SingleInstructorClassCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import "../Home/PopularInstructors/style.css";
import { FaChalkboardTeacher, FaQuoteLeft } from "react-icons/fa";
import useTitle from "../../Helmet/useTitle";
import { useEffect, useState } from "react";

const SingleInstructorsClasses = () => {
    const instructor = useLoaderData();
    const classes = instructor.classes;
    const nameWords = instructor.name.split(" ");
    const title1 = nameWords[0];
    const title2 = nameWords.slice(1).join(" ");
    const firstName = instructor?.name?.split(" ")[0];
    const { id } = useParams();
    const [totalAttendee, setTotalAttendee] = useState(0);
    useTitle(`| ${firstName}'s Wall`);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/instructor/total/${id}`)
            .then((res) => res.json())
            .then((data) => setTotalAttendee(data.totalStudents))
            .catch((err) =>
                console.error("Failed to fetch total attendees:", err)
            );
    }, [id]);

    if (classes?.length > 0) {
        return (
            <div
                className="lg:pb-20 pb-8 relative pt-24 lg:pt-36 px-5 lg:px-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.400), rgba(0, 0, 0, 0.400)),
            url('${
                instructor.cover
                    ? instructor.cover
                    : "/instructor_default_banner.avif"
            }')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="mb-10 flex items-center justify-between">
                    <img
                        className="mask mask-squircle h-[180px] w-[180px] "
                        src={instructor.image}
                        alt=""
                    />
                    {instructor.quote && (
                        <div className="w-2/5 text-7xl bg-base-200 p-5 rounded-2xl bg-opacity-5 glass shadow-2xl text-white">
                            <FaQuoteLeft className="text-5xl mb-5" />
                            <span className="ml-10">{instructor?.quote}</span>
                        </div>
                    )}
                </div>
                <SectionTitle
                    title1={title1}
                    title2={title2}
                    description={instructor?.quote}
                />
                <div className="mb-5 flex gap-2 text-white description text-2xl">
                    <strong className="flex items-center gap-2">
                        <GiTeacher className="text-2xl" />
                        {classes.length}
                        <span>Courses</span>
                        <span className="mx-1">|</span>
                        {totalAttendee}
                        <span>Attendees</span>
                    </strong>{" "}
                </div>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Navigation]}
                    className="popularClassSection"
                >
                    {classes.map((classItem, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <SingleInstructorClassCard
                                    index={index}
                                    classItem={classItem}
                                    instructorId={instructor._id}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div className="flex justify-center">
                    <Link
                        to="/instructors"
                        className="z-[10] mt-10 btn btn-md text-lg rounded-full hover:bg-stone-700 bg-stone-800"
                    >
                        <FaChalkboardTeacher />
                        Back To Instructors Page
                    </Link>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-b from-transparent to-base-300"></div>
            </div>
        );
    } else {
        return (
            <div
                className="lg:pb-20 pb-8 relative pt-24 lg:pt-36 px-5 lg:px-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.400), rgba(0, 0, 0, 0.400)),
            url('${
                instructor.cover
                    ? instructor.cover
                    : "/instructor_default_banner.avif"
            }')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="mb-10 flex items-center justify-between">
                    <img
                        className="mask mask-squircle h-[180px] w-[180px] "
                        src={instructor.image}
                        alt=""
                    />
                    {instructor.quote && (
                        <div className="w-2/5 text-7xl bg-base-200 p-5 rounded-2xl bg-opacity-5 glass shadow-2xl text-white">
                            <FaQuoteLeft className="text-5xl mb-5" />
                            <span className="ml-10">{instructor?.quote}</span>
                        </div>
                    )}
                </div>
                <SectionTitle
                    title1={title1}
                    title2={title2}
                    description={instructor?.quote}
                />
                <div className="flex justify-center text-white">
                    <div className="text-5xl my-5 z-[1]">
                        {instructor.name} hasn&apos;t added any courses yet
                    </div>
                </div>
                <div className="flex justify-center">
                    <Link
                        to="/instructors"
                        className="z-[10] mt-10 btn btn-md text-lg rounded-full hover:bg-stone-700 bg-stone-800"
                    >
                        <FaChalkboardTeacher />
                        Back To Instructors Page
                    </Link>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-b from-transparent to-base-300"></div>
            </div>
        );
    }
};

export default SingleInstructorsClasses;
