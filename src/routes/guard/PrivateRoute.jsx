import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from "react-spinners";
import useAuth from "../../hooks/useAuth";
import useDarkTheme from "../../hooks/useDarkTheme";
import { light, dark } from "../../styles/colors.json";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const location = useLocation();
    const isDarkTheme = useDarkTheme();
    const navigate = useNavigate();

    const lightPrimary = light.primary;
    const darkPrimary = dark.primary;
    const color = isDarkTheme ? darkPrimary : lightPrimary;

    useEffect(() => {
        if (!loading && !user) {
            // Replace the current entry in history with login
            navigate("/login", {
                replace: true,
                state: { from: location, showToast: true },
            });
        }
    }, [loading, user, navigate, location]);

    if (loading) {
        return (
            <div className="h-[100vh] min-h-full bg-base-100">
                <div
                    style={{ height: "700px" }}
                    className="flex justify-center items-center"
                >
                    <PropagateLoader color={color} />
                </div>
            </div>
        );
    }

     if (!user) return null; // Wait for redirect

    return children;
};

export default PrivateRoute;
