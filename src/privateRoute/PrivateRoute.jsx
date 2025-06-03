import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProvider";
import { PropagateLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div
                style={{ height: "700px" }}
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
