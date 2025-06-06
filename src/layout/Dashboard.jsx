import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import SideNav from "../shared_components/SideNav/SideNav";
import RouteTracker from "../shared_components/RouteTracker";

const Dashboard = () => {
  return (
    <div className="relative">
      <RouteTracker/>
      <ScrollToTop />
      <div className="flex">
        <SideNav />
        <div className="w-3/4 absolute right-0 overflow-y-auto">
          <div
            style={{
              backgroundImage:
                "url('/dashboard_banner.avif')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="bg-base-200 relative m-10 p-5 rounded-2xl"
          >
            <Outlet></Outlet>
            <div className="absolute lg:bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-base-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
