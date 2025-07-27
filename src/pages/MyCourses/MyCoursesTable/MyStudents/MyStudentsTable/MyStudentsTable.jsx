import ImageWithLoader from "../../../../../components/ui/ImageWithLoader";
import MyStudentsTableHead from "./MyStudentsTableHead";

const MyStudentsTable = ({ students, search, settings }) => {
    const { resultsPerPage, currentPage } = settings;

    if (!students || students.length === 0) {
        return (
            <div
                className={`flex lg:h-[55vh] ${
                    search ? "mt-[40%]" : "mt-[80%]"
                } lg:mt-0 items-center justify-center`}
            >
                <h1 className="z-[10] text-accent lg:text-base-content description lg:text-5xl text-2xl text-center">
                    {search
                        ? "No Students Found For Your Search"
                        : "You Don't Have Any Students Yet"}
                </h1>
            </div>
        );
    }

    return (
        <div
            className={`overflow-x-auto custom-scrollbar z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg ${
                students.length > 5
                    ? "lg:max-h-[50vh] max-h-[45vh] overflow-y-auto"
                    : ""
            }`}
        >
            <table className="z-[100] table text-center description dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 whitespace-nowrap lg:whitespace-normal">
                {/* head */}
                <MyStudentsTableHead />
                <tbody className="text-sm">
                    {students.map((student, index) => {
                        return (
                            <tr key={student?._id}>
                                <td>
                                    {resultsPerPage * (currentPage - 1) +
                                        (index + 1)}
                                </td>
                                <td className="flex justify-center">
                                    <ImageWithLoader
                                        className="rounded-full w-[4.5vh]"
                                        gif="/assets/user_avatar.png"
                                        src={
                                            student?.image ||
                                            "/assets/user_avatar.png"
                                        }
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
