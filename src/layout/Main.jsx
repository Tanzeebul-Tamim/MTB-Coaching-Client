import { Outlet } from "react-router-dom";
import Navbar from "../shared_components/Navbar/Navbar";
import Footer from "../shared_components/Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import RouteTracker from "../RouteTracker";

const Main = () => {
    return (
        <div className="overflow-x-hidden">
            <RouteTracker />
            <ScrollToTop></ScrollToTop>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;