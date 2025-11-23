import SectionTitle from "../../../components/ui/SectionTitle";
import InstructorCard from "./InstructorCard";
import { Slide } from "react-awesome-reveal";
import { useEffect } from "react";
import { getTopInstructors } from "../../../api/api";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import useScreen from "../../../hooks/useScreen";
import SklPopularInstructors from "../../../components/skeletons/SklPopularInstructors";
import useAuth from "../../../hooks/useAuth";
import useSoundEffects from "../../../hooks/useSoundEffects";

const popularInstructorsDes =
    "Get to know some of our highly skilled and experienced instructors who'll lead your way throughout this journey. Each of our instructor brings a unique teaching style and a wealth of practical experience, ensuring that our students receive the best instruction possible.";

const PopularInstructors = () => {
    const [topInstructors, setTopInstructors] = useState([]);
    const [numberOfSlides, setNumberOfSlides] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isSmallDevice } = useScreen();
    const { user } = useAuth();
    const { play } = useSoundEffects();

    useEffect(() => {
        setNumberOfSlides(isSmallDevice ? 1 : 3);
    }, [isSmallDevice]);

    useEffect(() => {
        setLoading(true);
        getTopInstructors()
            .then((data) => {
                setTopInstructors(data.topInstructors);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="px-5 lg:px-10 lg:mb-32 mb-12 pt-11 relative">
            <Slide duration={1300}>
                <SectionTitle
                    title1={"popular"}
                    title2={"instructors"}
                    description={popularInstructorsDes}
                />
            </Slide>
            <Swiper
                slidesPerView={numberOfSlides}
                navigation={true}
                modules={[Navigation]}
                className="popular custom-cursor-pointer"
            >
                {loading
                    ? Array.from({ length: isSmallDevice ? 1 : 3 }).map(
                          (_, i) => (
                              <SwiperSlide key={i}>
                                  <SklPopularInstructors />
                              </SwiperSlide>
                          )
                      )
                    : topInstructors.map((topInstructor, i) => {
                          return (
                              <SwiperSlide key={i}>
                                  <InstructorCard
                                      topInstructor={topInstructor}
                                      isLoggedIn={Boolean(user)}
                                      play={play}
                                  ></InstructorCard>
                              </SwiperSlide>
                          );
                      })}
            </Swiper>
        </div>
    );
};

export default PopularInstructors;
