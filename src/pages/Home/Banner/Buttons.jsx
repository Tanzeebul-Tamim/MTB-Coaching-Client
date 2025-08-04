import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";


const Buttons = ({ alignment }) => {
    const { user } = useAuth();

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
                        to="/login"
                        className="bg-secondary text-accent glow-effect lg:px-5 px-2 lg:py-2 lg:rounded-3xl rounded-xl"
                    >
                        Join Now
                    </Link>
                </button>
            )}
            <button
                style={{ fontFamily: "Khand" }}
                className="uppercase z-10 font-bold lg:text-xl text-[10px] hover:scale-105 ease-in-out transition-transform duration-300 lg:text-start lg:mt-4"
            >
                <span
                    className={`${
                        user
                            ? "bg-secondary text-accent"
                            : "bg-accent text-secondary"
                    } glow-effect lg:px-5 px-2 lg:py-2 lg:rounded-3xl rounded-xl`}
                >
                    Contact Us
                </span>
            </button>
        </div>
    );
};

export default Buttons;
