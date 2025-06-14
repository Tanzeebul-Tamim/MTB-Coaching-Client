import { useState } from "react";
import { toast } from "react-toastify";

const useSelectedClassesTable = (
    settings,
    userBookings,
    search,
    userDetails
) => {
    const { resultsPerPage, currentPage } = settings;
    const [deletingId, setDeletingId] = useState(null);

    if (userBookings?.length === 0) {
        return (
            <div
                className={`flex lg:h-[55vh] ${
                    search ? "mt-[40%]" : "mt-[80%]"
                } lg:mt-0 items-center justify-center`}
            >
                <h1 className="z-[10] description lg:text-5xl text-2xl text-center">
                    {search
                        ? "No Bookings Found For Your Search"
                        : "You Haven't Booked Any Courses Yet"}
                </h1>
            </div>
        );
    }

    const updateProfile = () => {
        if (
            typeof userDetails.address === "undefined" ||
            typeof userDetails.contactNo === "undefined" ||
            userDetails.gender === "undefined"
        ) {
            toast.warning(
                "To purchase classes, you have to update your profile first!",
                {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
            setTimeout(function () {
                window.location.replace("/dashboard/profile");
            }, 2400);
        }
    };

    return {
        resultsPerPage,
        currentPage,
        deletingId,
        setDeletingId,
        updateProfile,
    };
};

export default useSelectedClassesTable;
