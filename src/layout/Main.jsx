import { Outlet } from "react-router-dom";
import ScrollToTop from "../routes/utils/Scroll/ScrollToTop";
import RouteTracker from "../routes/utils/RouteTracker/RouteTracker";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import useNetworkStatus from "../hooks/useNetworkStatus";
import NoInternetPage from "../components/pages/NoInternetPage/NoInternetPage";
import InstallPWAButton from "../components/ui/InstallPWAButton";

const Main = () => {
    const { isOnline } = useNetworkStatus();

    if (!isOnline) {
        return <NoInternetPage />;
    }

    return (
        <div className="overflow-x-hidden">
            <RouteTracker />
            <ScrollToTop></ScrollToTop>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <InstallPWAButton />
        </div>
    );
};

export default Main;
