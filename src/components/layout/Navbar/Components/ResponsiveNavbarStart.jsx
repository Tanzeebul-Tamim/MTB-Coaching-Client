import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

const ResponsiveNavbarStart = ({ props }) => {
    const { user, userBookings, userDetails, userLoading, loading, location } =
        props;

    const name = userDetails
        ? userDetails?.name?.split(" ")[0]
        : user?.displayName?.split(" ")[0];

    return (
        <div className="navbar-start relative">
            {user ? (
                <Link
                    to="/dashboard/profile"
                    data-tip={userDetails?.name || user?.displayName}
                    className="tooltip tooltip-bottom tooltip-primary absolute -top-4"
                >
                    {userBookings.length >= 1 && (
                        <span className="absolute left-[7vw] -top-[1.5vw] badge flex gap-[3px] badge-sm badge-secondary dark:text-gray-800 text-yellow-50 title indicator-item">
                            <MdShoppingCart />
                            <span className="text-[0.65rem] font-bold">
                                {userBookings?.length}
                            </span>
                        </span>
                    )}
                    <img
                        className={`h-[45px] w-[45px] rounded-full ${
                            userLoading && "animate-pulse"
                        }`}
                        src={
                            userLoading
                                ? "/assets/images/user_avatar.png"
                                : userDetails?.image || user?.photoURL
                                ? userDetails?.image || user?.photoURL
                                : "/assets/images/user_avatar.png"
                        }
                        alt=""
                    />
                    <h1 className="dark:text-secondary text-primary text-xs">
                        {name}
                    </h1>
                </Link>
            ) : loading ? (
                <div>
                    <img
                        className="h-[45px] w-[45px] rounded-full animate-pulse"
                        src="/assets/images/user_avatar.png"
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

export default ResponsiveNavbarStart;
