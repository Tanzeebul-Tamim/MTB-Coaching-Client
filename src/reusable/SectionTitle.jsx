const SectionTitle = ({
    title1,
    title2,
    description,
    textAlign,
    enlarge,
    dark,
}) => {
    return (
        <div
            className={`lg:mb-9 mb-5 ${
                textAlign && "transform scale-x-[-1]"
            } flex flex-col`}
        >
            <div
                className={`title title-res flex gap-3 lg:gap-6 ${
                    textAlign && "flex-row-reverse justify-end"
                } lg:text-5xl  ${
                    enlarge ? "text-3xl" : "text-xl"
                }  uppercase lg:border-l-[12px] border-l-[6px] lg:pl-4 pl-2 dark:border-yellow-600 border-amber-600 z-[1]`}
            >
                <span
                    className={`${
                        textAlign
                            ? "dark:text-yellow-600 text-amber-600"
                            : dark
                            ? "text-[#f5f3f0]"
                            : '"text-base-content"'
                    } lg:tracking-widest tracking-wider`}
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
                        textAlign
                            ? "text-base-content"
                            : "dark:text-yellow-600 text-amber-600"
                    }  lg:tracking-widest tracking-wider`}
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
                } lg:mt-5 mt-2 ${
                    dark ? "text-[#f5f3f0]" : "text-base-content"
                } ${
                    enlarge ? "text-lg" : "text-sm"
                } lg:text-xl lg:w-full description`}
            >
                {description}
            </p>
        </div>
    );
};

export default SectionTitle;
