import { Outlet } from "react-router-dom";
import Navbar from "../shared_components/Navbar/Navbar";
import Footer from "../shared_components/Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import RouteTracker from "../shared_components/RouteTracker/RouteTracker";
import useNetworkStatus from "../hooks/useNetworkStatus";
import NoInternetPage from "../shared_components/NoInternetPage/NoInternetPage";
import InstallPWAButton from "../reusable/InstallPWAButton";

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
