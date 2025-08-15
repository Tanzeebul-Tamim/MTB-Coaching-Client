import { useLoaderData, useParams } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import { useEffect, useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import useTitle from "../../hooks/useTitle";

const useSingleInstructorsClasses = () => {
    const instructor = useLoaderData();
    const { userDetails } = useUserData();
    const classes = instructor.classes;
    const isMyWall = instructor.email === userDetails?.email;
    const name = isMyWall ? userDetails?.name : instructor?.name;
    const nameWords = name.split(" ");
    const [loading, setLoading] = useState(false);
    const title1 = nameWords[0];
    const title2 = nameWords.slice(1).join(" ");
    const firstName = name?.split(" ")[0];
    const { id } = useParams();
    const [totalAttendee, setTotalAttendee] = useState(0);
    const [numberOfSlides, setNumberOfSlides] = useState(null);
    const { isSmallDevice } = useScreenSize();
    const title = isMyWall ? "| My Wall" : `| ${firstName}'s Wall`;
    useTitle(title);

    useEffect(() => {
        setNumberOfSlides(isSmallDevice ? 1 : 4);
    }, [isSmallDevice]);

    useEffect(() => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/instructor/total/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTotalAttendee(data.totalStudents);
            })
            .catch((err) =>
                console.error("Failed to fetch total attendees:", err)
            )
            .finally(() => setLoading(false));
    }, [id]);

    const bannerStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.400), rgba(0, 0, 0, 0.400)), url('${
            instructor.cover
                ? instructor.cover
                : "/assets/images/instructor_default_banner.avif"
        }')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    return {
        classes,
        loading,
        title1,
        title2,
        totalAttendee,
        numberOfSlides,
        bannerStyle,
        instructor,
        isMyWall,
        isSmallDevice,
    };
};

export default useSingleInstructorsClasses;
