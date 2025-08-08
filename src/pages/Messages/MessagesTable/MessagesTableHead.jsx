const MessagesTableHead = () => {
    return (
        <thead className="bg-base-200 dark:lg:bg-opacity-50 dark:bg-opacity-50 lg:bg-opacity-50 bg-opacity-70">
            <tr className="dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 text-sm">
                <th className="">No</th>
                <th className="">Ticket No</th>
                <th className="">Subject</th>
                <th className="">Date</th>
                <th className="">Time</th>
                <th className="">Status</th>
                <th className="">Message</th>
            </tr>
        </thead>
    );
};

export default MessagesTableHead;
