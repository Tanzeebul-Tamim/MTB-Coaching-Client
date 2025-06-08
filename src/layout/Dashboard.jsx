import { Outlet } from "react-router-dom";
import { useState } from "react";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import SideNav from "../shared_components/SideNav/SideNav";
import RouteTracker from "../shared_components/RouteTracker";
import useScreenSize from "../hooks/useScreeSize";

const Dashboard = () => {
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const { isSmallDevice } = useScreenSize();

    return (
        <div className="relative min-h-screen">
            <RouteTracker />
            <ScrollToTop />
            <div className="flex flex-col lg:flex-row min-h-screen">
                <div
                    className={`fixed lg:static z-30 top-0 left-0 h-full w-64 max-w-full bg-base-100 shadow-lg transform transition-transform duration-500 lg:translate-x-0 ${
                        sideNavOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:w-1/4`}
                >
                    <SideNav
                        sideNavOpen={sideNavOpen}
                        setSideNavOpen={setSideNavOpen}
                    />
                </div>
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-300 ${
                        sideNavOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }`}
                    style={{ transitionProperty: "opacity, background-color" }}
                    onClick={() => sideNavOpen && setSideNavOpen(false)}
                ></div>
                <div
                    style={
                        isSmallDevice
                            ? {
                                  backgroundImage:
                                      "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url('/dashboard_banner_res.jpg')",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                  backgroundRepeat: "no-repeat",
                              }
                            : undefined
                    }
                    className="w-full lg:w-3/4 flex-1 relative overflow-y-auto lg:flex flex-col justify-center"
                >
                    {isSmallDevice ? (
                        <div className="p-3 flex flex-col h-screen">
                            <Outlet />
                        </div>
                    ) : (
                        <div
                            style={{
                                backgroundImage:
                                    "url('/dashboard_banner.avif')",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                            }}
                            className="bg-base-200 relative m-2 md:m-6 lg:m-10 p-2 md:p-4 lg:p-5 rounded-2xl min-h-[60vh]"
                        >
                            <Outlet />
                            <div className="absolute lg:bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-base-300 pointer-events-none"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
