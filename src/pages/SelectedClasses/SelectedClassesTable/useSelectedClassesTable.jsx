import { toast } from "react-toastify";
import useSoundEffects from "../../../hooks/useSoundEffects";

const useSelectedClassesTable = (userDetails) => {
    const { play } = useSoundEffects();

    const updateProfile = () => {
        if (
            typeof userDetails?.address === "undefined" ||
            typeof userDetails?.contactNo === "undefined" ||
            userDetails?.gender === "undefined"
        ) {
            play("warning");
            toast.info(
                <div className="text-center">
                    To purchase courses, you have to{" "}
                    <strong>update your profile</strong> first!
                </div>,
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
