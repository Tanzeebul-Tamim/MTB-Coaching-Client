import { FaQuoteLeft } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { IoSchoolSharp } from "react-icons/io5";

const SklPopularInstructors = () => {
    return (
        <div className="card h-full group description rounded-2xl animate-pulse lg:ml-3 lg:mr-3 bg-base-200 shadow-xl">
            <div className="flex justify-center items-center">
                <div className="card-body z-50">
                    <div className="h-5 bg-base-content rounded w-3/4"></div>
                    <div className="text-base-content max-w-[75%] flex gap-2 items-center mt-2">
                        <FaQuoteLeft className="text-lg" />
                        <div className="h-3 bg-base-content rounded w-3/4"></div>
                    </div>
                    <div className="text-base-content flex gap-2 items-center mt-2">
                        <IoSchoolSharp className="text-lg" />
                        <div className="h-3 bg-base-content rounded w-1/2"></div>
                    </div>
                    <div className="text-base-content flex gap-2 items-center mt-2">
                        <GiTeacher className="text-lg" />
                        <div className="h-3 bg-base-content rounded w-1/2"></div>
                    </div>
                </div>
                <div className="absolute right-[2%] mr-2">
                    <img
                        className="group-hover:scale-110 duration-200 w-[calc(20vw)] h-[calc(20vw)] rounded-full lg:h-[6vw] lg:w-[6vw] border-zinc-400 border-[2px]"
                        src="/assets/user_avatar.png"
                    />
                </div>
            </div>
            <div className="absolute lg:bottom-0 left-0 w-1/2 h-full bg-gradient-to-l from-transparent to-base-100"></div>
        </div>
    );
};

export default SklPopularInstructors;
