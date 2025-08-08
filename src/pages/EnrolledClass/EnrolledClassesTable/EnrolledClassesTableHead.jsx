const EnrolledClassesTableHead = () => {
    return (
        <thead className="bg-base-200 dark:lg:bg-opacity-50 dark:bg-opacity-50 lg:bg-opacity-50 bg-opacity-70">
            <tr className="dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 text-sm">
                <th className="">No</th>
                <th className="">Image</th>
                <th className="">Course</th>
                <th className="">Instructor</th>
                <th className="">Start Date</th>
                <th className="">End Date</th>
                <th className="">Duration</th>
                <th className="">Status</th>
            </tr>
        </thead>
    );
};

export default EnrolledClassesTableHead;
