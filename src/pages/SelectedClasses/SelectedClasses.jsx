import { useEffect } from "react";
import { useState } from "react";
import { getUserData } from "../../api/authApi";
import { deleteAllClass, getBookedClasses } from "../../api/bookApi";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";
import SelectedClassesTable from "./SelectedClassesTable/SelectedClassesTable";
import { PropagateLoader } from "react-spinners";
import useTitle from "../../Helmet/useTitle";
import useAuth from "../../hooks/useAuth";
import { GiTeacher } from "react-icons/gi";
import Swal from "sweetalert2";
import useScreenSize from "../../hooks/useScreeSize";

const SelectedClasses = () => {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [userBookings, setUserBookings] = useState([]);
    const { isSmallDevice } = useScreenSize();
    const [loading, setLoading] = useState(false);
    const unpaidBookings = userBookings.filter(
        (booking) => booking.paymentStatus === "unpaid"
    );
    useTitle("| Booked Courses");

    useEffect(() => {
        if (user && user.email) {
            setLoading(true);
            getUserData(user.email)
                .then((data) => {
                    setUserDetails(data);
                    setLoading(false);
                })
                .catch((error) => console.error(error));
        }
    }, [user]);

    useEffect(() => {
        if (user && user.email && userDetails._id) {
            getBookedClasses(userDetails._id)
                .then((data) => {
                    setUserBookings(data);
                })
                .catch((error) => console.error(error));
        } else if (!user) {
            setUserBookings([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetails, userBookings]);

    const handleClearList = () => {
        Swal.fire({
            title: "Are you sure you want to clear your booking list?",
            text: "You won't be able to revert this!",
            icon: "warning",
            color: "white",
            iconColor: "rgb(234 179 8)",
            showCancelButton: true,
            confirmButtonColor: "rgb(234 179 8)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, clear list!",
            background: "#201e1e",
            backdrop: "#00000",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Booking List has been Cleared!",
                    icon: "success",
                    color: "white",
                    iconColor: "lightgreen",
                    confirmButtonColor: "lightgreen",
                    confirmButtonText: "OK",
                    background: "#201e1e",
                    backdrop: "#00000",
                });
                deleteAllClass(userDetails._id);
            }
        });
    };

    if (loading) {
        return (
            <>
                <DashboardPageTitle
                    title={`${isSmallDevice ? "" : "My"} Booked Courses`}
                />
                <div
                    style={{ height: "400px" }}
                    className="flex justify-center items-center"
                >
                    <PropagateLoader color="rgb(234 179 8)" />
                </div>
            </>
        );
    }

    const renderCondition = unpaidBookings && unpaidBookings.length > 0;

    return (
        <>
            <DashboardPageTitle
                title={`${isSmallDevice ? "" : "My"} Booked Courses`}
            />
            {renderCondition && (
                <div className="lg:mb-5 mb-2 mt-[35%] lg:mt-0 z-10 flex justify-between gap-2 text-white description lg:text-xl">
                    <span className="z-[100] flex items-center gap-2">
                        <GiTeacher className="lg:text-2xl" />
                        <strong>
                            {!isSmallDevice && "My Booked"} Courses Count :{" "}
                        </strong>
                        <span>{unpaidBookings?.length}</span>
                    </span>{" "}
                    <button
                        onClick={handleClearList}
                        className="z-[100] btn text-white btn-xs text-sx border-0 rounded-lg hover:bg-stone-800 bg-stone-700"
                    >
                        <span>Clear List</span>
                    </button>
                </div>
            )}
            <SelectedClassesTable
                userDetails={userDetails}
                userBookings={unpaidBookings}
                isSmallDevice={isSmallDevice}
            ></SelectedClassesTable>
        </>
    );
};

export default SelectedClasses;
