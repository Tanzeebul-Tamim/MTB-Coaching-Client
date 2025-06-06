import useTitle from "../../Helmet/useTitle";
import useScreenSize from "../../hooks/useScreeSize";

const AboutUs = () => {
    useTitle("| About Us");
    const { isSmallDevice } = useScreenSize();

    return (
        <div
            className="lg:pt-40 pt-20 lg:pb-24 pb-12 lg:px-10 relative min-h-screen"
            style={{
                backgroundImage: "url('/about_us_banner.avif')",
                backgroundPosition: isSmallDevice ? "32.5% 50%" : "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}
        >
            <div className="relative z-20">
                <div className="text-lg text-white flex flex-col gap-8 text-center description max-w-7xl mx-3 md:mx-auto bg-black bg-opacity-60 md:p-10 p-6 rounded-2xl shadow-2xl border border-yellow-500">
                    <h1
                        style={{
                            letterSpacing: isSmallDevice ? "0.2em" : "1em",
                        }}
                        className="z-[10] title font-extrabold text-yellow-400 md:text-4xl text-xl md:mb-8 text-center uppercase drop-shadow-lg"
                    >
                        About Us
                    </h1>
                    <p className="z-[10] lg:mb-2 -mb-2 lg:text-sm text-xs md:text-lg leading-relaxed">
                        Welcome to{" "}
                        <strong className="text-yellow-500 italic">
                            Professional Mountain Biking Coaching Network!{" "}
                        </strong>
                        We are a passionate group of riders dedicated to
                        promoting and sharing the exhilarating world of mountain
                        biking. Our journey began in 2005 when a group of
                        like-minded individuals came together with the vision of
                        providing quality services and instruction to riders of
                        all levels.
                    </p>
                    <p className="z-[10] lg:mb-2 -mb-2 lg:text-sm text-xs md:text-lg leading-relaxed">
                        At the core of our mission is a commitment to
                        excellence. We strive to deliver exceptional experiences
                        and inspire riders to improve their skills, push their
                        limits, and discover the joy of mountain biking. With a
                        team of highly skilled and experienced instructors, we
                        ensure that every rider receives personalized attention
                        and guidance tailored to their abilities and goals.
                    </p>
                    <p className="z-[10] lg:mb-2 -mb-2 lg:text-sm text-xs md:text-lg leading-relaxed">
                        We believe in the power of community and the importance
                        of sharing our love for mountain biking. Through our
                        programs, events, and organized rides, we create
                        opportunities for riders to connect, learn from each
                        other, and forge lifelong friendships. We are firm
                        believers that the camaraderie and support within the
                        mountain biking community are invaluable and contribute
                        to the growth and enjoyment of the sport.
                    </p>
                    <p className="z-[10] lg:mb-2 -mb-2 lg:text-sm text-xs md:text-lg leading-relaxed">
                        Safety is paramount in everything we do. We prioritize
                        providing a safe and secure environment for riders to
                        learn and progress. Our instructors are certified and
                        knowledgeable, equipped with the expertise to teach
                        proper techniques, bike maintenance, and trail
                        etiquette. We also advocate for responsible trail use
                        and stewardship to preserve and protect the natural
                        beauty of our riding areas.
                    </p>
                    <p className="z-[10] lg:mb-2 -mb-2 lg:text-sm text-xs md:text-lg leading-relaxed">
                        Whether you are a beginner seeking to embark on your
                        first mountain biking adventure or an experienced rider
                        looking to refine your skills, we welcome you to join
                        our community. Together, let&apos;s explore the trails,
                        embrace the challenges, and experience the thrill of
                        mountain biking. Get ready to discover the freedom,
                        adrenaline, and sense of accomplishment that await you
                        on two wheels.
                    </p>
                </div>
            </div>
            <div className="hidden lg:block absolute lg:bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-base-300 z-10 pointer-events-none"></div>
        </div>
    );
};

export default AboutUs;
