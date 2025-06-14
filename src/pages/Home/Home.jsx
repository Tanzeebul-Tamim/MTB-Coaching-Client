import useTitle from "../../hooks/useTitle";
import Banner from "./Banner/Banner";
import BikeHacks from "./BikeHacks/BikeHacks";
import PopularClasses from "./PopularClasses/PopularClasses";
import PopularInstructors from "./PopularInstructors/PopularInstructors";
import Title from "./Title/Title";
import "../../styles/swiper-buttons.css";

const Home = () => {
    useTitle(null, location.pathname);

    return (
        <div>
            <Banner />
            <Title />
            <PopularInstructors />
            <PopularClasses />
            <BikeHacks />
        </div>
    );
};

export default Home;
