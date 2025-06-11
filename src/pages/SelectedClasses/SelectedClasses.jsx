import { useEffect } from "react";
import { useState } from "react";
import { deleteAllClass, getBookedClasses } from "../../api/bookApi";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";
import SelectedClassesTable from "./SelectedClassesTable/SelectedClassesTable";
import useTitle from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";
import { GiTeacher } from "react-icons/gi";
import Swal from "sweetalert2";
import useScreenSize from "../../hooks/useScreenSize";
import SklSelectedClasses from "../../skeletons/SklSelectedClasses";
import usePagination from "../../hooks/usePagination";
import Searchbar from "../../reusable/Searchbar";
import Pagination from "../../reusable/Pagination";
import useUserData from "../../hooks/useUserData";

const SelectedClasses = () => {
    const { user } = useAuth();
    const [userBookings, setUserBookings] = useState([]);
    const unpaidBookings = userBookings.filter(
        (booking) => booking.paymentStatus === "unpaid"
    );
    const { isSmallDevice } = useScreenSize();
    const { loading, userDetails } = useUserData();
    useTitle("| Booked Courses");

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

    const [search, setSearch] = useState("");
    const [filteredBookings, setFilteredBookings] = useState(
        unpaidBookings || []
    );

    // Pagination logic
    const paginationHook = usePagination(unpaidBookings);
    const paginatedBookings = paginationHook?.paginatedItems;
    const { resultsPerPage, currentPage } = paginationHook;
    const paginationSettings = { resultsPerPage, currentPage };

    if (loading) {
        return (
            <>
                <DashboardPageTitle
                    title={`${isSmallDevice ? "" : "My"} Booked Courses`}
                />
                <SklSelectedClasses isSmallDevice={isSmallDevice} />
            </>
        );
    }

    const renderCondition = unpaidBookings && unpaidBookings.length > 0;
    const searchableFields = [{ field: "class-name", split: false }];

    return (
        <>
            <DashboardPageTitle
                title={`${isSmallDevice ? "" : "My"} Booked Courses`}
            />
            {renderCondition && (
                <>
                    <Searchbar
                        items={unpaidBookings}
                        searchableFields={searchableFields}
                        isSmallDevice={isSmallDevice}
                        setFilteredItems={setFilteredBookings}
                        paginatedItems={paginatedBookings}
                        search={search}
                        setSearch={setSearch}
                        placeholder="Search by Course Name"
                    />
                    <div className="lg:mb-5 mb-2 lg:mt-0 z-10 flex justify-between gap-2 text-white description lg:text-xl">
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
                </>
            )}
            <SelectedClassesTable
                search={search}
                isSmallDevice={isSmallDevice}
                userBookings={filteredBookings}
                settings={paginationSettings}
                userDetails={userDetails}
            ></SelectedClassesTable>
            {/* Pagination Controls at the bottom */}
            <Pagination search={search} paginationHook={paginationHook} />
        </>
    );
};

export default SelectedClasses;
