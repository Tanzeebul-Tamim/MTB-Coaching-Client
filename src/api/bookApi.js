// book class
export const bookClass = (
    studentId,
    instructorId,
    studentEmail,
    studentName,
    classIndex,
    startDate,
    endDate
) => {
    fetch(`${import.meta.env.VITE_API_URL}/book-class`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            studentId,
            instructorId,
            studentEmail,
            studentName,
            classIndex,
            startDate,
            endDate,
            paymentStatus: "unpaid",
        }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
};

// update class status
export const purchaseClass = (
    studentId,
    instructorId,
    studentEmail,
    studentName,
    classIndex,
    paymentInfo
) => {
    fetch(`${import.meta.env.VITE_API_URL}/book-class`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            studentId,
            instructorId,
            studentEmail,
            studentName,
            classIndex,
            paymentStatus: "paid",
            transactionId: paymentInfo.transactionId,
            date: paymentInfo.date,
        }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
};

// update instructor student count
export const updateStudentCount = (instructorId, classIndex) => {
    fetch(`${import.meta.env.VITE_API_URL}/instructor/updateStudentCount`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            instructorId,
            classIndex,
        }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
};

// get user's booked classes
export const getBookedClasses = async (studentId) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/book-class/${studentId}`
    );
    const data = await response.json();
    return data;
};

// delete a class
export const deleteClass = (studentId, instructorId, classIndex) => {
    fetch(`${import.meta.env.VITE_API_URL}/book-class/${studentId}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ instructorId, classIndex }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
};

// delete all classes of an user
export const deleteAllClass = (studentId) => {
    fetch(`${import.meta.env.VITE_API_URL}/booking/${studentId}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
};
