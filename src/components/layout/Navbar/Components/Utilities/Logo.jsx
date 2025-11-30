import { Link } from "react-router-dom";

const Logo = ({ isDarkTheme, isSmallDevice }) => {
    return (
        <Link to="/">
            <img
                className={`lg:w-[400px] w-44 hover:scale-110 duration-200 transition-transform ${
                    isSmallDevice && "navbar-center"
                }`}
                src={`/assets/images/MTB_Coaching_${
                    isDarkTheme ? "Dark" : "Light"
                }.png`}
                alt="Logo"
            />
        </Link>
    );
};

export default Logo;
