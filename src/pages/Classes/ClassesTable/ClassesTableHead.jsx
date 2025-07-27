const ClassesTableHead = ({ userDetails }) => {
    return (
        <thead className="bg-base-200">
            <tr className="text-base-content lg:text-lg text-sm">
                <th className="">No</th>
                <th className="">Image</th>
                <th className="">Course</th>
                <th className="">Instructor</th>
                <th className="">Price</th>
                <th className="">Available Slots</th>
                <th className="">View Details</th>
                {userDetails?.role !== "Instructor" && (
                    <th className="">Book Courses</th>
                )}
            </tr>
        </thead>
    );
};

export default ClassesTableHead;
