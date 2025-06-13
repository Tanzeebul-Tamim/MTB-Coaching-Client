import { BsFillCreditCardFill } from "react-icons/bs";
import { ClipLoader } from "react-spinners";

const SklPaymentHistory = ({ isSmallDevice }) => {
    return (
        <div className="animate-pulse">
            <div className="z-10 mt-[35%] lg:mt-0 lg:mb-5 mb-2 flex justify-between lg:gap-2 text-white description lg:text-xl">
                <span className="z-[100] flex items-center gap-2">
                    <BsFillCreditCardFill className="lg:text-2xl" />
                    <strong>
                        {!isSmallDevice && "Enrolled"} Transactions Count :{" "}
                    </strong>
                    <ClipLoader color="rgb(256 256 256)" />
                </span>{" "}
            </div>
            <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg">
                <table className="z-[100] table text-center description text-white whitespace-nowrap lg:whitespace-normal">
                    {/* head */}
                    <thead className="bg-base-200 bg-opacity-50">
                        <tr className="text-white text-xs">
                            <th className="">No</th>
                            <th className="">Course</th>
                            <th className="">Transaction ID</th>
                            <th className="">Date</th>
                            <th className="">Time</th>
                            <th className="">Amount</th>
                            <th className="">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {Array.from({ length: 5 }).map((_, i) => {
                            return (
                                <tr className="" key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <div className="w-16 sm:w-24 h-3 lg:h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SklPaymentHistory;
