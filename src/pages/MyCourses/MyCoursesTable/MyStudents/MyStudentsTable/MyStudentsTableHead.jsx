const MyStudentsTableHead = () => {
    return (
        <thead className="bg-base-200 dark:lg:bg-opacity-50 dark:bg-opacity-50 lg:bg-opacity-50 bg-opacity-70">
            <tr className="dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 text-sm">
                <th>No</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>ContactNo</th>
                <th>Address</th>
            </tr>
        </thead>
    );
};

export default MyStudentsTableHead;
