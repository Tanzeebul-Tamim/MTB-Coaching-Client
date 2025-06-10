import { useEffect, useState } from "react";
import useTitle from "../../Helmet/useTitle";
import { getUserData } from "../../api/authApi";
import { getBookedClasses } from "../../api/bookApi";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";
import PaymentHistoryTable from "./PaymentHistoryTable/PaymentHistoryTable";
import useAuth from "../../hooks/useAuth";
import { BsFillCreditCardFill } from "react-icons/bs";
import useScreenSize from "../../hooks/useScreeSize";
import SklPaymentHistory from "../../skeletons/SklPaymentHistory";

const PaymentHistory = () => {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [userBookings, setUserBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isSmallDevice } = useScreenSize();
    const paidBookings = userBookings.filter(
        (booking) => booking.paymentStatus === "paid"
    );
    useTitle("| Payment History");

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
                    title={`${isSmallDevice ? "" : "My"} Payment History`}
                />
                <SklPaymentHistory isSmallDevice={isSmallDevice} />
            </>
        );
    }

    const renderCondition = paidBookings && paidBookings.length > 0;

    return (
        <>
            <DashboardPageTitle
                title={`${isSmallDevice ? "" : "My"} Payment History`}
            />
            {renderCondition && (
                <div className="mt-[35%] lg:mt-0 lg:mb-5 mb-2 z-10 flex justify-between lg:gap-2 text-white description lg:text-xl">
                    <span className="z-[100] flex items-center gap-2">
                        <BsFillCreditCardFill className="lg:text-2xl" />
                        <strong>Transactions Count :</strong>
                        <span>{userBookings?.length}</span>
                    </span>{" "}
                </div>
            )}
            <PaymentHistoryTable
                userBookings={paidBookings}
            ></PaymentHistoryTable>
        </>
    );
};

export default PaymentHistory;
