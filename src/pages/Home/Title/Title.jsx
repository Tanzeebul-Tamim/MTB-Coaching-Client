import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const Title = () => {
    return (
        <div className="text-center text-6xl lg:text-9xl uppercase font-semibold text-secondary px-5 lg:px-10 lg:mt-20 mt-6 lg:mb-8 mb-4 pt-11 relative">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-base-content mb-1 lg:mb-5 text-xl lg:text-6xl lg:tracking-wider tracking-wide"
            >
                Embrace the Mountain biking lifestyle !
            </motion.h2>
            <Typewriter
                words={["Eat", "Sleep", "Ride", "Repeat!"]}
                loop={true}
                cursor={true}
                cursorBlinking={true}
                cursorStyle="|"
                typeSpeed={90}
                deleteSpeed={60}
                delaySpeed={400}
            />
        </div>
    );
};

export default Title;
