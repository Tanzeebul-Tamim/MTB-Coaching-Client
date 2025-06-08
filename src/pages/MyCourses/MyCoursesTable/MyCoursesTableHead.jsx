const MyCoursesTableHead = ({ isSmallDevice }) => {
    return (
        <thead className="bg-base-200 bg-opacity-50">
            <tr className="text-white text-xs">
                <th>No</th>
                <th>Image</th>
                <th>Course Name</th>
                <th>Price</th>
                {!isSmallDevice && <th>Seats</th>}
                <th>Enrolled</th>
                <th>Remaining</th>
                <th>Student List</th>
            </tr>
        </thead>
    );
};

export default MyCoursesTableHead;
