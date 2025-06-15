import { HiDotsHorizontal } from "react-icons/hi";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";

const Pagination = ({ search, paginationHook }) => {
    const { currentPage, setCurrentPage, totalPages } = paginationHook;

    return (
        <>
            {totalPages > 1 && !search && (
                <div className="flex justify-center mt-4 gap-2">
                    {/* Prev Button */}
                    <button
                        className="lg:z-[100] btn btn-xs rounded-lg text-base-content hover:bg-base-200 bg-base-100 dark:hover:bg-stone-800 dark:bg-base-300 border-0 disabled:bg-base-200 dark:disabled:bg-base-200"
                        onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                    >
                        <GrCaretPrevious />
                    </button>

                    {/* Dynamic Page Buttons */}
                    {(() => {
                        const pageButtons = [];
                        const maxButtons = 3;
                        const startPage =
                            Math.floor((currentPage - 1) / maxButtons) *
                                maxButtons +
                            1;
                        const endPage = Math.min(
                            startPage + maxButtons - 1,
                            totalPages
                        );

                        // First page if we’re not in the first group
                        if (startPage > 1) {
                            pageButtons.push(
                                <button
                                    key={1}
                                    className={`lg:z-[100] border-0 btn btn-xs rounded-lg px-3 text-base-content ${
                                        currentPage === 1
                                            ? "bg-primary"
                                            : "hover:bg-base-200 bg-base-100 dark:hover:bg-stone-800 dark:bg-base-300"
                                    }`}
                                    onClick={() => setCurrentPage(1)}
                                >
                                    1
                                </button>
                            );

                            if (startPage > 2) {
                                pageButtons.push(
                                    <span
                                        key="start-ellipsis"
                                        className="lg:z-[100] border-0 dark:bg-base-300 bg-base-100 hover:bg-base-100 rounded-lg btn btn-xs px-2 cursor-default"
                                    >
                                        <HiDotsHorizontal />
                                    </span>
                                );
                            }
                        }

                        // Main group buttons
                        for (let i = startPage; i <= endPage; i++) {
                            pageButtons.push(
                                <button
                                    key={i}
                                    className={`lg:z-[100] border-0 btn btn-xs rounded-lg px-3 text-base-content ${
                                        currentPage === i
                                            ? "bg-primary hover:bg-secondary text-base-100"
                                            : "hover:bg-base-200 bg-base-100 dark:hover:bg-stone-800 dark:bg-base-300"
                                    }`}
                                    onClick={() => setCurrentPage(i)}
                                >
                                    {i}
                                </button>
                            );
                        }

                        // Last page if not in this group
                        if (endPage < totalPages) {
                            if (endPage < totalPages - 1) {
                                pageButtons.push(
                                    <span
                                        key="end-ellipsis"
                                        className="lg:z-[100] border-0 dark:bg-base-300 bg-base-100 btn btn-xs rounded-lg px-2 cursor-default hover:bg-base-100"
                                    >
                                        <HiDotsHorizontal />
                                    </span>
                                );
                            }

                            pageButtons.push(
                                <button
                                    key={totalPages}
                                    className={`lg:z-[100] border-0 text-base-content btn btn-xs rounded-lg px-3 ${
                                        currentPage === totalPages
                                            ? "bg-primary hover:bg-secondary text-base-100"
                                            : "hover:bg-base-200 bg-base-100 dark:hover:bg-stone-800 dark:bg-base-300"
                                    }`}
                                    onClick={() => setCurrentPage(totalPages)}
                                >
                                    {totalPages}
                                </button>
                            );
                        }

                        return pageButtons;
                    })()}

                    {/* Next Button */}
                    <button
                        className="lg:z-[100] btn btn-xs rounded-lg text-base-content hover:bg-base-200 bg-base-100 dark:hover:bg-stone-800 dark:bg-base-300 border-0 disabled:bg-base-200 dark:disabled:bg-base-200"
                        onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                    >
                        <GrCaretNext />
                    </button>
                </div>
            )}
        </>
    );
};

export default Pagination;
