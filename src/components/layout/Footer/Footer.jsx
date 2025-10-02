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
                <div>
                    <span className="uppercase text-lg lg:text-xl text-secondary">
                        Our Location
                    </span>
                    <LeafletMap smallDevice={isSmallDevice}></LeafletMap>
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
                        <a
                            href="https://www.google.com/maps/place/MTB+route,+rhenen/@51.972747,5.5471453,16z/data=!4m10!1m2!2m1!1smountain+bike+trail!3m6!1s0x47c654097f4e5ef1:0x2691c597450a599b!8m2!3d51.972747!4d5.5566725!15sChNtb3VudGFpbiBiaWtlIHRyYWlsWhUiE21vdW50YWluIGJpa2UgdHJhaWySAQ5zcG9ydHNfY29tcGxleJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VNMWR6UlRhRFpCUlJBQqoBaAoIL20vMDE5OWcKCC9tLzBfbWpwEAEqFyITbW91bnRhaW4gYmlrZSB0cmFpbCgAMh4QASIaVSV2fnus8nDHm1tfIzap4DhCiohlFPsxWzwyFxACIhNtb3VudGFpbiBiaWtlIHRyYWls4AEA-gEECAAQGg!16s%2Fg%2F11dybfjq3d?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            Autoweg, 3911 TL Rhenen,
                            <br />
                            Netherlands
                        </a>
                    </span>
                    <span className="text-sm description">
                        Phone:{" "}
                        <a
                            className="hover:underline"
                            id="email"
                            href="https://wa.me/31644460635"
                        >
                            +31644460635
                        </a>
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
                        className="text-sm description hover:underline"
                    >
                        Getting Started
                    </HashLink>
                    <HashLink
                        smooth
                        to="/support#troubleshooting"
                        scroll={scrollWithOffset}
                        className="text-sm description hover:underline"
                    >
                        Troubleshooting
                    </HashLink>
                    <HashLink
                        smooth
                        to="/support#account-data"
                        scroll={scrollWithOffset}
                        className="text-sm description hover:underline"
                    >
                        Account & Data
                    </HashLink>
                    <HashLink
                        smooth
                        to="/support#contact-support"
                        scroll={scrollWithOffset}
                        className="text-sm description hover:underline"
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
                        className="text-sm description hover:underline"
                    >
                        Privacy Policy
                    </HashLink>
                    <HashLink
                        smooth
                        to="/legal#terms"
                        scroll={scrollWithOffset}
                        className="text-sm description hover:underline"
                    >
                        Terms of Service
                    </HashLink>
                    <HashLink
                        smooth
                        to="/legal#data-deletion"
                        scroll={scrollWithOffset}
                        className="text-sm description hover:underline"
                    >
                        User data deletion
                    </HashLink>
                    <HashLink
                        smooth
                        to="/legal#cookie"
                        scroll={scrollWithOffset}
                        className="text-sm description hover:underline"
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
                            href="https://wa.me/31644460635"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="fill-current h-7 w-7"
                            >
                                <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.61.845 5.028 2.272 7.002L4 29l7.169-2.24A11.923 11.923 0 0 0 16.001 27c6.627 0 12-5.373 12-12s-5.373-12-12-12zm0 21.818a9.793 9.793 0 0 1-5.001-1.366l-.357-.212-4.257 1.33 1.39-4.15-.232-.369A9.776 9.776 0 0 1 6.182 15c0-5.416 4.403-9.818 9.819-9.818S25.818 9.584 25.818 15 21.417 24.818 16 24.818zm5.401-7.317c-.295-.148-1.74-.859-2.011-.956-.27-.099-.467-.148-.664.148s-.762.957-.934 1.154c-.173.197-.345.222-.64.074-.295-.148-1.248-.46-2.377-1.466-.879-.783-1.472-1.75-1.645-2.046-.173-.296-.018-.456.13-.604.133-.133.295-.346.443-.519.148-.173.197-.296.295-.494.099-.197.049-.37-.025-.519-.074-.148-.664-1.604-.91-2.2-.24-.58-.484-.5-.664-.51l-.567-.01c-.197 0-.519.074-.791.37s-1.04 1.016-1.04 2.478 1.064 2.875 1.213 3.074c.148.197 2.094 3.2 5.077 4.487.709.306 1.262.489 1.694.626.711.227 1.358.195 1.87.118.57-.085 1.74-.712 1.986-1.4.246-.689.246-1.28.172-1.4-.074-.123-.27-.197-.565-.345z" />
                            </svg>
                        </a>

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
