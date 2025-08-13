import useTitle from "../../hooks/useTitle";
import { HashLink } from "react-router-hash-link";
import scrollWithOffset from "../../routes/utils/Scroll/ScrollWithOffset";
import useScreenSize from "../../hooks/useScreenSize";

const Faq = () => {
    useTitle("| FAQ & Support");
    const { isSmallDevice } = useScreenSize();

    return (
        <div
            className="lg:pt-40 pt-20 lg:pb-24 pb-12 lg:px-10 relative min-h-screen"
            style={{
                backgroundImage: "url('/assets/support.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: isSmallDevice ? "65% 50%" : "center",
                backgroundAttachment: "fixed",
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
                        FAQ & Support
                    </h1>
                    <p className="lg:mb-2 mb-1 text-sm md:text-lg leading-relaxed text">
                        This page provides answers to common questions and
                        offers support resources to help users navigate and make
                        the most of the platform.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
                        <section
                            id="getting-started"
                            className="flex-1 bg-base-200 dark:bg-base-100 bg-opacity-60 dark:bg-opacity-60 rounded-xl p-6 shadow-md border border-secondary min-w-[260px] transition-transform duration-300 hover:scale-105 hover:border-primary"
                        >
                            <h2 className="text-lg md:text-2xl text-amber-800 dark:text-yellow-300 font-bold mb-3 tracking-wide uppercase">
                                Getting Started
                            </h2>
                            <p className="lg:mb-2 mb-1 text-sm md:text-base">
                                New to this platform? Start by creating an
                                account. Once logged in, you&#39;ll have access
                                to a range of features, including course
                                content, instructor profiles, and personalized
                                dashboards. The top navigation menu provides
                                quick access to major sections of the app.
                            </p>
                            <p className="lg:mb-2 mb-1 text-sm md:text-base">
                                If you&#39;re unsure about what a particular
                                feature or button does, hover over it to reveal
                                tooltips for guidance.
                            </p>
                        </section>

                        <section
                            id="troubleshooting"
                            className="flex-1 bg-base-200 dark:bg-base-100 bg-opacity-60 dark:bg-opacity-60 rounded-xl p-6 shadow-md border border-secondary min-w-[260px] transition-transform duration-300 hover:scale-105 hover:border-primary"
                        >
                            <h2 className="text-lg md:text-2xl text-amber-800 dark:text-yellow-300 font-bold mb-3 tracking-wide uppercase">
                                Troubleshooting
                            </h2>
                            <p className="lg:mb-2 mb-1 text-sm md:text-base">
                                Encountering issues? Some common ones include
                                trouble logging in (often due to pop-up
                                blockers), slow or incomplete data loading
                                (likely due to poor internet), or layout issues
                                caused by unsupported screen resolutions.
                            </p>
                            <p className="text-sm md:text-base">
                                To resolve most of these problems, try
                                refreshing the page, clearing your browser
                                cache, or accessing the site from a different
                                device or browser. If issues persist, don&#39;t
                                hesitate to reach out via the{" "}
                                <HashLink
                                    smooth
                                    to="/support#contact-support"
                                    scroll={scrollWithOffset}
                                    className="underline font-semibold transition-colors duration-300 text-yellow-800 dark:text-yellow-200 dark:hover:text-yellow-800 hover:text-yellow-200"
                                >
                                    Contact Support
                                </HashLink>{" "}
                                section below.
                            </p>
                        </section>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
                        <section
                            id="account-data"
                            className="flex-1 bg-base-200 dark:bg-base-100 bg-opacity-60 dark:bg-opacity-60 rounded-xl p-6 shadow-md border border-secondary min-w-[260px] transition-transform duration-300 hover:scale-105 hover:border-primary"
                        >
                            <h2 className="text-lg md:text-2xl text-amber-800 dark:text-yellow-300 font-bold mb-3 tracking-wide uppercase">
                                Account & Data
                            </h2>
                            <p className="lg:mb-2 mb-1 text-sm md:text-base">
                                Your data is securely managed using Firebase and
                                is tied to your authenticated account. You can
                                view and update your personal info or settings
                                at any time through the dashboard settings
                                panel.
                            </p>
                            <p className="lg:mb-2 mb-1 text-sm md:text-base">
                                If you wish to delete your data entirely,
                                navigate to the{" "}
                                <HashLink
                                    smooth
                                    to="/legal#data-deletion"
                                    scroll={scrollWithOffset}
                                    className="text-yellow-800 dark:text-yellow-200 dark:hover:text-yellow-800 hover:text-yellow-200 underline font-semibold transition-colors duration-300"
                                >
                                    Legal → User Data Deletion
                                </HashLink>{" "}
                                section for instructions. We&#39;re committed to
                                protecting your privacy and following best
                                practices for data handling.
                            </p>
                        </section>

                        <section
                            id="contact-support"
                            className="flex-1 bg-base-200 dark:bg-base-100 bg-opacity-60 dark:bg-opacity-60 rounded-xl p-6 shadow-md border border-secondary min-w-[260px] transition-transform duration-300 hover:scale-105 hover:border-primary"
                        >
                            <h2 className="text-lg md:text-2xl text-amber-800 dark:text-yellow-300 font-bold mb-3 tracking-wide uppercase">
                                Contact Support
                            </h2>
                            <p className="lg:mb-2 mb-1 text-sm md:text-base">
                                Need help or want to report a bug? Feel free to
                                send us a message using the{" "}
                                <span
                                    onClick={() =>
                                        window.scrollTo({
                                            top: document.body.scrollHeight,
                                            behavior: "smooth",
                                        })
                                    }
                                    className="text-yellow-800 dark:text-yellow-200 dark:hover:text-yellow-800 hover:text-yellow-200 custom-cursor-pointer underline font-semibold transition-colors"
                                >
                                    Support Request
                                </span>{" "}
                                form at the bottom of the page.
                            </p>
                            <p className="text-sm md:text-base">
                                Please include details about your issue, the
                                device and browser you&apos;re using, and the
                                subject of your message. This helps us resolve
                                your problem more efficiently. We usually
                                respond within the same day.
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

export default Faq;
