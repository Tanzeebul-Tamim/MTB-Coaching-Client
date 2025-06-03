import { SlNote } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FiLogIn, FiLogOut } from "react-icons/fi";

const ResponsiveLogin = ({ alignment }) => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then()
            .catch((error) => console.error(error));
    };

    return (
        <>
            {user ? (
                <div
                    className={`lg:hidden bottom-0 flex absolute z-10 ${
                        alignment === "right" && "right-0"
                    }`}
                >
                    <div
                        onClick={handleLogOut}
                        className="btn btn-ghost font-light text-yellow-400"
                    >
                        <div className="flex tracking-[2px] items-center gap-2">
                            <FiLogOut className="text-xl" />
                            <span className="text-md text">Logout</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={`lg:hidden bottom-0 flex absolute z-10 ${
                        alignment == "right" && "right-0"
                    }`}
                >
                    <Link
                        to="/login"
                        className="btn btn-ghost font-light text-yellow-400"
                    >
                        <div className="flex tracking-[2px] items-center gap-2">
                            <FiLogIn className="text-xl" />
                            <span className="text-md">Login</span>
                        </div>
                    </Link>
                    <Link to="/register" className="btn btn-ghost font-light">
                        <div className="flex tracking-[2px] items-center gap-2">
                            <SlNote className="text-md text-white" />
                            <span className="text-md text-white">Register</span>
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
};

export default ResponsiveLogin;
