import SectionTitle from "../../../reusable/SectionTitle";
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
import "./style.css";

const popularInstructorsDes =
  "Get to know some of our highly skilled and experienced instructors who'll lead your way throughout this journey. Each of our instructor brings a unique teaching style and a wealth of practical experience, ensuring that our students receive the best instruction possible.";

const PopularInstructors = () => {
  const [topInstructors, setTopInstructors] = useState([]);
  const [numberOfSlides, setNumberOfSlides] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setNumberOfSlides(window.innerWidth > 576 ? 3 : 1);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getTopInstructors()
      .then((data) => {
        setTopInstructors(data.topInstructors);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="px-5 lg:px-10 lg:mb-32 mb-12 pt-11 relative">
      <Slide>
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
        className="popularClassSection cursor-pointer"
      >
        {topInstructors.map((topInstructor) => {
          return (
            <SwiperSlide key={topInstructor.id}>
              <InstructorCard topInstructor={topInstructor}></InstructorCard>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default PopularInstructors;
