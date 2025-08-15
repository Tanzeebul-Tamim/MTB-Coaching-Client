import useTitle from "../../hooks/useTitle";
import useScreenSize from "../../hooks/useScreenSize";
import useAuth from "../../hooks/useAuth";
import { HashLink } from "react-router-hash-link";
import scrollWithOffset from "../../routes/utils/Scroll/ScrollWithOffset";

const Legal = () => {
    useTitle("| Legal");
    const { handleScrollGlow } = useAuth();
    const { isSmallDevice } = useScreenSize();

    return (
        <div
            className="lg:pt-40 pt-20 lg:pb-24 pb-12 lg:px-10 relative min-h-screen"
            style={{
                backgroundImage: "url('/assets/images/legal.avif')",
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
                            className="underline font-semibold"
                        >
                            Tanzeebul Tamim
                        </a>{" "}
                        for educational purposes only. It is not affiliated with
                        any official organization.
                    </p>

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
                                Google account and want your data removed from
                                our site, you can send us a message using the{" "}
                                <span
                                    onClick={handleScrollGlow}
                                    className="custom-cursor-pointer underline font-semibold"
                                >
                                    Support Request
                                </span>{" "}
                                form at the bottom of the page.
                            </p>
                            <p className="text-sm md:text-base">
                                Use the subject line{" "}
                                <em>&quot;Data Deletion Request&quot;.</em> Your
                                data will be deleted in most cases within that
                                day.
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

                    <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
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

                        <section
                            id="privacy-policy"
                            className="flex-1 bg-base-200 dark:bg-base-100 bg-opacity-60 dark:bg-opacity-60 rounded-xl p-6 shadow-md border border-yellow-600 min-w-[260px] transition-transform duration-300 hover:scale-105 hover:border-primary"
                        >
                            <h2 className="text-lg md:text-2xl text-amber-800 dark:text-yellow-300 font-bold mb-3 tracking-wide uppercase">
                                Privacy Policy
                            </h2>
                            <p className="mb-1 lg:mb-2 text-sm md:text-base">
                                This project uses{" "}
                                <a
                                    href="https://firebase.google.com/support/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <code className="underline font-semibold">
                                        <i>Firebase</i>
                                    </code>
                                </a>{" "}
                                Authentication for secure login,{" "}
                                <a
                                    href="https://www.mongodb.com/legal/privacy-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <code className="underline font-semibold">
                                        <i>MongoDB</i>
                                    </code>
                                </a>{" "}
                                to store user data and{" "}
                                <a
                                    href="https://imgbb.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <code className="underline font-semibold">
                                        <i>imgbb</i>
                                    </code>
                                </a>{" "}
                                to host user-uploaded images. Each service is
                                subject to its own privacy policy.
                            </p>
                            <p className="text-sm md:text-base">
                                No personal information is shared, sold or used
                                for marketing purposes. Your data stays within
                                MongoDB and Firebase&#39;s secure infrastructure
                                and is only used to operate the service and
                                provide authentication functionality.
                            </p>
                            <p className="text-sm md:text-base">
                                If you ever wish to remove your data, refer to
                                the{" "}
                                <HashLink
                                    smooth
                                    to="/legal#data-deletion"
                                    scroll={scrollWithOffset}
                                    className="custom-cursor-pointer underline font-semibold"
                                >
                                    User Data Deletion
                                </HashLink>{" "}
                                section above.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block absolute lg:bottom-0 left-0 w-full dark:h-4/6 h-1/3 bg-gradient-to-b from-transparent to-base-100 z-10 pointer-events-none"></div>
            <div className="lg:hidden absolute -bottom-1 left-0 w-full dark:h-4/6 h-1/3 bg-gradient-to-b from-transparent to-base-100 z-10 pointer-events-none"></div>
        </div>
    );
};

export default Legal;
