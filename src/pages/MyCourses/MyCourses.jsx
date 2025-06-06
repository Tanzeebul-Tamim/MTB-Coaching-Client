import { useEffect, useState } from "react";
import { getUserData } from "../../api/authApi";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";
import { PropagateLoader } from "react-spinners";
import useTitle from "../../Helmet/useTitle";
import MyCoursesTable from "./MyCoursesTable/MyCoursesTable";
import useAuth from "../../hooks/useAuth";

const MyCourses = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  useTitle("| My Courses");

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

  let instructorCourses;

  if (userDetails && userDetails?.role === "Instructor") {
    instructorCourses = userDetails?.classes;
  }

  if (loading) {
    return (
      <>
        <DashboardPageTitle title={"My Offered Courses"} />
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
      <DashboardPageTitle title={"My Offered Courses"} />
      <MyCoursesTable userDetails={userDetails} instructorCourses={instructorCourses} />
    </>
  );
};

export default MyCourses;