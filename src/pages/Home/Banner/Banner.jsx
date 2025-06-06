import ResponsiveLogin from "./ResponsiveLogin";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Banner = () => {
    return (
        <AutoplaySlider
            play={true}
            cancelOnInteraction={false}
            interval={2000}
            className="w-full"
        >
            <div id="slide1" className="relative w-full">
                <img
                    className="w-full lg:pt-16"
                    src="/home_banner_1.avif"
                />

                <img
                    src="/logo.png"
                    className="absolute z-10 lg:w-auto w-1/6 lg:bottom-[27%] bottom-5 lg:right-10 right-2"
                />

                <div
                    style={{ fontFamily: "Oswald" }}
                    className="uppercase lg:flex flex-col gap-4 absolute z-10 font-extrabold lg:top-[40%] top-[30%] left-[7%] lg:text-7xl text-lg"
                >
                    <div>
                        <span className="text-yellow-400">Unlock</span>{" "}
                        <span className="text-white">Your Potential</span>
                    </div>
                    <div>
                        <span className="text-yellow-400">with</span>{" "}
                        <span className="text-white">comprehensive</span>
                    </div>
                    <div>
                        <span className="text-yellow-400">mountain</span>{" "}
                        <span className="text-white">bike courses</span>
                    </div>
                </div>

                <ResponsiveLogin />

                <div className="absolute bottom-0 lg:bottom-[6.5%] left-0 w-full h-[65%] bg-gradient-to-b from-transparent lg:to-base-100 to-gray-800"></div>
                <div className="absolute lg:hidden -bottom-5 left-0 w-full h-[65%] bg-gradient-to-b from-transparent to-base-100"></div>
            </div>

            <div id="slide2" className="relative w-full">
                <img
                    className="w-full"
                    src="/home_banner_2.avif"
                />

                <img
                    src="/logo.png"
                    className="absolute z-10 lg:w-auto w-1/6 lg:bottom-[25%] bottom-5 lg:left-10 left-2"
                />

                <div
                    style={{ fontFamily: "Oswald" }}
                    className="uppercase lg:flex flex-col gap-4 text-end absolute z-10 font-extrabold lg:top-[40%] top-[30%] right-[7%] lg:text-7xl text-lg"
                >
                    <div>
                        <span className="text-white">Elevate</span>{" "}
                        <span className="text-yellow-400">Your Skills</span>
                    </div>
                    <div>
                        <span className="text-white">With</span>{" "}
                        <span className="text-yellow-400">Professional</span>
                    </div>
                    <div>
                        <span className="text-white">Mountain</span>{" "}
                        <span className="text-yellow-400">Bike Training</span>
                    </div>
                </div>

                <ResponsiveLogin alignment="right" />

                <div className="absolute bottom-0 lg:bottom-[4%] left-0 w-full h-[65%] bg-gradient-to-b from-transparent lg:to-base-100 to-gray-800"></div>
                <div className="absolute lg:hidden -bottom-5 left-0 w-full h-[65%] bg-gradient-to-b from-transparent to-base-100"></div>
            </div>

            <div id="slide3" className="relative w-full">
                <img
                    className="w-full"
                    src="/home_banner_3.avif"
                />

                <img
                    src="/logo.png"
                    className="absolute z-10 lg:w-auto w-1/6 lg:bottom-[25%] bottom-5 lg:right-10 right-2"
                />

                <div
                    style={{ fontFamily: "Oswald" }}
                    className="uppercase bottom-0 lg:flex flex-col gap-4 absolute z-10 font-extrabold lg:top-[40%] top-[30%] left-[7%] lg:text-7xl text-lg"
                >
                    <div>
                        <span className="text-yellow-400">Master</span>{" "}
                        <span className="text-white">The trails</span>
                    </div>
                    <div>
                        <span className="text-yellow-400">with</span>{" "}
                        <span className="text-white">expert</span>
                    </div>
                    <div>
                        <span className="text-yellow-400">Mountain</span>{" "}
                        <span className="text-white">Bike instructors</span>
                    </div>
                </div>

                <ResponsiveLogin />

                <div className="absolute bottom-0 lg:bottom-[4%] left-0 w-full h-[65%] bg-gradient-to-b from-transparent lg:to-base-100 to-gray-800"></div>
                <div className="absolute lg:hidden -bottom-5 left-0 w-full h-[65%] bg-gradient-to-b from-transparent to-base-100"></div>
            </div>

            <div id="slide4" className="relative w-full">
                <img
                    className="w-full"
                    src="/home_banner_4.avif"
                />

                <img
                    src="/logo.png"
                    className="absolute z-10 lg:w-auto w-1/6 lg:bottom-[25%] bottom-5 lg:left-10 left-2"
                />

                <div
                    style={{ fontFamily: "Oswald" }}
                    className="uppercase lg:flex flex-col gap-4 absolute z-10 font-extrabold lg:top-[40%] top-[30%] text-end right-[7%] lg:text-7xl text-lg"
                >
                    <div>
                        <span className="text-yellow-400">Improve</span>{" "}
                        <span className="text-white">Your Riding</span>
                    </div>
                    <div>
                        <span className="text-yellow-400">enrich</span>{" "}
                        <span className="text-white">Your knowledge</span>
                    </div>
                    <div>
                        <span className="text-yellow-400">Share</span>{" "}
                        <span className="text-white">Your passion</span>
                    </div>
                </div>

                <ResponsiveLogin alignment="right" />

                <div className="absolute bottom-0 lg:bottom-[4%] left-0 w-full h-[65%] bg-gradient-to-b from-transparent lg:to-base-100 to-gray-800"></div>
                <div className="absolute lg:hidden -bottom-5 left-0 w-full h-[65%] bg-gradient-to-b from-transparent to-base-100"></div>
            </div>
        </AutoplaySlider>
    );
};

export default Banner;
