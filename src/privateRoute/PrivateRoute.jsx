import { Navigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const location = useLocation();
    const heightCondition = location.pathname.includes("/dashboard");

    if (loading) {
        return (
            <div
                style={
                    heightCondition ? { height: "400px" } : { height: "700px" }
                }
                className="flex justify-center items-center"
            >
                <PropagateLoader color="rgb(234 179 8)" />
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                state={{ from: location, showToast: true }}
                to="/login"
            ></Navigate>
        );
    }

    return children;
};

export default PrivateRoute;
