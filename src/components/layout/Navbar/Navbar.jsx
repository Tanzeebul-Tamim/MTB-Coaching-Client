import { CgMenuGridO, CgProfile } from "react-icons/cg";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { SlNote } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineHelp, MdOutlineSchool, MdShoppingCart } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { LuLayoutDashboard, LuScale } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getBookedClasses } from "../../../api/bookApi";
import useAuth from "../../../hooks/useAuth";
import useUserData from "../../../hooks/useUserData";
import useDarkTheme from "../../../hooks/useDarkTheme";
import ActiveLink from "../../ui/ActiveLink";
import "../../../styles/navbar.css";
import ThemeToggle from "../../ui/ThemeToggle/ThemeToggle";

const Navbar = () => {
    const isDarkTheme = useDarkTheme();

    const [open, setOpen] = useState(false);
    const { user, logOut, loading, booking } = useAuth();
    const [userBookings, setUserBookings] = useState([]);
    const location = useLocation();
    const checkPrivatePath =
        location.pathname === "/" ||
        location.pathname === "/instructors" ||
        location.pathname === "/classes" ||
        location.pathname === "/legal" ||
        location.pathname === "/about-us";

    if (!user && checkPrivatePath) {
        localStorage.setItem("location", location.pathname);
    }

    const { userDetails, setUserDetails, loading: userLoading } = useUserData();
    const myWallRoute = `/instructors/${userDetails?._id}`;

    useEffect(() => {
        if (user && user.email && userDetails?._id) {
            getBookedClasses(userDetails?._id)
                .then((data) => {
                    const filteredBookings = data.filter(
                        (booking) => booking.paymentStatus === "unpaid"
                    );
                    setUserBookings(filteredBookings);
                })
                .catch((error) => console.error(error));
        } else if (!user) {
            setUserDetails({});
            setUserBookings([]);
        }
    }, [user, userDetails?._id, booking, setUserDetails]);

    const handleLogOut = () => {
        logOut()
            .then()
            .catch((error) => console.error(error));
    };

    const navRef = useRef(null);

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
    }, [open]);

    const customColor = "text-secondary";

    return (
        <div className="from-transparent to-black bg-gradient-to-t fixed z-[1500] gap-5 navbar px-5 lg:px-10 lg:py-8 transition ease-in-out">
            <div className="navbar-start gap-1 lg:gap-6 flex items-center">
                <div
                    style={{ transition: "right 0.3s ease-in-out" }}
                    ref={navRef}
                    className={`mt-4 flex flex-col bg-opacity-70 absolute duration-300 uppercase ${
                        open ? "top-10 right-5" : "top-10 -right-[150px]"
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
                                    location.pathname === myWallRoute &&
                                    "text-primary"
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
                    <ActiveLink
                        customColor={customColor}
                        to="/instructor-register"
                    >
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
                <Link to="/">
                    <img
                        className="lg:w-[400px] hover:scale-110 duration-200 transition-transform"
                        src={`/assets/MTB_Coaching_${
                            isDarkTheme ? "Dark" : "Light"
                        }.png`}
                        alt="Logo"
                    />
                </Link>
            </div>

            <div className="navbar-center uppercase lg:block hidden">
                <div className="flex nav-btn glow-effect py-3 px-6 rounded-full gap-5 tracking-[2px] text-xl items-center">
                    <ActiveLink dark={true} to="/">
                        <div>Home</div>
                    </ActiveLink>
                    <ActiveLink dark={true} to="/instructors">
                        <div>Instructors</div>
                    </ActiveLink>
                    <ActiveLink dark={true} to="/classes">
                        <div>Courses</div>
                    </ActiveLink>
                    <ActiveLink dark={true} to="/about-us">
                        <div>About Us</div>
                    </ActiveLink>
                    {user && (
                        <ActiveLink dark={true} to="/dashboard/profile">
                            <div>Dashboard</div>
                        </ActiveLink>
                    )}
                    {userDetails?.role === "Instructor" && (
                        <ActiveLink dark={true} to={myWallRoute}>
                            <div
                                className={
                                    location.pathname === myWallRoute &&
                                    "text-primary"
                                }
                            >
                                My Wall
                            </div>
                        </ActiveLink>
                    )}
                    <ThemeToggle />
                </div>
            </div>
            {user ? (
                <div className="navbar-end uppercase gap-7 lg:flex hidden">
                    <button
                        onClick={handleLogOut}
                        className="hover:scale-110 duration-200 transition-transform text-primary font-light text-xl"
                    >
                        <div className="flex tracking-[2px] items-center gap-2">
                            <FiLogOut />
                            <span className="text-xl uppercase">Logout</span>
                        </div>
                    </button>
                    <Link
                        to="/dashboard/profile"
                        data-tip={userDetails?.name || user?.displayName}
                        className="tooltip tooltip-bottom tooltip-primary hover:scale-110 duration-500 transition-transform"
                    >
                        <div className="flex flex-col items-center">
                            <div className="indicator">
                                <img
                                    className={`rounded-full glow-effect custom-cursor-pointer w-[55px] h-[55px] ${
                                        userLoading && "animate-pulse"
                                    }`}
                                    src={
                                        userLoading
                                            ? "/assets/user_avatar.png"
                                            : userDetails?.image ||
                                              user?.photoURL
                                            ? userDetails?.image ||
                                              user?.photoURL
                                            : "/assets/user_avatar.png"
                                    }
                                />
                                {userBookings.length >= 1 && (
                                    <span className="badge flex gap-1 badge-md badge-secondary title indicator-item dark:text-gray-800 text-yellow-50">
                                        <MdShoppingCart className="text-lg" />
                                        <span>{userBookings?.length}</span>
                                    </span>
                                )}
                            </div>
                            <h1 className="dark:text-secondary text-primary text-sm">
                                My Profile
                            </h1>
                        </div>
                    </Link>
                </div>
            ) : loading ? (
                // Login-Logout button skeleton
                <div className="navbar-end uppercase gap-5 lg:flex hidden animate-pulse">
                    <div className="h-6 bg-gray-200 rounded-md w-1/6"></div>
                    <div className="h-6 bg-gray-200 rounded-md w-1/6"></div>
                </div>
            ) : (
                <div className="navbar-end uppercase gap-5 lg:flex hidden">
                    {location.pathname !== "/login" && (
                        <Link
                            to="/login"
                            className="font-light text-primary text-xl hover:scale-110 duration-200 transition-transform"
                        >
                            <div className="flex tracking-[2px] items-center gap-2">
                                <FiLogIn />
                                <span className="text-xl">Login</span>
                            </div>
                        </Link>
                    )}
                    {location.pathname !== "/register" && (
                        <Link
                            to="/register"
                            className={`${
                                location.pathname === "/login"
                                    ? "text-primary"
                                    : "text-accent"
                            } font-light text-xl hover:scale-110 duration-200 transition-transform`}
                        >
                            <div className="flex tracking-[2px] items-center gap-2">
                                <SlNote />
                                <span className="text-xl">Register</span>
                            </div>
                        </Link>
                    )}
                    {(location.pathname === "/register" ||
                        location.pathname === "/login") && (
                        <Link
                            to="/instructor-register"
                            className="text-accent font-light text-xl hover:scale-110 duration-200 transition-transform"
                        >
                            <div className="flex tracking-[2px] items-center gap-2">
                                <GiTeacher />
                                <span className="text-xl">Apply Now</span>
                            </div>
                        </Link>
                    )}
                </div>
            )}
            <div className="navbar-end flex gap-2 lg:hidden">
                {user ? (
                    <Link
                        to="/dashboard/profile"
                        data-tip={userDetails?.name || user?.displayName}
                        className="tooltip tooltip-bottom tooltip-primary"
                    >
                        {userBookings.length >= 1 && (
                            <span className="absolute right-[8.5vw] -top-[1vw] badge flex gap-[2px] badge-md badge-secondary dark:text-gray-800 text-yellow-50 title indicator-item">
                                <MdShoppingCart />
                                <span className="text-[0.65rem]">
                                    {userBookings?.length}
                                </span>
                            </span>
                        )}
                        <img
                            className={`h-[42.5px] w-[42.5px] rounded-full ${
                                userLoading && "animate-pulse"
                            }`}
                            src={
                                userLoading
                                    ? "/assets/user_avatar.png"
                                    : userDetails?.image || user?.photoURL
                                    ? userDetails?.image || user?.photoURL
                                    : "/assets/user_avatar.png"
                            }
                            alt=""
                        />
                    </Link>
                ) : loading ? (
                    <div>
                        <img
                            className="h-[42.5px] w-[42.5px] rounded-full animate-pulse"
                            src="/assets/user_avatar.png"
                            alt=""
                        />
                    </div>
                ) : (
                    ""
                )}
                <div className="relative w-8 h-8 flex items-center justify-center custom-cursor-pointer text-2xl">
                    <span
                        onClick={() => setOpen(!open)}
                        className={`absolute transition-opacity duration-500 ease-in-out ${
                            open
                                ? "opacity-0 pointer-events-none"
                                : "opacity-100"
                        }`}
                        style={{ transitionProperty: "opacity" }}
                    >
                        <CgMenuGridO className="text-[#f5f3f0]" />
                    </span>
                    <span
                        className={`absolute transition-opacity duration-500 ease-in-out ${
                            open
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                        }`}
                        style={{ transitionProperty: "opacity" }}
                    >
                        <IoMdClose className="text-[#f5f3f0]" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
