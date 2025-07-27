const MyCoursesTableHead = ({ isSmallDevice }) => {
    return (
        <thead className="bg-base-200 dark:lg:bg-opacity-50 dark:bg-opacity-50 lg:bg-opacity-50 bg-opacity-70">
            <tr className="dark:lg:text-base-content dark:text-base-content lg:text-base-content text-gray-200 text-xs">
                <th>No</th>
                <th>Image</th>
                <th>Course Name</th>
                <th>Price</th>
                {!isSmallDevice && <th>Seats</th>}
                <th>Enrolled</th>
                <th>Status</th>
                <th>Details</th>
                <th>Student List</th>
            </tr>
        </thead>
    );
};

export default MyCoursesTableHead;
