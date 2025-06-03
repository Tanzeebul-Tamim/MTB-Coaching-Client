import { useEffect, useState } from "react";
import MyStudentsTableHead from "./MyStudentsTableHead";
import { BsSearch } from "react-icons/bs";

const MyStudentsTable = ({ students, courseName }) => {
  const [search, setSearch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students || []);

  // Update filtered students when students or search changes
  useEffect(() => {
    if (!search) {
      setFilteredStudents(students);
    } else {
      const lowerSearch = search.toLowerCase();
      setFilteredStudents(
        students.filter((student) =>
          student?.name?.toLowerCase().includes(lowerSearch) ||
          student?.email?.toLowerCase().includes(lowerSearch) ||
          student?.contactNo?.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [students, search]);

  if (!filteredStudents || filteredStudents.length === 0) {
    return (
      <div className="flex h-[55vh] items-center justify-center">
        <h1 className="z-[10] description text-5xl">
          You Don&apos;t Have Any Students Yet
        </h1>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="relative flex justify-center mb-2">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search by Name, Email, or Contact No."
          className="z-40 py-2 px-3 outline-none bg-base-200 description placeholder-stone-400 placeholder:text-sm rounded-full w-1/3"
        />
        <button>
          <BsSearch
            className="z-50"
            style={{
              color: "white",
              position: "absolute",
              top: "25%",
              right: "35%",
              fontSize: "20px",
            }}
          ></BsSearch>
      </button>
      </div>
      <div className="mb-5 flex justify-between gap-2 text-white description text-xl">
        <strong className="z-[100] flex items-center gap-2">
          <span>Course Name :</span>
          <span>{courseName}</span>
        </strong>
        <strong className="z-[100] flex items-center gap-2">
          <span>Total Students :</span>
          <span>{filteredStudents.length}</span>
        </strong>
      </div>
      <table className="z-[100] table text-center description text-white">
        <MyStudentsTableHead />
        <tbody className="text-sm">
          {filteredStudents.map((student, index) => {
            return (
              <tr key={student?._id}>
                <td>{index + 1}</td>
                <td className="flex justify-center">
                  <img
                    className="rounded-full w-[4.5vh]"
                    src={student?.image}
                    alt={student?.["class-name"]}
                  />
                </td>
                <td>{student?.name}</td>
                <td>{student?.gender}</td>
                <td>{student?.email}</td>
                <td>{student?.contactNo}</td>
                <td>{student?.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyStudentsTable;
