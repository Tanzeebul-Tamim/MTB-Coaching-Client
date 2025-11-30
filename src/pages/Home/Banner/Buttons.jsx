import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { BiLogInCircle } from "react-icons/bi";
import useScreen from "../../../hooks/useScreen";
import { RiRobot2Fill } from "react-icons/ri";

const Buttons = ({ alignment }) => {
    const { user } = useAuth();
    const { isSmallDevice } = useScreen();

    return (
        <div
            className={`${
                alignment === "right" && "justify-end"
            } flex items-center lg:gap-4 gap-2`}
        >
            {!user && (
                <button
                    style={{ fontFamily: "Khand" }}
                    className="uppercase z-10 font-bold lg:text-xl text-[10px] hover:scale-105 ease-in-out transition-transform duration-300 lg:text-start lg:mt-4"
                >
                    <Link
                        to="/register"
                        className="bg-secondary text-accent glow-effect lg:px-5 px-2 lg:py-2 lg:rounded-3xl rounded-xl lg:flex lg:items-center lg:gap-2 group"
                    >
                        <span>Join Now</span>
                        {!isSmallDevice && (
                            <BiLogInCircle className="lg:text-2xl group-hover:rotate-[360deg] group-hover:scale-125 transition-transform ease-in-out duration-500" />
                        )}
                    </Link>
                </button>
            )}
            <button
                data-tip="Coming Soon"
                style={{ fontFamily: "Khand" }}
                className="uppercase tooltip tooltip-bottom tooltip-primary z-10 font-bold lg:text-xl text-[10px] hover:scale-105 ease-in-out transition-transform duration-300 lg:text-start lg:mt-4"
            >
                <span
                    className={`${
                        user
                            ? "bg-secondary text-accent"
                            : "bg-accent text-secondary"
                    } glow-effect lg:px-5 px-2 lg:py-2 lg:rounded-3xl rounded-xl lg:flex lg:gap-2`}
                >
                    <span>Your AI Coach</span>
                    {!isSmallDevice && <RiRobot2Fill className="lg:text-2xl" />}
                </span>
            </button>
        </div>
    );
};

export default Buttons;
