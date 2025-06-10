import { IoSchoolSharp } from "react-icons/io5";
import { GiTeacher } from "react-icons/gi";
import { FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImageWithLoader from "../../../reusable/ImageWithLoader";

const InstructorCard = ({ topInstructor }) => {
    return (
        <Link
            to={`/instructors/${topInstructor._id}`}
            className="card h-full group description rounded-2xl card-compact lg:ml-3 lg:mr-3 bg-base-200 shadow-xl"
        >
            <div className="flex justify-center items-center">
                <div className="card-body z-50">
                    <h2 className="card-title text-yellow-500">
                        {topInstructor.name}
                    </h2>
                    {topInstructor.quote && (
                        <div className="text-white max-w-[75%] flex gap-2 items-center">
                            <FaQuoteLeft className="text-lg" />
                            <strong>&quot;{topInstructor.quote}&quot;</strong>
                        </div>
                    )}
                    <div className="text-white flex gap-2 items-center">
                        <IoSchoolSharp className="text-lg" />
                        <strong>Total Attendees:</strong>{" "}
                        {topInstructor.totalStudents}
                    </div>
                    <div className="text-white flex gap-2 items-center">
                        <GiTeacher className="text-lg" />
                        <strong>Courses Taken:</strong>{" "}
                        {topInstructor.classes.length}
                    </div>
                </div>
                <div className="lg:mr-5 hidden lg:block">
                    <ImageWithLoader
                        gif="/user_avatar.png"
                        className="group-hover:scale-110 duration-200 lg:w-[6vw] lg:h-[6vw] rounded-full border-zinc-400 lg:border-[4px]"
                        src={topInstructor.image}
                    />
                </div>
                <div className="lg:hidden absolute right-[2%] mr-2">
                    <ImageWithLoader
                        gif="/user_avatar.png"
                        className="group-hover:scale-110 duration-200 w-[calc(20vw)] h-[calc(20vw)] rounded-full border-zinc-400 border-[2px]"
                        src={topInstructor.image}
                    />
                </div>
            </div>
            <div className="absolute lg:bottom-0 left-0 w-1/2 h-full bg-gradient-to-l from-transparent to-base-100"></div>
        </Link>
    );
};

export default InstructorCard;
