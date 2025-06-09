import { BiDotsVerticalRounded } from "react-icons/bi";

const SklClasses = () => {
    return (
        <div className="lg:pt-10 pt-5 animate-pulse">
            <div className="flex sm:flex-row gap-2 sm:items-center mb-2">
                <strong className="flex items-center gap-2">
                    <div className="lg:w-6 lg:h-6 h-3 w-3 bg-gray-200 rounded-full"></div>
                    <div className="w-20 sm:w-24 lg:h-6 h-3 bg-gray-200 rounded"></div>
                </strong>
                <div className="w-6 lg:h-6 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="overflow-x-auto z-10 bg-black bg-opacity-30 lg:bg-transparent rounded-lg">
                <table className="table text-center description text-white whitespace-nowrap lg:whitespace-normal">
                    <thead className="bg-base-200">
                        <tr>
                            <th className="">
                                <div className="lg:w-8 lg:h-6 h-4 w-4 bg-gray-200 rounded"></div>
                            </th>
                            <th className="">
                                <div className="w-16 sm:w-24 h-6 bg-gray-200 rounded"></div>
                            </th>
                            <th className="">
                                <div className="w-20 sm:w-32 h-6 bg-gray-200 rounded"></div>
                            </th>
                            <th className="">
                                <div className="w-20 sm:w-32 h-6 bg-gray-200 rounded"></div>
                            </th>
                            <th className="">
                                <div className="w-20 sm:w-32 h-6 bg-gray-200 rounded"></div>
                            </th>
                            <th className="">
                                <div className="w-16 sm:w-24 h-6 bg-gray-200 rounded"></div>
                            </th>
                            <th className="">
                                <div className="w-24 sm:w-36 h-6 bg-gray-200 rounded"></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i}>
                                <td>
                                    <div className="lg:h-6 lg:w-6 h-4 w-4 bg-gray-200 rounded"></div>
                                </td>
                                <td>
                                    <div className="h-12 sm:h-16 w-20 sm:w-32 bg-gray-200 rounded"></div>
                                </td>
                                <td>
                                    <div className="w-32 sm:w-64 h-6 bg-gray-200 rounded"></div>
                                </td>
                                <td>
                                    <div className="w-32 sm:w-64 h-6 bg-gray-200 rounded"></div>
                                </td>
                                <td>
                                    <div className="w-20 sm:w-32 h-6 bg-gray-200 rounded"></div>
                                </td>
                                <td>
                                    <div className="w-14 sm:w-20 h-6 bg-gray-200 rounded"></div>
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

export default SklClasses;
