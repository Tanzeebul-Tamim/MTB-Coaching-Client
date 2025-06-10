import { useEffect, useState } from "react";
import useTitle from "../../Helmet/useTitle";
import { getUserData } from "../../api/authApi";
import { getBookedClasses } from "../../api/bookApi";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";
import EnrolledClassesTable from "./EnrolledClassesTable/EnrolledClassesTable";
import useAuth from "../../hooks/useAuth";
import { GiTeacher } from "react-icons/gi";
import useScreenSize from "../../hooks/useScreeSize";
import SklEnrolledClass from "../../skeletons/SklEnrolledClass";

const EnrolledClass = () => {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [userBookings, setUserBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isSmallDevice } = useScreenSize();
    const paidBookings = userBookings.filter(
        (booking) => booking.paymentStatus === "paid"
    );
    useTitle("| Enrolled Courses");

    useEffect(() => {
        if (user && user.email) {
            setLoading(true);
            getUserData(user.email)
                .then((data) => {
                    setUserDetails(data);
                    setLoading(false);
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
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

    if (loading) {
        return (
            <>
                <DashboardPageTitle
                    title={`${isSmallDevice ? "" : "My"} Enrolled Courses`}
                />
                <SklEnrolledClass isSmallDevice={isSmallDevice} />
            </>
        );
    }

    const renderCondition = paidBookings && paidBookings.length > 0;

    return (
        <>
            <DashboardPageTitle
                title={`${isSmallDevice ? "" : "My"} Enrolled Courses`}
            />
            {renderCondition && (
                <div className="z-10 mt-[35%] lg:mt-0 lg:mb-5 mb-2 flex justify-between lg:gap-2 text-white description lg:text-xl">
                    <span className="z-[100] flex items-center gap-2">
                        <GiTeacher className="lg:text-2xl" />
                        <strong>
                            {!isSmallDevice && "Enrolled"} Courses Count :{" "}
                        </strong>
                        <span>{userBookings?.length}</span>
                    </span>{" "}
                </div>
            )}
            <EnrolledClassesTable
                isSmallDevice={isSmallDevice}
                userBookings={paidBookings}
            ></EnrolledClassesTable>
        </>
    );
};

export default EnrolledClass;
