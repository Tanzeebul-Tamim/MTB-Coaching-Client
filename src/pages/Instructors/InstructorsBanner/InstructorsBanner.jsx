import ImageWithLoader from "../../../reusable/ImageWithLoader";

const InstructorsBanner = () => {
    return (
        <div className="relative">
            <ImageWithLoader src="/instructors_banner.png" alt="" />
            <div className="z-[10] lg:left-10 left-3 text-center absolute -bottom-3">
                <h1 className="text-yellow-500 title lg:text-6xl uppercase font-bold">
                    Training
                </h1>
                <h1 className="text-white lg:text-4xl text-sm uppercase lg:tracking-[7px] lg:mt-1">
                    Instructions
                </h1>
                <h1 className="text-yellow-500 title lg:text-6xl font-bold uppercase">
                    & Guides
                </h1>
                <h1 className="text-white lg:text-4xl text-sm uppercase lg:tracking-[7px] lg:mt-1">
                    Worldwide
                </h1>
                <h1 className="text-white description lg:mt-2 lg:text-lg text-[8.5px] uppercase lg:tracking-[5px]">
                    Since 2006
                </h1>
            </div>
            <div className="absolute lg:bottom-0 -bottom-1 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-base-300"></div>
        </div>
    );
};

export default InstructorsBanner;
