import { AiFillHome } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import ActiveLink2 from "../../activeLink2/ActiveLink2";
import { getUserData } from "../../api/authApi";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useScreenSize from "../../hooks/useScreeSize";

const SideNav = ({ setSideNavOpen }) => {
    const { user, loading } = useAuth();
    const [userDetails, setUserDetails] = useState({});
    const [userLoading, setUserLoading] = useState(false);
    const [title, setTitle] = useState(null);
    const { isSmallDevice } = useScreenSize();

    useEffect(() => {
        setUserLoading(true);
        getUserData(user?.email).then((data) => {
            setUserDetails(data);
            setUserLoading(false);

            if (!loading && !userLoading) {
                if (userDetails?.role === "Instructor") {
                    setTitle("Instructor");
                } else if (userDetails?.role === "Student") {
                    setTitle("Student");
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.email, userDetails.role]);

    return (
        <div
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.800), rgba(0, 0, 0, 0.500)), url('/sidenav_banner.jpg')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className="h-screen fixed p-7 bg-base-200"
        >
            <div className="flex justify-center items-center">
                <img className="w-[300px]" src="/MTB_Coaching.png" />
            </div>
            <div className="divider"></div>
            <h1 className="title mb-10 uppercase text-center text-2xl">
                {title} Dashboard
            </h1>
            <div className="flex flex-col lg:gap-5 gap-3">
                <Link
                    to="/"
                    className="font-bold flex gap-3 items-center tracking-widest text-white description lg:text-lg text-base"
                >
                    <AiFillHome className="text-xl" /> Home
                </Link>
                <Link
                    to="/instructors"
                    className="font-bold flex gap-3 items-center tracking-widest text-white description lg:text-lg text-base"
                >
                    <FaChalkboardTeacher className="text-xl" /> Instructors
                </Link>
                <Link
                    to="/classes"
                    className="font-bold flex gap-3 items-center tracking-widest text-white description lg:text-lg text-base"
                >
                    <IoSchoolSharp className="text-xl" /> Courses
                </Link>
                <Link
                    to="/about-us"
                    className="font-bold flex gap-3 items-center tracking-widest text-white description lg:text-lg text-base"
                >
                    <BsFillInfoCircleFill className="text-xl" /> About Us
                </Link>

                <div className="divider"></div>
                {(userDetails.role == "Student" ||
                    typeof userDetails.role === "undefined") &&
                    !loading &&
                    !userLoading && (
                        <>
                            <ActiveLink2
                                setSideNavOpen={setSideNavOpen}
                                to="/dashboard/profile"
                            >
                                My Profile
                            </ActiveLink2>
                            <ActiveLink2
                                setSideNavOpen={setSideNavOpen}
                                to="/dashboard/selected-classes"
                            >
                                {!isSmallDevice && "My"} Booked Courses
                            </ActiveLink2>
                            <ActiveLink2
                                setSideNavOpen={setSideNavOpen}
                                to="/dashboard/enrolled-classes"
                            >
                                {!isSmallDevice && "My"} Enrolled Courses
                            </ActiveLink2>
                            <ActiveLink2
                                setSideNavOpen={setSideNavOpen}
                                to="/dashboard/payment"
                            >
                                {!isSmallDevice && "My"} Payment History
                            </ActiveLink2>
                        </>
                    )}
                {userDetails.role == "Instructor" &&
                    !loading &&
                    !userLoading && (
                        <>
                            <ActiveLink2
                                setSideNavOpen={setSideNavOpen}
                                to="/dashboard/profile"
                            >
                                My Profile
                            </ActiveLink2>
                            <ActiveLink2
                                setSideNavOpen={setSideNavOpen}
                                to={`/instructor/${userDetails._id}`}
                            >
                                My Wall
                            </ActiveLink2>
                            <ActiveLink2
                                setSideNavOpen={setSideNavOpen}
                                to="/dashboard/add-class"
                            >
                                Add a Course
                            </ActiveLink2>
                            <ActiveLink2
                                setSideNavOpen={setSideNavOpen}
                                to="/dashboard/my-classes"
                            >
                                My Courses
                            </ActiveLink2>
                        </>
                    )}
                {loading ||
                    (userLoading && (
                        <div className="flex mt-20 gap-11 justify-center">
                            <ScaleLoader color="white" height={50} width={10} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SideNav;
