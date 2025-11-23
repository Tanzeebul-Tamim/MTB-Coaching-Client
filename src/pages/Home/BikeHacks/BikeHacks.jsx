import { useState, useEffect } from "react";
import SectionTitle from "../../../components/ui/SectionTitle";
import HackCard from "./HackCard";
import { Slide } from "react-awesome-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import useScreen from "../../../hooks/useScreen";
import useYoutubeSearch from "../../../hooks/useYouTubeSearch";
import useAuth from "../../../hooks/useAuth";
import SklBikeHacks from "../../../components/skeletons/SklBikeHacks";
import Dropdown from "./Dropdown";
import bikeHacksData from "./bikeHack.json";

const bikeHacksDes =
    "Discover innovative ways to maintain and optimize your bike, improve your riding skills, and overcome common challenges on the road or trail. Here we're to provide you with helpful knowledge and shortcuts that can make your biking adventures more enjoyable and rewarding.";

const BikeHacks = () => {
    const [numberOfSlides, setNumberOfSlides] = useState(null);
    const { isSmallDevice } = useScreen();
    const { user, isIOS } = useAuth();
    const [selectBikeType, setSelectBikeType] = useState("");
    const [shouldFetch, setShouldFetch] = useState(false);
    const query = `${selectBikeType} Bike Hacks`;
    const { videos, loading } = useYoutubeSearch(shouldFetch ? query : null);

    useEffect(() => {
        setNumberOfSlides(isSmallDevice ? 1 : 4);
    }, [isSmallDevice]);

    const dropdownCondition = true;
    const fetchCondition = user && videos.length > 0;

    return (
        <div
            className={`lg:pb-20 pb-8 relative ${
                dropdownCondition ? "pt-10" : "lg:pt-40 pt-20"
            } px-5 lg:px-10`}
            style={{
                backgroundAttachment: !isIOS && "fixed",
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.300), rgba(0, 0, 0, 0.100)), url('/assets/images/bike_hack_banner.avif')",
                backgroundPosition: isSmallDevice ? "55% 50%" : "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            {dropdownCondition && (
                <Dropdown
                    selectBikeType={selectBikeType}
                    setSelectBikeType={setSelectBikeType}
                    bikeHacksData={bikeHacksData}
                    setShouldFetch={setShouldFetch}
                    isLoggedIn={Boolean(user)}
                />
            )}

            <Slide duration={1300}>
                <SectionTitle
                    title1={"bike hacks"}
                    title2={"and tips"}
                    description={bikeHacksDes}
                    dark={true}
                />
            </Slide>
            {numberOfSlides && (
                <Swiper
                    slidesPerView={numberOfSlides}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Navigation]}
                    className="popular custom-cursor-pointer"
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
            <div className="absolute bottom-0 left-0 w-full dark:h-2/3 h-1/3 bg-gradient-to-b from-transparent to-base-100"></div>
        </div>
    );
};

export default BikeHacks;
