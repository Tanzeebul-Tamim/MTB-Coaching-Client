import { useState, useMemo } from "react";

const usePagination = (items, resultsPerPage = 5) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil((items?.length || 0) / resultsPerPage);

    const paginatedItems = useMemo(() => {
        return items?.slice(
            (currentPage - 1) * resultsPerPage,
            currentPage * resultsPerPage
        );
    }, [items, currentPage, resultsPerPage]);

    return { currentPage, setCurrentPage, totalPages, paginatedItems, resultsPerPage };
};

export default usePagination;
