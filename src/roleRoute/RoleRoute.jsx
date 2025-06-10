import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { getUserData } from "../api/authApi";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useScreenSize from "../hooks/useScreeSize";
import SklDashboardTitle from "../skeletons/SklDashboardTitle";

const RoleRoute = ({ allowedRole, children }) => {
    const { loading, user } = useAuth();
    const location = useLocation();
    const { isSmallDevice } = useScreenSize();
    const [userDetails, setUserDetails] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchUserDetails() {
            if (user?.email) {
                setDetailsLoading(true);
                try {
                    const data = await getUserData(user.email);
                    if (isMounted) {
                        setUserDetails(data);
                        setDetailsLoading(false);
                    }
                } catch (err) {
                    if (isMounted) {
                        setUserDetails(null);
                        setDetailsLoading(false);
                    }
                }
            } else {
                if (isMounted) {
                    setUserDetails(null);
                    setDetailsLoading(false);
                }
            }
        }

        fetchUserDetails();
        return () => {
            isMounted = false;
        };
    }, [user]);

    if (loading || detailsLoading) {
        return (
            <div>
                <div className="flex justify-center">
                    <SklDashboardTitle />
                </div>
                <div
                    style={{ height: isSmallDevice ? "90vh" : "300px" }}
                    className="flex justify-center items-center"
                >
                    <PropagateLoader
                        style={{ zIndex: 10 }}
                        color="rgb(234 198 8)"
                    />
                </div>
            </div>
        );
    }

    const userRole = userDetails?.role || "Student";
    const isAuthorized = userRole === allowedRole;

    if (userDetails && isAuthorized) {
        return children;
    }

    toast.warning("You are not authorized to access this page!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    // Use lastLocation set by RouteTracker
    const fallbackLocation =
        localStorage.getItem("lastLocation") || "/dashboard/profile";

    // Redirect to last authorized location, or fallback
    return <Navigate to={fallbackLocation} state={{ from: location }} />;
};

export default RoleRoute;
