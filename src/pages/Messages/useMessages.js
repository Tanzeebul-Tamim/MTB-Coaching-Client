import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useScreenSize from "../../hooks/useScreenSize";
import useUserData from "../../hooks/useUserData";
import useTitle from "../../hooks/useTitle";
import usePagination from "../../hooks/usePagination";
import { getMessages } from "../../api/messageApi";

const useMessages = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const { isSmallDevice } = useScreenSize();
    const { loading, userDetails } = useUserData();
    useTitle("| Tickets");

    useEffect(() => {
        if (user && user.email && userDetails?._id) {
            getMessages(userDetails?._id)
                .then((data) => {
                    setMessages(data);
                })
                .catch((error) => console.error(error));
        } else if (!user) {
            setMessages([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetails, messages]);

    const [search, setSearch] = useState("");
    const [filteredMessages, setFilteredMessages] = useState(
        messages || []
    );
    const resultsPerPage = isSmallDevice ? 5 : 8;

    const renderCondition = messages && messages.length > 0;
    const searchableFields = [
        { field: "subject", split: true },
        { field: "ticketId", split: false },
    ];

    // Pagination logic
    const paginationHook = usePagination(messages, resultsPerPage);
    const paginatedMessages = paginationHook?.paginatedItems;
    const { currentPage } = paginationHook;
    const paginationSettings = { resultsPerPage, currentPage };

    return {
        isSmallDevice,
        loading,
        search,
        setSearch,
        filteredMessages,
        setFilteredMessages,
        paginatedMessages,
        paginationSettings,
        messages,
        paginationHook,
        renderCondition,
        searchableFields,
    };
};

export default useMessages;
