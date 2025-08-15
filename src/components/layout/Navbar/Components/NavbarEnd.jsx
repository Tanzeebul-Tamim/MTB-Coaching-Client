import { FiLogIn, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import { GiTeacher } from "react-icons/gi";

const NavbarEnd = ({ props }) => {
    const {
        user,
        handleLogOut,
        userDetails,
        userLoading,
        userBookings,
        loading,
        location,
    } = props;

    return user ? (
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
                data-tip="My Profile"
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
                                    ? "/assets/images/user_avatar.png"
                                    : userDetails?.image || user?.photoURL
                                    ? userDetails?.image || user?.photoURL
                                    : "/assets/images/user_avatar.png"
                            }
                        />
                        {userBookings.length >= 1 && (
                            <span className="badge flex gap-1 badge-md badge-secondary title indicator-item dark:text-gray-800 text-yellow-50">
                                <MdShoppingCart className="text-lg" />
                                <span>{userBookings?.length}</span>
                            </span>
                        )}
                    </div>
                    <h1 className="dark:text-secondary text-primary text-sm mt-1">
                        {userDetails?.name?.split(" ")[0] ||
                            user?.displayName?.split(" ")[0]}
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
    );
};

export default NavbarEnd;
