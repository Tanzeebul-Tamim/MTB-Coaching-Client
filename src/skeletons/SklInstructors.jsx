import { BiDotsVerticalRounded } from "react-icons/bi";

const SklInstructors = () => {
    return (
        <div className="lg:pt-10 pt-5 animate-pulse">
            <div className="flex sm:flex-row gap-2 sm:items-center mb-2">
                <strong className="flex items-center gap-2">
                    <div className="lg:w-6 lg:h-6 h-3 w-3 bg-gray-200 rounded-full"></div>
                    <div className="w-20 sm:w-24 lg:h-6 h-3 bg-gray-200 rounded"></div>
                </strong>
                <div className="w-6 lg:h-6 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="overflow-x-auto">
                <table className="table text-center lg:whitespace-normal whitespace-nowrap">
                    <thead className="bg-base-200">
                        <tr>
                            <th className="bg-gray-200 h-4 w-4"></th>
                            <th className="bg-gray-200 h-4 w-24"></th>
                            <th className="bg-gray-200 h-4 w-32"></th>
                            <th className="bg-gray-200 h-4 w-20"></th>
                            <th className="bg-gray-200 h-4 w-20"></th>
                            <th className="bg-gray-200 h-4 w-20"></th>
                        </tr>
                    </thead>
                    <tbody className="lg:text-xl text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i}>
                                <td>
                                    <div className="bg-gray-200 rounded h-4 w-4"></div>
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask lg:mask-squircle mask-circle lg:w-24 lg:h-24 bg-gray-200"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col justify-center items-center">
                                        <div>
                                            <div className="font-bold bg-gray-200 rounded h-4 w-24"></div>
                                        </div>
                                        <div className="badge badge-ghost badge-md bg-gray-200 h-4 w-32"></div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="quote bg-gray-200 rounded h-4 w-32"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="bg-gray-200 rounded h-4 w-4"></div>
                                </td>
                                <td>
                                    <div className="w-24 sm:w-36 lg:h-10 h-4 bg-gray-200 rounded"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <button
                    disabled
                    className="lg:mt-10 mt-6 disabled:bg-stone-800 btn btn-sm lg:btn-md text-sm lg:text-lg rounded-full hover:bg-stone-700 bg-stone-800 animate-bounce"
                >
                    <BiDotsVerticalRounded />
                    Load More
                </button>
            </div>
        </div>
    );
};

export default SklInstructors;
