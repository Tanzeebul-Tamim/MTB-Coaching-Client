import ImageWithLoader from "./ImageWithLoader";

const PageBanner = ({ src, texts, side }) => {
    return (
        <div className="relative">
            <div className="flex items-center justify-center w-full h-full">
                <ImageWithLoader src={`/assets/${src}_banner.png`} alt="" />
            </div>
            <div
                className={`z-[10] lg:${side}-10 ${side}-3 text-center absolute -bottom-3`}
            >
                {texts.map((text, i) => (
                    <h1
                        key={i}
                        className={`${
                            i % 2 === 0
                                ? "text-secondary title lg:text-6xl font-bold"
                                : "text-base-content lg:text-4xl text-sm lg:tracking-[7px] lg:mt-1"
                        } uppercase`}
                    >
                        {text}
                    </h1>
                ))}
                <h1 className="text-base-content description lg:mt-2 lg:text-lg text-[8.5px] uppercase lg:tracking-[5px]">
                    Since 2006
                </h1>
            </div>
            <div className="absolute lg:bottom-0 -bottom-1 left-0 w-full dark:lg:h-1/2 dark:h-1/2 lg:h-1/3 h-1/2 bg-gradient-to-b from-transparent to-base-100"></div>
        </div>
    );
};

export default PageBanner;
