import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import useScreen from "../../../hooks/useScreen";
import { useEffect, useState } from "react";

const IntroVideo = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const { isIOS } = useAuth();
    let { isSmallDevice, splashDuration, splashShown } = useScreen();
    splashDuration /= 1000;

    useEffect(() => {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);

        window.onYouTubeIframeAPIReady = () => {
            const { YT } = window;
            const { PlayerState, Player } = YT;

            // Only try forcing HD on non-mobile
            const forceHD = !isIOS && window.innerWidth > 600;

            new Player("intro-video", {
                events: {
                    onReady: (event) => {
                        if (forceHD) {
                            event.target.setPlaybackQuality("hd1080");
                        }
                    },
                    onStateChange: (event) => {
                        const { data } = event;
                        console.log({ PlayerState });
                        const { PLAYING, PAUSED, ENDED, BUFFERING } =
                            PlayerState;

                        if (data === PLAYING || data === BUFFERING)
                            setIsPlaying(true);
                        else if (data === PAUSED || data === ENDED)
                            setIsPlaying(false);
                    },
                },
            });
        };

        return () => {
            // Cleanup the script if component unmounts
            document.body.removeChild(tag);
            delete window.onYouTubeIframeAPIReady;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section
            style={{
                backgroundAttachment: !isIOS && "fixed",
                backgroundImage:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)), url('/assets/images/intro_video.jpg')",
                backgroundPosition: isSmallDevice ? "25% " : "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className="w-full lg:pt-24 pt-12 pb-20 from-transparent to-black bg-gradient-to-t relative"
        >
            <div className="max-w-[68rem] mx-auto px-4 text-center z-20 relative">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.75,
                        delay: isSmallDevice
                            ? splashShown
                                ? 0.6
                                : splashDuration + 0.6
                            : 0.6,
                    }}
                    className="text-3xl lg:text-5xl font-bold tracking-wide lg:mb-4 mb-2"
                >
                    <span
                        className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg"
                        style={{
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Master Mountain Biking {isSmallDevice && <br />} With
                        Confidence
                    </span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.75,
                        delay: isSmallDevice
                            ? splashShown
                                ? 0.8
                                : splashDuration + 0.8
                            : 0.8,
                    }}
                    className="lg:text-lg text-sm text-yellow-50 max-w-2xl mx-auto lg:mb-12 mb-6 description"
                >
                    Start with the fundamentals. {!isSmallDevice && <br />} If
                    you&apos;re new to mountain biking, this is the perfect
                    place to begin.
                </motion.p>

                {/* Video */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.75,
                        delay: isSmallDevice
                            ? splashShown
                                ? 1.0
                                : splashDuration + 1.0
                            : 1.0,
                    }}
                    className={` ${
                        isPlaying
                            ? "w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl"
                            : " w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-xl glow-effect"
                    }`}
                >
                    <iframe
                        src="https://www.youtube-nocookie.com/embed/0TMuxmCW3hE?si=iO8woQsHJQG7l9AU&enablejsapi=1&vq=hd1080"
                        id="intro-video"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </motion.div>
            </div>

            {/* Top Gradient */}
            <div className="absolute top-0 left-0 w-full dark:h-1/4 bg-gradient-to-t from-transparent to-base-100 z-0 pointer-events-none"></div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-base-100 z-0 pointer-events-none"></div>
        </section>
    );
};

export default IntroVideo;
