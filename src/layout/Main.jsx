import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../routes/utils/Scroll/ScrollToTop";
import RouteTracker from "../routes/utils/RouteTracker/RouteTracker";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import useNetworkStatus from "../hooks/useNetworkStatus";
import InstallPWAButton from "../components/ui/InstallPWAButton";
import NoInternetPage from "../components/pages/NoInternetPage";
import { useEffect } from "react";

const Main = () => {
    const { isOnline } = useNetworkStatus();
    const { pathname } = useLocation();
    const authenticationPage = [
        "/login",
        "/register",
        "/instructor-register",
    ].includes(pathname);

    // Remove scrollbar from authentication pages
    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        if (authenticationPage) {
            root.classList.add("no-scrollbar");
            body.classList.add("no-scrollbar");
        } else {
            root.classList.remove("no-scrollbar");
            body.classList.remove("no-scrollbar");
        }
    }, [authenticationPage, pathname]);

    if (!isOnline) {
        return <NoInternetPage />;
    }

    return (
        <div className={!authenticationPage && "overflow-x-hidden"}>
            <RouteTracker />
            <ScrollToTop />
            <Navbar />
            <Outlet />
            {!authenticationPage && <Footer />}
            <InstallPWAButton />
        </div>
    );
};

export default Main;
