import { useEffect, useState } from "react";
import useScreenSize from "../hooks/useScreenSize";
import useNetworkStatus from "../hooks/useNetworkStatus";
import { useLocation } from "react-router-dom";
import useDarkTheme from "../hooks/useDarkTheme";

const useLayout = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const [logoLoaded, setLogoLoaded] = useState(false);

    const { pathname } = useLocation();
    const { isOnline } = useNetworkStatus();

    const isDarkTheme = useDarkTheme();
    const { isSmallDevice, splashShown, setSplashShown, splashDuration } =
        useScreenSize();

    const validLocations = ["/profile", "/payment/", "/add-class"];
    const isValidLocation = validLocations.some((validLocation) =>
        pathname.includes(validLocation)
    );
    const url = "url('/assets/images/dashboard_banner_res.jpg')";
    const lightBg =
        "linear-gradient(rgba(50, 40, 20, 0.4), rgba(60, 50, 30, 0.3)), " + url;
    const darkBg = "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), " + url;
    const bg = isDarkTheme ? darkBg : lightBg;
    const checkDark = () => document.documentElement.classList.contains("dark");
    const authenticationPage = [
        "/login",
        "/register",
        "/instructor-register",
    ].includes(pathname);

    const toggleShowSplash = () =>
        setTimeout(() => {
            setSplashShown(true);
        }, splashDuration);

    useEffect(() => {
        if (!logoLoaded) return;
        // Wait until dark class is present
        if (checkDark()) {
            toggleShowSplash();
        } else {
            const interval = setInterval(() => {
                if (checkDark()) {
                    toggleShowSplash();
                    clearInterval(interval);
                }
            }, 10);
            return () => clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logoLoaded]);

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

    return {
        sideNavOpen,
        setSideNavOpen,
        isSmallDevice,
        isOnline,
        isValidLocation,
        bg,
        isDarkTheme,
        setLogoLoaded,
        splashShown,
        splashDuration,
        authenticationPage,
    };
};

export default useLayout;
