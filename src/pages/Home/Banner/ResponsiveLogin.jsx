import { FiLogOut } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";

const ResponsiveLogin = ({ alignment }) => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then()
            .catch((error) => console.error(error));
    };

    return (
        <>
            {user && (
                <div
                    className={`lg:hidden bottom-0 flex absolute z-10 ${
                        alignment === "right" && "right-0"
                    }`}
                >
                    <div
                        onClick={handleLogOut}
                        className="btn btn-ghost font-light text-primary"
                    >
                        <div className="flex tracking-[2px] items-center gap-2">
                            <FiLogOut className="text-xl" />
                            <span className="text-md text">Sign Out</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ResponsiveLogin;
