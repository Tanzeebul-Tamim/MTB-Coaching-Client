import { useLocation } from "react-router-dom";
import useScreenSize from "../../../hooks/useScreenSize";
import SendMessage from "./Components/SendMessage/SendMessage";
import OurLocation from "./Components/OurLocation";
import OpeningHours from "./Components/OpeningHours";
import ContactUs from "./Components/ContactUs";
import Support from "./Components/Support";
import Legal from "./Components/Legal";
import Branding from "./Components/Branding";
import Notice from "./Components/Notice";
import Socials from "./Components/Socials";

const Footer = () => {
    const location = useLocation();
    const { isSmallDevice } = useScreenSize();
    const bgLocations =
        location.pathname == "/instructors" || location.pathname == "/classes";

    return (
        <div
            style={{
                backgroundImage: bgLocations
                    ? "linear-gradient(rgba(0, 0, 0, 0.600), rgba(0, 0, 0, 0.400)), url('/assets/images/footer.avif')"
                    : "none",
                backgroundPosition: isSmallDevice ? "70% 50%" : "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className="relative bg-gradient-to-t from-base-200 to-base-300"
        >
            <footer
                className={`footer p-10 bg-transparent ${
                    bgLocations ? "text-white" : "text-base-content"
                }`}
            >
                <OurLocation isSmallDevice={isSmallDevice} />
                <OpeningHours />
                <ContactUs />
                {!isSmallDevice && <SendMessage bgLocations={bgLocations} />}
                <Support />
                <Legal />
                {isSmallDevice && <SendMessage bgLocations={bgLocations} />}
            </footer>
            <div className="flex justify-center">
                <hr
                    className={`border-1 ${
                        bgLocations ? "border-white" : "border-base-content"
                    } dark:border-opacity-50 border-opacity-50 w-[95%]`}
                ></hr>
            </div>
            <footer
                className={`footer px-10 py-6 bg-transparent ${
                    bgLocations ? "text-white" : "text-base-content"
                }`}
            >
                <Branding />
                <Notice isSmallDevice={isSmallDevice} />
                <Socials />
            </footer>
        </div>
    );
};

export default Footer;
