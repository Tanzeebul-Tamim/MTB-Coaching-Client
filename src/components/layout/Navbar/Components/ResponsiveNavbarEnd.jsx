import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

const ResponsiveNavbarEnd = ({ props }) => {
    const { user, userBookings, userDetails, userLoading, loading, location } =
        props;

    const name = userDetails
        ? userDetails?.name?.split(" ")[0]
        : user?.displayName?.split(" ")[0];

    return (
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
                    <div className="relative">
                        <img
                            className={`h-[42.5px] w-[42.5px] rounded-full relative ${
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
                        <h1 className="dark:text-secondary text-primary text-xs absolute right-2">
                            {name}
                        </h1>
                    </div>
                </Link>
            ) : loading ? (
                <div>
                    <img
                        className="h-[42.5px] w-[42.5px] rounded-full animate-pulse"
                        src="/assets/user_avatar.png"
                        alt=""
                    />
                </div>
            ) : location.pathname === "/login" ? (
                <Link
                    to="/register"
                    className="btn btn-ghost font-light text-primary p-0"
                >
                    <div className="flex tracking-[1px] items-center gap-1">
                        <FiLogOut className="text-sm" />
                        <span className="text-sm text">Sign Up</span>
                    </div>
                </Link>
            ) : (
                <Link
                    to="/login"
                    className="btn btn-ghost font-light text-primary p-0"
                >
                    <div className="flex tracking-[1px] items-center gap-1">
                        <FiLogOut className="text-sm" />
                        <span className="text-sm text">Sign In</span>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default ResponsiveNavbarEnd;
