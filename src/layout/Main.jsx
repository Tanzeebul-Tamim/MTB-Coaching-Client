import { Outlet } from "react-router-dom";
import ScrollToTop from "../routes/utils/Scroll/ScrollToTop";
import RouteTracker from "../routes/utils/RouteTracker/RouteTracker";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import useNetworkStatus from "../hooks/useNetworkStatus";
import InstallPWAButton from "../components/ui/InstallPWAButton";
import NoInternetPage from "../components/pages/NoInternetPage";

const Main = () => {
    const { isOnline } = useNetworkStatus();

    if (!isOnline) {
        return <NoInternetPage />;
    }

    return (
        <div className="overflow-x-hidden">
            <RouteTracker />
            <ScrollToTop />
            <Navbar />
            <Outlet />
            <Footer />
            <InstallPWAButton />
        </div>
    );
};

export default Main;
