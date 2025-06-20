import SectionTitle from "../../../components/ui/SectionTitle";
import ClassCard from "./ClassCard";
import { Slide } from "react-awesome-reveal";
import { useState } from "react";
import { useEffect } from "react";
import { getTopClasses } from "../../../api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import useScreenSize from "../../../hooks/useScreenSize";
import SklPopularClasses from "../../../components/skeletons/SklPopularClasses";

const popularClassesDes =
    "We offer a curated collection of the most sought-after courses which are highly recommended for mountain bike enthusiasts. Discover a range of exciting and educational courses designed to enhance your MTB skills and knowledge.";

const PopularClasses = () => {
    const [topClasses, setTopClasses] = useState([]);
    const [numberOfSlides, setNumberOfSlides] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isSmallDevice } = useScreenSize();

    useEffect(() => {
        setNumberOfSlides(isSmallDevice ? 1 : 3);
    }, [isSmallDevice]);

    useEffect(() => {
        setLoading(true);
        getTopClasses()
            .then((data) => {
                setTopClasses(data);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="lg:mb-32 mb-12 px-5 lg:px-10">
            <Slide duration={1300} direction="right">
                <SectionTitle
                    title1={"popular"}
                    title2={"Courses"}
                    textAlign={"text-end"}
                    description={popularClassesDes}
                />
            </Slide>
            <Swiper
                slidesPerView={numberOfSlides}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="popular cursor-pointer"
            >
                {loading
                    ? Array.from({ length: isSmallDevice ? 1 : 3 }).map(
                          (_, i) => (
                              <SwiperSlide key={i}>
                                  <SklPopularClasses />
                              </SwiperSlide>
                          )
                      )
                    : topClasses.map((topClass) => {
                          return (
                              <SwiperSlide key={topClass.id}>
                                  <ClassCard topClass={topClass}></ClassCard>
                              </SwiperSlide>
                          );
                      })}
            </Swiper>
        </div>
    );
};

export default PopularClasses;
