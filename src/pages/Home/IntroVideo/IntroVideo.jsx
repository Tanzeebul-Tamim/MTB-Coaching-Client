import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import useScreen from "../../../hooks/useScreen";

const IntroVideo = () => {
    const { isIOS } = useAuth();
    const { isSmallDevice } = useScreen();

    return (
        <section
            style={{
                backgroundAttachment: !isIOS && "fixed",
                backgroundImage:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.05)), url('/assets/images/intro_video.jpg')",
                backgroundPosition: isSmallDevice ? "55% 50%" : "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className="w-full pt-10 pb-20 from-transparent to-black bg-gradient-to-t relative"
        >
            <div className="max-w-[68rem] mx-auto px-4 text-center z-20 relative">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75 }}
                    className="text-4xl lg:text-5xl font-bold tracking-wide mb-4"
                >
                    <span
                        className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg"
                        style={{
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Master Mountain Biking With Confidence
                    </span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.1 }}
                    className="text-lg text-yellow-50 max-w-2xl mx-auto mb-12 description"
                >
                    Start with the fundamentals. <br /> If you&apos;re new to
                    mountain biking, this is the perfect place to begin.
                </motion.p>

                {/* Video */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.75, delay: 0.2 }}
                    className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl glow-effect"
                >
                    <iframe
                        src="https://www.youtube-nocookie.com/embed/0TMuxmCW3hE?si=iO8woQsHJQG7l9AU"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-base-100 z-0 pointer-events-none"></div>
        </section>
    );
};

export default IntroVideo;
