import { Link as RouterLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import LeafletMap from "./LeafletMap/LeafletMap";
import scrollWithOffset from "../../../routes/utils/Scroll/ScrollWithOffset";
import useScreenSize from "../../../hooks/useScreenSize";
import SendMessage from "./SendMessage/SendMessage";

const Footer = () => {
    const location = useLocation();
    const { isSmallDevice } = useScreenSize();
    const bgLocations =
        location.pathname == "/instructors" || location.pathname == "/classes";

    return (
        <div
            style={{
                backgroundImage: bgLocations
                    ? "linear-gradient(rgba(0, 0, 0, 0.600), rgba(0, 0, 0, 0.400)), url('/assets/footer.avif')"
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
                <div>
                    <span className="uppercase text-lg lg:text-xl text-secondary">
                        Our Location
                    </span>
                    <LeafletMap></LeafletMap>
                </div>
                <div>
                    <span className="uppercase text-lg lg:text-xl text-secondary">
                        Opening Hours
                    </span>
                    <span className="text-sm description">
                        Monday - Friday: 8:00 AM - 10:00 PM
                    </span>
                    <span className="text-sm description">
                        Saturday: 10:00 AM - 11:00 PM
                    </span>
                    <span className="text-sm description">
                        Sunday: 12:00 PM - 9:00 PM
                    </span>
                </div>
                <div>
                    <span className="uppercase text-lg lg:text-xl text-secondary">
                        Contact Us
                    </span>
                    <span className="text-sm description">
                        Autoweg, 3911 TL Rhenen,
                        <br />
                        Netherlands
                    </span>
                    <span className="text-sm description">
                        {" "}
                        Phone: +31644460635
                    </span>
                    <span className="text-sm description">
                        Email:{" "}
                        <a
                            className="underline"
                            id="email"
                            href="mailto:tanzeebul.tamim2003@gmail.com"
                        >
                            info@mtb_club.com
                        </a>
                    </span>
                </div>
                {!isSmallDevice && <SendMessage bgLocations={bgLocations} />}
                <div>
                    <RouterLink
                        to="/support"
                        className="uppercase text-lg lg:text-xl text-secondary"
                    >
                        FAQ & Support
                    </RouterLink>
                    <HashLink
                        smooth
                        to="/support#getting-started"
                        scroll={scrollWithOffset}
                        className="text-sm description link link-hover"
                    >
                        Getting Started
                    </HashLink>
                    <HashLink
                        smooth
                        to="/support#troubleshooting"
                        scroll={scrollWithOffset}
                        className="text-sm description link link-hover"
                    >
                        Troubleshooting
                    </HashLink>
                    <HashLink
                        smooth
                        to="/support#account-data"
                        scroll={scrollWithOffset}
                        className="text-sm description link link-hover"
                    >
                        Account & Data
                    </HashLink>
                    <HashLink
                        smooth
                        to="/support#contact-support"
                        scroll={scrollWithOffset}
                        className="text-sm description link link-hover"
                    >
                        Contact Support
                    </HashLink>
                </div>
                <div>
                    <RouterLink
                        to="/legal"
                        className="uppercase text-lg lg:text-xl text-secondary"
                    >
                        Legal
                    </RouterLink>
                    <HashLink
                        smooth
                        to="/legal#privacy-policy"
                        scroll={scrollWithOffset}
                        className="text-sm description link link-hover"
                    >
                        Privacy Policy
                    </HashLink>
                    <HashLink
                        smooth
                        to="/legal#terms"
                        scroll={scrollWithOffset}
                        className="text-sm description link link-hover"
                    >
                        Terms of Service
                    </HashLink>
                    <HashLink
                        smooth
                        to="/legal#data-deletion"
                        scroll={scrollWithOffset}
                        className="text-sm description link link-hover"
                    >
                        User data deletion
                    </HashLink>
                    <HashLink
                        smooth
                        to="/legal#cookie"
                        scroll={scrollWithOffset}
                        className="text-sm description link link-hover"
                    >
                        Cookie Notice
                    </HashLink>
                </div>
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
                <div className="items-center grid-flow-col">
                    <img style={{ height: "60px" }} src="/favicon.png" alt="" />
                    <p className="text-sm description">
                        MTB Coaching Network Ltd. <br /> Delivering exceptional
                        services since 2006.
                    </p>
                </div>
                <div
                    className={`flex flex-col ${
                        !isSmallDevice && "items-center"
                    } text-xs`}
                >
                    <h4 className="lg:text-md lg:tracking-widest">
                        This website is for educational purposes only and is not
                        affiliated with any official organizations or
                        institutions.
                    </h4>
                    <h4 className="lg:text-md lg:tracking-widest">
                        &copy; 2023-{new Date().getFullYear()} MTB Coaching
                        Network - All Rights Reserved
                        {isSmallDevice ? (
                            <>
                                <br />
                            </>
                        ) : (
                            ` - `
                        )}
                        Designed & Developed by
                        <a
                            href="https://github.com/Tanzeebul-Tamim"
                            className="uppercase ms-1 font-bold text-secondary underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Tanzeebul Tamim
                        </a>
                    </h4>
                </div>
                <div className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <a
                            href="https://x.com/tanzeebul"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="fill-current h-6 w-6"
                            >
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a
                            href="https://www.youtube.com/@tanzeebultamim9068"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="fill-current h-6 w-6"
                            >
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a
                            href="https://www.facebook.com/tanzeebul.tamim.1/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="fill-current h-6 w-6"
                            >
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
