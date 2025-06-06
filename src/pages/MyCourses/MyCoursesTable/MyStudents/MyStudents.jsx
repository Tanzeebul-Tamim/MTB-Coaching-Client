import { useEffect, useState } from "react";
import useTitle from "../../../../Helmet/useTitle";
import { getUserData } from "../../../../api/authApi";
import DashboardPageTitle from "../../../../shared_components/DashboardPageTitle/DashboardPageTitle";
import { PropagateLoader } from "react-spinners";
import MyStudentsTable from "./MyStudentsTable/MyStudentsTable";
import { useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const MyStudents = () => {
  const { idx } = useParams();
  const parsedIdx = parseInt(idx);
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  useTitle("| My Students");

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
    if (userDetails && userDetails._id) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/instructor/students/${userDetails._id}/${idx}`)
        .then(async (res) => await res.json())
        .then((data) => {
          setStudents(data.students);
          setLoading(false)})
    }
  }, [idx, userDetails]);

  let courseName;

  if (userDetails && userDetails?.classes) {
    courseName = userDetails?.classes[parsedIdx]?.name;
  }

  if (loading) {
    return (
      <>
        <DashboardPageTitle title={"My Students"} />
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
      <DashboardPageTitle title={"My Students"} />
      <MyStudentsTable courseName={courseName} students={students} />
    </>
  );
};

export default MyStudents;