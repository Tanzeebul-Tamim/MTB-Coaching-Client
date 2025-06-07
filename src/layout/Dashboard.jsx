import { Outlet } from "react-router-dom";
import { useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";
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

            <button
                className={`lg:hidden fixed top-4 right-4 z-30 text-yellow-400 bg-base-200 rounded-full outline outline-2 outline-yellow-700 h-8 w-8 shadow-md flex items-center justify-center transition-transform duration-300 ${
                    sideNavOpen ? "rotate-180" : "rotate-0"
                }`}
                onClick={() => setSideNavOpen((open) => !open)}
                aria-label="Toggle navigation"
            >
                <RiArrowRightDoubleFill
                    className={`text-3xl transition-transform duration-300 ${
                        sideNavOpen ? "scale-110" : "scale-100"
                    }`}
                    style={{ transitionProperty: "transform" }}
                />
            </button>
            <div className="flex flex-col lg:flex-row min-h-screen">
                <div
                    className={`fixed lg:static z-30 top-0 left-0 h-full w-64 max-w-full bg-base-100 shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
                        sideNavOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:w-1/4`}
                >
                    <SideNav setSideNavOpen={setSideNavOpen} />
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
                <div className="w-full lg:w-3/4 flex-1 relative overflow-y-auto">
                    {isSmallDevice ? (
                        <div>
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
