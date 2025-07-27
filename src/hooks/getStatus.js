const getStatus = (start, end) => {
    const today = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (today < startDate) return "Upcoming";
    else if (today > endDate) return "Ended";
    else return "Ongoing";
};

export default getStatus;
