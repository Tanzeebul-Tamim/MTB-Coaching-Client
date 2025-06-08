import { useEffect, useState } from "react";
import { getUserData } from "../../api/authApi";
import DashboardPageTitle from "../../shared_components/DashboardPageTitle/DashboardPageTitle";
import { PropagateLoader } from "react-spinners";
import useTitle from "../../Helmet/useTitle";
import MyCoursesTable from "./MyCoursesTable/MyCoursesTable";
import useAuth from "../../hooks/useAuth";
import useScreenSize from "../../hooks/useScreeSize";

const MyCourses = () => {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [totalStudent, setTotalStudent] = useState(0);
    const { isSmallDevice } = useScreenSize();
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

    useEffect(() => {
        if (userDetails && userDetails._id) {
            fetch(
                `${import.meta.env.VITE_API_URL}/instructor/total/${
                    userDetails._id
                }`
            )
                .then(async (res) => await res.json())
                .then((data) => {
                    setTotalStudent(data.totalStudents);
                });
        }
    }, [userDetails]);

    let instructorCourses = 0;

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
            <DashboardPageTitle
                title={`My ${isSmallDevice ? "" : "Offered"} Courses`}
            />
            <div className="lg:mb-5 mb-2 mt-[35%] z-10 lg:mt-0 flex justify-between gap-2 text-white description lg:text-xl">
                <strong className="z-[100]">
                    <span>{!isSmallDevice && "Offered"} Courses Count : </span>
                    <span>{instructorCourses.length}</span>
                </strong>

                <strong className="z-[100]">
                    <span>Total Students : </span>
                    <span>{totalStudent}</span>
                </strong>
            </div>
            <MyCoursesTable
                isSmallDevice={isSmallDevice}
                userDetails={userDetails}
                instructorCourses={instructorCourses}
            />
        </>
    );
};

export default MyCourses;
