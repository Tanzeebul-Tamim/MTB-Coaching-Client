import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// List of restricted dashboard routes
const restrictedPatterns = [
  /^\/dashboard\/selected-classes/,
  /^\/dashboard\/payment\//,
  /^\/dashboard\/enrolled-classes/,
  /^\/dashboard\/payment$/,
  /^\/dashboard\/add-class/,
  /^\/dashboard\/my-classes/
];

function isRestricted(pathname) {
  return restrictedPatterns.some((pattern) => pattern.test(pathname));
}

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (!isRestricted(location.pathname)) {
      localStorage.setItem("lastLocation", location.pathname);
    }
  }, [location]);

  return null;
};

export default RouteTracker;
