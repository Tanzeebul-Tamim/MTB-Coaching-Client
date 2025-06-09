import { useState, useEffect } from "react";
import SectionTitle from "../../../reusable/SectionTitle";
import HackCard from "./HackCard";
import { Slide } from "react-awesome-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import "../PopularInstructors/style.css";
import useScreenSize from "../../../hooks/useScreeSize";
import useYoutubeSearch from "../../../hooks/useYouTubeSearch";
import useAuth from "../../../hooks/useAuth";
import bikeHacksData from "./bikeHack.json";
import SklBikeHacks from "../../../skeletons/SklBikeHacks";

const bikeHacksDes =
    "Discover innovative ways to maintain and optimize your bike, improve your riding skills, and overcome common challenges on the road or trail. Here we're to provide you with helpful knowledge and shortcuts that can make your biking adventures more enjoyable and rewarding.";

const BikeHacks = () => {
    const [numberOfSlides, setNumberOfSlides] = useState(null);
    const { isSmallDevice } = useScreenSize();
    const { user } = useAuth();
    const [selectBikeType, setSelectBikeType] = useState("Mountain");
    const query = `${selectBikeType} Bike Hacks and Tips`;
    const { videos, loading } = useYoutubeSearch(query);

    useEffect(() => {
        setNumberOfSlides(isSmallDevice ? 1 : 4);
    }, [isSmallDevice]);

    const handleSelectBikeType = (event) => {
        const selectedBikeType = event.target.value;
        setSelectBikeType(selectedBikeType);
    };

    const fetchCondition = user && videos.length > 0;
    return (
        <div
            className={`lg:pb-20 pb-8 relative ${
                fetchCondition ? "lg:pt-20 pt-10" : "lg:pt-40 pt-20"
            } px-5 lg:px-10`}
            style={{
                backgroundAttachment: "fixed",
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.300), rgba(0, 0, 0, 0.300)), url('/bike_hack_banner.avif')",
                backgroundPosition: isSmallDevice ? "55% 50%" : "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            {fetchCondition && (
                <div className="mb-4 flex items-center justify-center">
                    <select
                        onChange={handleSelectBikeType}
                        name="gender"
                        className="select font-light text-sm lg:text-base text-gray-100 lg:w-full max-w-xs"
                        value={selectBikeType}
                    >
                        <option hidden>What Kind of Bike do you Ride?</option>
                        {bikeHacksData.bikeTypes.map((bikeType, idx) => (
                            <option key={idx} value={bikeType}>
                                {bikeType}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <Slide>
                <SectionTitle
                    title1={"bike hacks"}
                    title2={"and tips"}
                    description={bikeHacksDes}
                />
            </Slide>
            {numberOfSlides && (
                <Swiper
                    slidesPerView={numberOfSlides}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Navigation]}
                    className="popularClassSection cursor-pointer"
                >
                    {loading
                        ? Array.from({ length: isSmallDevice ? 1 : 4 }).map(
                              (_, i) => (
                                  <SwiperSlide key={i}>
                                      <SklBikeHacks />
                                  </SwiperSlide>
                              )
                          )
                        : fetchCondition
                        ? videos.map((video) => (
                              <SwiperSlide key={video.id.videoId}>
                                  <HackCard
                                      // Remove hashtags from video titles
                                      videoTitle={video.snippet.title.replace(
                                          /#[^\s#]+/g,
                                          ""
                                      )}
                                      videoId={video.id.videoId}
                                  />
                              </SwiperSlide>
                          ))
                        : bikeHacksData.videos.map((hack, idx) => (
                              <SwiperSlide key={idx}>
                                  <HackCard
                                      videoTitle={hack.videoTitle}
                                      videoId={hack.videoId}
                                  />
                              </SwiperSlide>
                          ))}
                </Swiper>
            )}
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-b from-transparent to-base-300"></div>
        </div>
    );
};

export default BikeHacks;
