import { Outlet } from "react-router-dom";
import ScrollToTop from "../routes/utils/Scroll/ScrollToTop";
import RouteTracker from "../routes/utils/RouteTracker/RouteTracker";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import InstallPWAButton from "../components/ui/InstallPWAButton";
import NoInternetPage from "../components/pages/NoInternetPage";
import SplashScreen from "../components/pages/SplashScreen";
import useLayout from "./useLayout";

const Main = () => {
    const {
        isOnline,
        authenticationPage,
        splashShown,
        splashDuration,
        setLogoLoaded,
    } = useLayout();

    if (!isOnline) {
        return <NoInternetPage />;
    }

    return (
        <>
            <div className={!authenticationPage && "overflow-x-hidden"}>
                <RouteTracker />
                <ScrollToTop />
                <Navbar authenticationPage={authenticationPage} />
                <Outlet />
                {!authenticationPage && <Footer />}
                <InstallPWAButton />
                {!splashShown && (
                    <SplashScreen
                        onLogoLoaded={() => setLogoLoaded(true)}
                        duration={splashDuration}
                    />
                )}
            </div>
        </>
    );
};

export default Main;
