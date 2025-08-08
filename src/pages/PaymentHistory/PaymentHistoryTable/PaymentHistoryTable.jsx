import PaymentHistoryTableHead from "./PaymentHistoryTableHead";
import moment from "moment/moment";

const PaymentHistoryTable = ({ userBookings, search, settings }) => {
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
                <h1 className="z-[10] text-accent lg:text-base-content description lg:text-5xl text-2xl text-center">
                    {search
                        ? "No History Found For Your Search"
                        : "You Haven't Made Any Payment Yet"}
                </h1>
            </div>
        );
    }

    return (
        <div
            className={`overflow-x-auto custom-scrollbar z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg ${
                sortedBookings.length > resultsPerPage
                    ? "lg:max-h-[50vh] max-h-[45vh] overflow-y-auto"
                    : ""
            }`}
        >
            <table className="z-[100] table text-center description dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 whitespace-nowrap lg:whitespace-normal">
                {/* head */}
                <PaymentHistoryTableHead />
                <tbody className="text-sm">
                    {sortedBookings.map((classItem, index) => {
                        const newIndex =
                            resultsPerPage * (currentPage - 1) + index;
                        return (
                            <tr className="" key={classItem._id}>
                                <td>{newIndex + 1}</td>
                                <td>{classItem["class-name"]}</td>
                                <td>{classItem.transactionId}</td>
                                <td>
                                    {moment(classItem.date).format(
                                        "dddd, Do MMMM YYYY"
                                    )}
                                </td>
                                <td>
                                    {moment(classItem.date).format("hh : mm a")}
                                </td>
                                <td>$ {classItem.classFee}</td>
                                <td>Paid</td>
                            </tr>
                        );
                    })}
                </tbody>{" "}
            </table>
        </div>
    );
};

export default PaymentHistoryTable;
