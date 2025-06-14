import { AiFillHome } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import ActiveLink2 from "../../ui/ActiveLink2";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useScreenSize from "../../../hooks/useScreenSize";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import useUserData from "../../../hooks/useUserData";
import SklSideNav from "../../skeletons/SklSideNav";
import ThemeToggle from "../../ui/ThemeToggle/ThemeToggle";

const SideNav = ({ sideNavOpen, setSideNavOpen, isDarkTheme }) => {
    const { loading } = useAuth();
    const [title, setTitle] = useState("User");
    const { isSmallDevice } = useScreenSize();
    const { loading: userLoading, userDetails } = useUserData();    

    useEffect(() => {
        if (!loading && !userLoading) {
            if (userDetails?.role === "Instructor") {
                setTitle("Instructor");
            } else if (userDetails?.role === "Student") {
                setTitle("Student");
            }
        }
    }, [loading, userDetails?.role, userLoading]);

    const url = "url('/assets/sidenav_banner.jpg')";
    const lightBg =
        "linear-gradient(rgba(50, 40, 20, 0.4), rgba(60, 50, 30, 0.3)), " +
        url;
    const darkBg =
        "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), " + url;
    const bg = isDarkTheme ? darkBg : lightBg;

    return (
        <div
            style={{
                backgroundImage: bg,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
            className="h-screen fixed p-7 bg-base-200 dark:text-white text-yellow-50"
        >
            <button
                className={`lg:hidden fixed top-[10%] -right-[17.5%] z-30 text-primary bg-black bg-opacity-60 rounded-full h-10 w-10 shadow-md flex items-center justify-center transition-transform duration-700 ${
                    sideNavOpen ? "rotate-180" : "rotate-0"
                }`}
                onClick={() => setSideNavOpen((open) => !open)}
                aria-label="Toggle navigation"
            >
                <RiArrowRightDoubleFill
                    className={`text-4xl transition-transform duration-700 ${
                        sideNavOpen ? "scale-110" : "scale-100"
                    }`}
                    style={{ transitionProperty: "transform" }}
                />
            </button>
            <div className="flex justify-center items-center">
                <img
                    className="w-[300px]"
                    src={`/assets/MTB_Coaching_${
                        isDarkTheme ? "Dark" : "Light"
                    }.png`}
                />
            </div>
            <div className="divider"></div>
            <h1 className="title mb-10 uppercase text-center text-2xl text-accent">
                {title} Dashboard
            </h1>
            <div className="flex flex-col lg:gap-5 gap-3">
                <Link
                    to="/"
                    className="font-bold flex gap-3 items-center tracking-widest description lg:text-lg text-base"
                >
                    <AiFillHome className="text-xl" /> Home
                </Link>
                <Link
                    to="/instructors"
                    className="font-bold flex gap-3 items-center tracking-widest description lg:text-lg text-base"
                >
                    <FaChalkboardTeacher className="text-xl" /> Instructors
                </Link>
                <Link
                    to="/classes"
                    className="font-bold flex gap-3 items-center tracking-widest description lg:text-lg text-base"
                >
                    <IoSchoolSharp className="text-xl" /> Courses
                </Link>
                <Link
                    to="/about-us"
                    className="font-bold flex gap-3 items-center tracking-widest description lg:text-lg text-base"
                >
                    <BsFillInfoCircleFill className="text-xl" /> About Us
                </Link>
                <ThemeToggle />

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
                                to={`/instructors/${userDetails._id}`}
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
                {loading || (userLoading && <SklSideNav />)}
            </div>
        </div>
    );
};

export default SideNav;
