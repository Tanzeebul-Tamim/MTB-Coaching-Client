import { useEffect } from "react";
import ActiveLink from "../../../ui/ActiveLink";
import ThemeToggle from "../../../ui/ThemeToggle/ThemeToggle";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineHelp, MdOutlineSchool } from "react-icons/md";
import { LuLayoutDashboard, LuScale } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { SlNote } from "react-icons/sl";
import { GiTeacher } from "react-icons/gi";

const ResponsiveRoutes = ({ props, navRef }) => {
    const {
        user,
        userDetails,
        myWallRoute,
        customColor,
        handleLogOut,
        open,
        setOpen,
    } = props;

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                open &&
                navRef.current &&
                !navRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <div
            style={{ transition: "left 0.3s ease-in-out" }}
            ref={navRef}
            className={`mt-4 flex flex-col bg-opacity-70 absolute duration-300 uppercase ${
                open ? "top-10 left-5" : "top-10 -left-[150px]"
            } lg:hidden z-10 py-2 px-4 bg-base-100 border border-base-content rounded-xl border-opacity-40`}
        >
            <ThemeToggle />
            <hr className="opacity-60 pb-[3px] border-t-1 border-base-content" />
            <ActiveLink to="/">
                <span
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1"
                >
                    <AiOutlineHome className="text-xs" />
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
                    <MdOutlineSchool className="text-xs" />
                    Courses
                </span>
            </ActiveLink>
            {user && (
                <ActiveLink to="/dashboard/profile">
                    <span
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-1"
                    >
                        <LuLayoutDashboard className="text-xs" />
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
                        <CgProfile className="text-xs" />
                        My Wall
                    </span>
                </ActiveLink>
            )}
            <ActiveLink to="/about-us">
                <span
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1"
                >
                    <AiOutlineInfoCircle className="text-xs" />
                    About Us
                </span>
            </ActiveLink>
            <ActiveLink to="/legal">
                <span
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1"
                >
                    <LuScale className="text-xs" />
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
            <ActiveLink to="/support">
                <span
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1"
                >
                    <MdOutlineHelp className="text-xs" />
                    Report an Issue
                </span>
            </ActiveLink>
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
