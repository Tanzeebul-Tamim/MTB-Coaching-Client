import { motion } from "framer-motion";
import useScreen from "../../hooks/useScreen";

const SectionTitle = ({
    title1,
    title2,
    description,
    textAlign,
    enlarge,
    dark,
    fullWidth,
}) => {
    let { isSmallDevice, splashDuration, splashShown } = useScreen();
    splashDuration /= 1000;

    return (
        <div
            className={`lg:mb-9 mb-5 flex flex-col ${textAlign && "items-end"}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1,
                    delay: isSmallDevice
                        ? splashShown
                            ? 0.2
                            : splashDuration + 0.2
                        : 0.2,
                }}
                className={`title title-res flex gap-3 lg:gap-6 ${
                    textAlign
                        ? "lg:border-r-[12px] border-r-[6px] lg:pr-4 pr-2"
                        : "lg:border-l-[12px] border-l-[6px] lg:pl-4 pl-2"
                } lg:text-5xl  ${
                    enlarge ? "text-3xl" : "text-xl"
                }  uppercase border-secondary z-[1]`}
            >
                <span
                    className={`${
                        textAlign
                            ? "text-secondary"
                            : dark
                            ? "text-accent"
                            : '"text-base-content"'
                    } lg:tracking-widest tracking-wider`}
                >
                    <p className={`${textAlign ? "text-end" : ""}`}>{title1}</p>
                </span>{" "}
                <span
                    className={`${
                        textAlign ? "text-base-content" : "text-secondary"
                    }  lg:tracking-widest tracking-wider`}
                >
                    <p className={`${textAlign ? "text-end" : ""}`}>{title2}</p>
                </span>
            </motion.div>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1,
                    delay: isSmallDevice
                        ? splashShown
                            ? 0.2
                            : splashDuration + 0.2
                        : 0.2,
                }}
                className={`${textAlign ? "text-end" : ""} lg:mt-5 mt-2 ${
                    dark ? "text-accent" : "text-base-content"
                } ${enlarge ? "text-lg" : "text-sm"} lg:text-xl ${
                    !fullWidth && "lg:w-1/2"
                } description`}
            >
                {description}
            </motion.p>
        </div>
    );
};

export default SectionTitle;
