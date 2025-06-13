import ImageWithLoader from "../../../components/ui/ImageWithLoader";
import EnrolledClassesTableHead from "./EnrolledClassesTableHead";
import moment from "moment/moment";

const EnrolledClassesTable = ({
    userBookings,
    isSmallDevice,
    search,
    settings,
}) => {
    const { resultsPerPage, currentPage } = settings;

    const sortedBookings = [...userBookings].sort((a, b) => {
        return moment(b.date).unix() - moment(a.date).unix();
    });

    if (sortedBookings?.length === 0) {
        return (
            <div
                className={`flex lg:h-[55vh] ${
                    search ? "mt-[40%]" : "mt-[80%]"
                } lg:mt-0 items-center justify-center`}
            >
                <h1 className="z-[10] description lg:text-5xl text-2xl text-center">
                    {search
                        ? "No Enrollment Found For Your Search"
                        : "You Haven't Enrolled In Any Courses Yet"}
                </h1>
            </div>
        );
    }

    return (
        <div
            className={`overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg ${
                sortedBookings.length > 5
                    ? "lg:max-h-[50vh] max-h-[45vh] overflow-y-auto"
                    : ""
            }`}
        >
            <table className="z-[100] table text-center description text-white whitespace-nowrap lg:whitespace-normal">
                {/* head */}
                <EnrolledClassesTableHead />
                <tbody className="text-sm">
                    {sortedBookings.map((classItem, index) => {
                        return (
                            <tr className="" key={classItem._id}>
                                <td>
                                    {resultsPerPage * (currentPage - 1) +
                                        (index + 1)}
                                </td>
                                <td className="flex justify-center">
                                    <ImageWithLoader
                                        className={`lg:w-20 lg:h-12 h-6 rounded-lg lg:rounded-xl ${
                                            isSmallDevice && "object-cover"
                                        }`}
                                        src={classItem.classImage}
                                    />
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">
                                            {classItem?.["class-name"]}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">
                                            {classItem.instructorName}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default EnrolledClassesTable;
