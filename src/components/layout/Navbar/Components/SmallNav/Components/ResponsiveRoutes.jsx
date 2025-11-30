import { AiFillHome } from "react-icons/ai";
import { FaBalanceScale, FaChalkboardTeacher, FaUser } from "react-icons/fa";
import { MdInstallMobile, MdOutlineHelp, MdSchool } from "react-icons/md";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { SlNote } from "react-icons/sl";
import { GiTeacher } from "react-icons/gi";
import { BiSolidDashboard, BiSupport } from "react-icons/bi";
import { BsInfoCircleFill } from "react-icons/bs";
import ActiveLink from "../../../../../ui/ActiveLink";
import ThemeToggle from "../../../../../ui/ThemeToggle/ThemeToggle";
import usePWAInstall from "../../../../../../hooks/usePWAInstall";
import { RiRobot2Fill } from "react-icons/ri";

const ResponsiveRoutes = ({ props, navRef }) => {
    const {
        user,
        userDetails,
        myWallRoute,
        customColor,
        handleLogOut,
        open,
        setOpen,
        authenticationPage,
        navigate,
        handleScrollGlow,
    } = props;

    const { install, installReady } = usePWAInstall();

    return (
        <div
            style={{ transition: "right 0.3s ease-in-out" }}
            ref={navRef}
            className={`mt-4 flex flex-col bg-opacity-70 absolute duration-300 uppercase ${
                open ? "top-10 right-5" : "top-10 -right-[170px]"
            } lg:hidden z-10 py-2 px-4 bg-base-100 border border-base-content rounded-xl border-opacity-40`}
        >
            {/* Theme Toggler */}
            <ThemeToggle />
            
            {/* ---------------------Utility & Support Actions */}
            <hr className="opacity-60 pb-[3px] border-t-1 border-base-content" />

            <span
                onClick={() => {
                    setOpen(!open);
                    if (authenticationPage) {
                        navigate("/");
                        setTimeout(() => {
                            handleScrollGlow();
                        }, 300);
                    } else handleScrollGlow();
                }}
                className="flex items-center gap-1"
            >
                <BiSupport className="text-xs" />
                Support Request
            </span>
            <span data-tip="Coming Soon" className="flex items-center gap-1">
                <RiRobot2Fill className="text-xs" />
                Your AI Coach
            </span>
            {installReady && (
                <span onClick={install} className="flex items-center gap-1">
                    <MdInstallMobile className="text-xs" />
                    Install Web App
                </span>
            )}

            {/* ---------------------Routes Section */}

            <hr className="opacity-60 pb-[3px] border-t-1 border-base-content" />

            <ActiveLink to="/">
                <span
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1"
                >
                    <AiFillHome className="text-xs" />
                    Home
                </span>
            </ActiveLink>
            <ActiveLink to="/instructors">
                <span
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1"
                >
                    <FaChalkboardTeacher className="text-xs" />
                    Instructors
                </span>
            </ActiveLink>
            <ActiveLink to="/classes">
                <span
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1"
                >
                    <MdSchool className="text-xs" />
                    Courses
                </span>
            </ActiveLink>
            {user && (
                <ActiveLink to="/dashboard/profile">
                    <span
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-1"
                    >
                        <BiSolidDashboard className="text-xs" />
                        Dashboard
                    </span>
                </ActiveLink>
            )}
            {userDetails?.role === "Instructor" && (
                <ActiveLink dark={true} to={myWallRoute}>
                    <span
                        onClick={() => setOpen(!open)}
                        className={`flex items-center gap-1 ${
                            location.pathname === myWallRoute && "text-primary"
                        }`}
                    >
                        <FaUser className="text-xs" />
                        My Wall
                    </span>
                </ActiveLink>
            )}
            <ActiveLink to="/about-us">
                <span
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1"
                >
                    <BsInfoCircleFill className="text-xs" />
                    About Us
                </span>
            </ActiveLink>
            <ActiveLink to="/legal">
                <span
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1"
                >
                    <FaBalanceScale className="text-xs" />
                    Legal
                </span>
            </ActiveLink>
            <ActiveLink to="/support">
                <span
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1"
                >
                    <MdOutlineHelp className="text-xs" />
                    FAQ & Support
                </span>
            </ActiveLink>

            {/* ---------------------Auth Section */}
            <hr className="opacity-60 pb-[3px] border-t-1 border-base-content" />

            <ActiveLink customColor={customColor} to="/login">
                <span
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1"
                >
                    <FiLogIn className="text-xs" />
                    Login
                </span>
            </ActiveLink>
            <ActiveLink customColor={customColor} to="/register">
                <span
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1"
                >
                    <SlNote className="text-xs" />
                    Register
                </span>
            </ActiveLink>
            <ActiveLink customColor={customColor} to="/instructor-register">
                <span
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1"
                >
                    <GiTeacher className="text-xs" />
                    Apply Now
                </span>
            </ActiveLink>
            {user && (
                <div onClick={handleLogOut} className="block">
                    <span
                        onClick={() => setOpen(!open)}
                        className={`${customColor} flex items-center gap-1`}
                    >
                        <FiLogOut className="text-xs" />
                        Logout
                    </span>
                </div>
            )}
        </div>
    );
};

export default ResponsiveRoutes;
