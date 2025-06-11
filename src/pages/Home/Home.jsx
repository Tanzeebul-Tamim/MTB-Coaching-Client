import useTitle from "../../hooks/useTitle";
import Banner from "./Banner/Banner";
import BikeHacks from "./BikeHacks/BikeHacks";
import PopularClasses from "./PopularClasses/PopularClasses";
import PopularInstructors from "./PopularInstructors/PopularInstructors";
import Title from "./Title/Title";


const Home = () => {
    useTitle(null, location.pathname);

    return (
        <div>
            <Banner></Banner>
            <Title></Title>
            <PopularInstructors></PopularInstructors>
            <PopularClasses></PopularClasses>
            <BikeHacks></BikeHacks>
        </div>
    );
};

export default Home;