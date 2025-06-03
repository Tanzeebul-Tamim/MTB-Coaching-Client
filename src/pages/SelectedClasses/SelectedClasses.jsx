import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useState } from "react";
import { getUserData } from "../../api/authApi";
import { getBookedClasses } from "../../api/bookApi";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";
import SelectedClassesTable from "./SelectedClassesTable/SelectedClassesTable";
import { PropagateLoader } from "react-spinners";
import useTitle from "../../Helmet/useTitle";

const SelectedClasses = () => {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const unpaidBookings = userBookings.filter(booking => booking.paymentStatus === 'unpaid');
  useTitle('| Booked Courses')

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

  if (loading) {
    return (
      <>
        <DashboardPageTitle title={"My Booked Courses"} />
        <div
          style={{ height: "400px" }}
          className="flex justify-center items-center"
        >
          <PropagateLoader color="rgb(234 179 8)" />
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardPageTitle title={"My Booked Courses"} />
      <SelectedClassesTable userDetails={userDetails} userBookings={unpaidBookings}></SelectedClassesTable>
    </>
  );
};

export default SelectedClasses;
