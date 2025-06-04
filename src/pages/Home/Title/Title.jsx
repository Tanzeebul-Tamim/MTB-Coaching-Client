import { Typewriter } from "react-simple-typewriter";

const Title = () => {
    return (
        <div className="text-center text-6xl lg:text-9xl uppercase font-semibold text-yellow-500 px-5 lg:px-10 lg:mt-20 mt-6 lg:mb-8 mb-1 pt-11 relative">            
            <h1 className="text-white mb-1 lg:mb-5 text-xl lg:text-5xl">Embrace the Mountain biking lifestyle !</h1>
            <Typewriter
            words={['Eat', 'Sleep', 'Ride', 'Repeat!']}
            loop={true}
            cursor={true}
            cursorBlinking={true}
            cursorStyle='|'
            typeSpeed={90}
            deleteSpeed={60}
            delaySpeed={400}
            />
        </div>
    );
};

export default Title;