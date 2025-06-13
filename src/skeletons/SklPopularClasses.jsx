import { FaChalkboardTeacher } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";

const SklPopularClasses = () => {
    return (
        <div className="group card relative h-full description rounded-2xl card-compact w-full lg:ml-3 lg:mr-3 bg-base-200 shadow-xl animate-pulse">
            <div>
                <img
                    className="rounded-t-2xl h-[240px] z-0 w-full"
                    src="/class-loading.gif"
                />
            </div>
            <div className="card-body z-50">
                <div className="h-6 bg-base-content rounded w-1/2 mt-2"></div>
                <div className="text-base-content flex gap-2 items-center mt-2">
                    <FaChalkboardTeacher className="text-lg" />
                    <div className="ml-2 h-4 bg-base-content rounded w-1/2"></div>
                </div>
                <div className="text-base-content flex gap-2 items-center mt-2">
                    <IoSchoolSharp className="text-lg" />
                    <div className="ml-2 h-4 bg-base-content rounded w-1/2"></div>
                </div>
                <img
                    className="group-hover:scale-110 duration-200 lg:w-[100px] w-[calc(22vw)] lg:h-[100px] h-[calc(22vw)] rounded-full border-zinc-400 border-[2px] lg:border-[4px] absolute bottom-[30%] lg:bottom-[20%] right-[4%]"
                    src="/user_avatar.png"
                />
            </div>
            <div className="absolute lg:bottom-0 right-0 w-1/2 h-full bg-gradient-to-r from-transparent to-base-100"></div>
        </div>
    );
};

export default SklPopularClasses;
