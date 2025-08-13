import moment from "moment/moment";
import MessagesTableHead from "./MessagesTableHead";
import { MdMessage } from "react-icons/md";
import MessageModal from "./MessageModal";

const MessagesTable = ({ messages, isSmallDevice, search, settings }) => {
    const { resultsPerPage, currentPage } = settings;

    const sortedMessages = [...messages].sort((a, b) => {
        return moment(b.date).unix() - moment(a.date).unix();
    });

    if (sortedMessages?.length === 0) {
        return (
            <div
                className={`flex lg:h-[55vh] ${
                    search ? "mt-[40%]" : "mt-[80%]"
                } lg:mt-0 items-center justify-center`}
            >
                <h1 className="z-[10] text-accent lg:text-base-content description lg:text-5xl text-2xl text-center">
                    {search
                        ? "No Tickets Found For Your Search"
                        : "You Haven't Submitted Any Tickets Yet"}
                </h1>
            </div>
        );
    }

    return (
        <div
            className={`overflow-x-auto custom-scrollbar z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg ${
                sortedMessages.length > resultsPerPage
                    ? "lg:max-h-[50vh] max-h-[45vh] overflow-y-auto"
                    : ""
            }`}
        >
            <table className="z-[100] table text-center description dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 whitespace-nowrap lg:whitespace-normal">
                {/* head */}
                <MessagesTableHead />
                <tbody className="text-sm">
                    {sortedMessages.map((message, index) => {
                        const newIndex =
                            resultsPerPage * (currentPage - 1) + index;
                        const modalId = `class_modal_${index}`;

                        return (
                            <>
                                <tr key={message._id}>
                                    <td>{newIndex + 1}</td>
                                    <td>{message?.ticketId}</td>
                                    <td>{message?.subject}</td>
                                    <td>
                                        {moment(message?.date).format(
                                            "Do MMM, YYYY"
                                        )}
                                    </td>
                                    <td>
                                        {moment(message?.date).format(
                                            "hh:mm A"
                                        )}
                                    </td>
                                    <td>Pending</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                window[modalId].showModal()
                                            }
                                            className="btn btn-xs text-xs lg:rounded-lg rounded-full text-base-content hover:bg-base-200 bg-base-100 dark:hover:bg-stone-700 dark:bg-stone-500 border-0"
                                        >
                                            {isSmallDevice ? (
                                                <>
                                                    <span className="text-[12px]">
                                                        View
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <MdMessage />
                                                    <span>View</span>
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                                <MessageModal i={index} detail={message} />
                            </>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default MessagesTable;
