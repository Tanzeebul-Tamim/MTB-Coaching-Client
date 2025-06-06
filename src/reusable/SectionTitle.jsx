const SectionTitle = ({ title1, title2, description, textAlign, enlarge }) => {
    return (
        <div
            className={`mb-9 ${
                textAlign && "transform scale-x-[-1]"
            } flex flex-col`}
        >
            <div
                className={`title title-res flex gap-3 lg:gap-6 ${
                    textAlign && "flex-row-reverse justify-end"
                } lg:text-5xl  ${
                    enlarge ? "text-3xl" : "text-xl"
                }  uppercase lg:border-l-[12px] border-l-[5px] lg:pl-4 pl-2 border-yellow-600 z-[1]`}
            >
                <span
                    className={`${
                        textAlign ? "text-yellow-600" : "text-white"
                    } lg:tracking-widest`}
                >
                    <p
                        className={`${
                            textAlign && "transform scale-x-[-1] text-end"
                        }`}
                    >
                        {title1}
                    </p>
                </span>{" "}
                <span
                    className={`${
                        textAlign ? "text-white" : "text-yellow-600"
                    }  lg:tracking-widest`}
                >
                    <p
                        className={`${
                            textAlign && "transform scale-x-[-1] text-end"
                        }`}
                    >
                        {title2}
                    </p>
                </span>
            </div>
            <p
                className={`${
                    textAlign && "transform scale-x-[-1] text-end"
                } mt-5 text-white ${enlarge ? 'text-lg' : 'text-sm'} lg:text-xl lg:w-1/2 description`}
            >
                {description}
            </p>
        </div>
    );
};

export default SectionTitle;
