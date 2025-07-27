import { toast } from "react-toastify";

const useSelectedClassesTable = (
    userDetails
) => {
     const updateProfile = () => {
        if (
            typeof userDetails?.address === "undefined" ||
            typeof userDetails?.contactNo === "undefined" ||
            userDetails?.gender === "undefined"
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
        updateProfile,
    };
};

export default useSelectedClassesTable;
