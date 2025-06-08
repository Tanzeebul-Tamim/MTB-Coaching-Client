import MyStudentsTableHead from "./MyStudentsTableHead";

const MyStudentsTable = ({ students, search, filteredStudents }) => {
  if (!filteredStudents || filteredStudents.length === 0) {
    return (
      <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg">
        <div className="flex h-[45vh] items-center justify-center">
          <h1 className="z-[10] description text-3xl text-center">
            {search ? "No students found for your search." : "You Don't Have Any Students Yet"}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg">      
      <table className="z-[100] table text-center description text-white lg:whitespace-normal whitespace-nowrap">
        <MyStudentsTableHead />
        <tbody className="text-sm">
          {students.map((student, index) => {
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
