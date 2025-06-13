import useTitle from "../../hooks/useTitle";
import { HashLink } from "react-router-hash-link";
import scrollWithOffset from "../../ScrollToTop/ScrollWithOffset";
import useScreenSize from "../../hooks/useScreenSize";

const Legal = () => {
    useTitle("| Legal");
    const { isSmallDevice } = useScreenSize();

    return (
        <div
            className="lg:pt-40 pt-20 lg:pb-24 pb-12 lg:px-10 relative min-h-screen"
            style={{
                backgroundImage: "url('/legal.avif')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: isSmallDevice ? "65% 50%" : "center",
                backgroundAttachment: isSmallDevice && "fixed",
            }}
        >
            <div className="relative z-20">
                <div className="text-lg text-black dark:text-white flex flex-col lg:gap-8 gap-5 text-center description max-w-[90%] mx-3 md:mx-auto bg-base-200 dark:bg-base-100 bg-opacity-70 dark:bg-opacity-60 md:p-10 p-6 rounded-2xl shadow-2xl border border-secondary">
                    <h1
                        style={{
                            letterSpacing: isSmallDevice ? "0.2em" : "0.7em",
                        }}
                        className="z-[10] title font-extrabold text-primary text-xl md:text-4xl md:mb-8 text-center uppercase tracking-widest drop-shadow-lg"
                    >
                        Legal Information
                    </h1>
                    <p className="lg:mb-2 mb-1 text-sm md:text-lg leading-relaxed text">
                        This website is a personal practice project built by{" "}
                        <a
                            href="https://github.com/Tanzeebul-Tamim"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-800 dark:text-yellow-200 dark:hover:text-yellow-800 hover:text-yellow-200 underline font-semibold transition-colors duration-300"
                        >
                            Tanzeebul Tamim
                        </a>{" "}
                        for educational purposes only. It is not affiliated with
                        any official organization.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
                        <section
                            id="privacy-policy"
                            className="flex-1 bg-base-200 dark:bg-base-100 bg-opacity-60 dark:bg-opacity-60 rounded-xl p-6 shadow-md border border-yellow-600 min-w-[260px] transition-transform duration-300 hover:scale-105 hover:border-primary"
                        >
                            <h2 className="text-lg md:text-2xl text-amber-800 dark:text-yellow-300 font-bold mb-3 tracking-wide uppercase">
                                Privacy Policy
                            </h2>
                            <p className="lg:mb-2 mb-1 text-sm md:text-base">
                                This project uses Firebase Authentication to
                                simulate real-world login flows. Data entered
                                during login (e.g., your Google account email)
                                is not stored, shared, or processed in any way
                                beyond what&#39;s required to authenticate you.
                            </p>
                            <p className="lg:mb-2 mb-1 text-sm md:text-base">
                                No personal information is sold or used for
                                marketing purposes. Your data stays within
                                Firebase&#39;s secure infrastructure and is only
                                used to provide authentication functionality.
                            </p>
                            <p className="text-sm md:text-base">
                                If you ever wish to remove your data, refer to
                                the{" "}
                                <HashLink
                                    smooth
                                    to="/legal#data-deletion"
                                    scroll={scrollWithOffset}
                                    className="text-yellow-800 dark:text-yellow-200 dark:hover:text-yellow-800 hover:text-yellow-200 underline font-semibold transition-colors duration-300"
                                >
                                    User Data Deletion
                                </HashLink>{" "}
                                section below.
                            </p>
                        </section>

                        <section
                            id="terms"
                            className="flex-1 bg-base-200 dark:bg-base-100 bg-opacity-60 dark:bg-opacity-60 rounded-xl p-6 shadow-md border border-yellow-600 min-w-[260px] transition-transform duration-300 hover:scale-105 hover:border-primary"
                        >
                            <h2 className="text-lg md:text-2xl text-amber-800 dark:text-yellow-300 font-bold mb-3 tracking-wide uppercase">
                                Terms of Service
                            </h2>
                            <p className="lg:mb-2 mb-1 text-sm md:text-base">
                                This is a non-commercial, development-stage
                                project created for educational and personal
                                growth purposes only. You are accessing a test
                                environment that may contain bugs, incomplete
                                features, or broken logic.
                            </p>
                            <p className="text-sm md:text-base">
                                The developer is not responsible for any errors,
                                bugs, or confusion caused by use of this site.
                                Please use it with the understanding that this
                                is not a production-grade service.
                            </p>
                        </section>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
                        <section
                            id="data-deletion"
                            className="flex-1 bg-base-200 dark:bg-base-100 bg-opacity-60 dark:bg-opacity-60 rounded-xl p-6 shadow-md border border-yellow-600 min-w-[260px] transition-transform duration-300 hover:scale-105 hover:border-primary"
                        >
                            <h2 className="text-lg md:text-2xl text-amber-800 dark:text-yellow-300 font-bold mb-3 tracking-wide uppercase">
                                User Data Deletion
                            </h2>
                            <p className="lg:mb-2 mb-1 text-sm md:text-base">
                                If you logged into this site using your email or
                                Google and want your data removed from Firebase,
                                you can email a request to:
                            </p>
                            <p className="lg:mb-2 mb-1 text-sm md:text-base">
                                {" "}
                                <a href="mailto:tamim200091@gmail.com">
                                    <strong className="text-yellow-800 dark:text-yellow-200 dark:hover:text-yellow-800 hover:text-yellow-200 underline">
                                        tamim200091@gmail.com{" "}
                                    </strong>
                                </a>
                                with the subject line{" "}
                                <em className="text-yellow-800 dark:text-yellow-200">
                                    &quot;Data Deletion Request&quot;
                                </em>
                            </p>
                            <p className="text-sm md:text-base">
                                Include the Google email you used to sign in.
                                Your data will be deleted in most cases within
                                that day.
                            </p>
                        </section>

                        <section
                            id="cookie"
                            className="flex-1 bg-base-200 dark:bg-base-100 bg-opacity-60 dark:bg-opacity-60 rounded-xl p-6 shadow-md border border-yellow-600 min-w-[260px] transition-transform duration-300 hover:scale-105 hover:border-primary"
                        >
                            <h2 className="text-lg md:text-2xl text-amber-800 dark:text-yellow-300 font-bold mb-3 tracking-wide uppercase">
                                Cookie Notice
                            </h2>
                            <p className="lg:mb-2 mb-1 text-sm md:text-base">
                                This site does not use cookies for tracking,
                                advertising, or analytics. However, Firebase
                                Authentication may set essential cookies for
                                login functionality.
                            </p>
                            <p className="text-sm md:text-base">
                                These are strictly necessary for the site to
                                function and do not collect personal data beyond
                                authentication.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block absolute lg:bottom-0 left-0 w-full dark:h-4/6 h-1/3 bg-gradient-to-b from-transparent to-base-100 z-10 pointer-events-none"></div>
        </div>
    );
};

export default Legal;
