import { FaChalkboardTeacher } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const ClassCard = ({ topClass }) => {
  return (
    <Link to={`/instructor/${topClass.instructorId}`} className="group card relative h-full description rounded-2xl card-compact w-full lg:ml-3 lg:mr-3 bg-base-200 shadow-xl">
      <div>
        <img
          className="rounded-t-2xl h-[240px] z-0 w-full"
          src={topClass.image}
        />
      </div>
      <div className="card-body z-50">
        <h2 className="card-title text-yellow-500">{topClass.name}</h2>
        <div className="text-white flex gap-2 items-center">
          <FaChalkboardTeacher className="text-lg" />
          <strong>Instructor:</strong> {topClass.instructorName}
        </div>
        <div className="text-white flex gap-2 items-center">
          <IoSchoolSharp className="text-lg" />
          <strong>Attendees:</strong> {topClass.totalStudent}
        </div>
        <img
        className="group-hover:scale-110 duration-200 lg:w-[100px] w-[calc(26vw)] lg:h-[100px] h-[calc(26vw)] rounded-full border-zinc-400 border-[2px] lg:border-[4px] absolute bottom-[20%] right-[5%]"
        src={topClass.instructorImg} />
      </div>
      <div className="absolute lg:bottom-0 right-0 w-1/2 h-full bg-gradient-to-r from-transparent to-base-100"></div>
    </Link>
  );
};

export default ClassCard;
