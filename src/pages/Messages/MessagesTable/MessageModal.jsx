import { AiFillCloseCircle } from "react-icons/ai";
import moment from "moment";
import useScreen from "../../../hooks/useScreen";

const MessageModal = ({ i, detail }) => {
    const { isSmallDevice } = useScreen();

    const { subject, message, date, ticketId } = detail;

    return (
        <dialog
            id={`class_modal_${i}`}
            className="modal text-base-content"
            onClick={(e) => {
                if (e.target === e.currentTarget && isSmallDevice) {
                    e.currentTarget.close();
                }
            }}
        >
            <form
                method="dialog"
                className="relative modal-box lg:max-w-3xl max-w-full bg-base-100 bg-opacity-80 border border-gray-500 border-opacity-50 shadow-xl p-6 md:p-8 rounded-xl overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <h1 className="text-xl lg:text-2xl font-bold text-center mb-1">
                    {subject}
                </h1>
                <p className="text-lg text-center text-gray-500 lg:mb-5 mb-3 font-semibold">
                    Ticket details overview
                </p>
                <button
                    type="button"
                    className="absolute lg:top-5 lg:right-5 top-3 right-3"
                    onClick={() => {
                        // implement modal close
                        document.getElementById(`class_modal_${i}`).close();
                    }}
                >
                    <AiFillCloseCircle className="lg:text-3xl text-2xl" />
                </button>

                {/* Content Grid */}
                <div className="max-w-xl bg-base-200 mx-auto p-6 border-base-content border rounded-xl border-opacity-30 shadow-md">
                    <p className="mb-2">
                        <strong>Ticket No:</strong> {ticketId}
                    </p>
                    <p className="mb-2">
                        <strong>Date:</strong>{" "}
                        {moment(date).format("dddd, Do MMMM YYYY")}
                    </p>
                    <p className="mb-2">
                        <strong>Subject:</strong> {subject}
                    </p>
                    <hr className="my-4 border-gray-300 dark:border-gray-600" />
                    <p className="whitespace-pre-line text-sm md:text-base">
                        {message}
                    </p>
                </div>
            </form>
        </dialog>
    );
};

export default MessageModal;
