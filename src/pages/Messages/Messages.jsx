import DashboardPageTitle from "../../components/ui/DashboardPageTitle";
import { GiTeacher } from "react-icons/gi";
import Searchbar from "../../components/ui/Searchbar";
import Pagination from "../../components/ui/Pagination";
import MessagesTable from "./MessagesTable/MessagesTable";
import useMessages from "./useMessages";
import SklMessages from "../../components/skeletons/SklMessages";

const Messages = () => {
    const {
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
    } = useMessages();

    if (loading) {
        return (
            <>
                <DashboardPageTitle
                    title={`${isSmallDevice ? "" : "My"} Submitted Tickets`}
                />
                <SklMessages isSmallDevice={isSmallDevice} />
            </>
        );
    }

    return (
        <>
            <DashboardPageTitle
                title={`${isSmallDevice ? "" : "My"} Submitted Tickets`}
            />
            {renderCondition && (
                <>
                    <Searchbar
                        items={messages}
                        searchableFields={searchableFields}
                        isSmallDevice={isSmallDevice}
                        setFilteredItems={setFilteredMessages}
                        paginatedItems={paginatedMessages}
                        search={search}
                        setSearch={setSearch}
                        placeholder="Search by Subject or Ticket No"
                    />
                    <div className="z-10 lg:mt-0 lg:mb-5 mb-2 flex justify-between lg:gap-2 lg:text-base-content text-accent description lg:text-xl">
                        <span className="z-[100] flex items-center gap-2">
                            <GiTeacher className="lg:text-2xl" />
                            <strong>
                                {!isSmallDevice && "Submitted"} Tickets Count :{" "}
                            </strong>
                            <span>{messages?.length}</span>
                        </span>{" "}
                    </div>
                </>
            )}
            <MessagesTable
                search={search}
                messages={filteredMessages}
                settings={paginationSettings}
                isSmallDevice={isSmallDevice}
            />
            {/* Pagination Controls at the bottom */}
            <Pagination search={search} paginationHook={paginationHook} />
        </>
    );
};

export default Messages;
