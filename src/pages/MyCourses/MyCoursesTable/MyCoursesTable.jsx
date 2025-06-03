import { Link } from "react-router-dom";
import MyCoursesTableHead from "./MyCoursesTableHead";
import { FaList } from "react-icons/fa";
import { useEffect, useState } from "react";

const MyCoursesTable = ({ userDetails, instructorCourses }) => {
  const [totalStudent, setTotalStudent] = useState(0);

  useEffect(() => {
    if (userDetails && userDetails._id) {
      fetch(`${import.meta.env.VITE_API_URL}/instructor/total/${userDetails._id}`)
        .then(async (res) => await res.json())
        .then((data) => {
          setTotalStudent(data.totalStudents);
        });
    }
  }, [userDetails]);

  if (!instructorCourses || instructorCourses.length === 0) {
    return (
      <div className="flex h-[55vh] items-center justify-center">
        <h1 className="z-[10] description text-5xl">
          You Haven&apos;t Created Any Courses Yet
        </h1>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <div className="mb-5 flex justify-between gap-2 text-white description text-xl">
        <strong className="z-[100] flex items-center gap-2">
          <span>Offered Courses Count :</span>
          <span>{instructorCourses.length}</span>
        </strong>

        <strong className="z-[100] flex items-center gap-2">
          <span>Total Students :</span>
          <span>{totalStudent}</span>
        </strong>
      </div>
      <table className="z-[100] table text-center description text-white">
        <MyCoursesTableHead />
        <tbody className="text-sm">
          {instructorCourses.map((course, index) => {
            const remainingCount = course.studentSlot - course.totalStudent;

            return (
              <tr key={course._id}>
                <td>{index + 1}</td>
                <td className="flex justify-center">
                  <img className="w-16 rounded-xl h-8" src={course.image} alt={course["class-name"]} />
                </td>
                <td>{course.name}</td>
                <td>$ {course.price}</td>
                <td>{course.studentSlot}</td>
                <td>{course.totalStudent}</td>
                <td>{remainingCount}</td>
                <td>
                  <Link
                    to={`/dashboard/my-class/students/${userDetails._id}/${index}`
                    }
                    className="btn text-white btn-xs text-sx border-0 rounded-lg hover:bg-stone-800 bg-stone-700"
                  >
                    <FaList /><span>View</span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyCoursesTable;
