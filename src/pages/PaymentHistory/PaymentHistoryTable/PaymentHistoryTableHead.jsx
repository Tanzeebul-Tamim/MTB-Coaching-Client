const PaymentHistoryTableHead = () => {
    return (
        <thead className="bg-base-200 dark:lg:bg-opacity-50 dark:bg-opacity-50 lg:bg-opacity-50 bg-opacity-70">
            <tr className="dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 text-xs">
                <th className="">No</th>
                <th className="">Course</th>
                <th className="">Transaction ID</th>
                <th className="">Date</th>
                <th className="">Time</th>
                <th className="">Amount</th>
                <th className="">Status</th>
            </tr>
        </thead>
    );
};

export default PaymentHistoryTableHead;
