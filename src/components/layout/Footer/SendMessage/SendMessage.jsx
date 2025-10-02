import useSendMessage from "./useSendMessage";
import "../../../../styles/support.css";

const SendMessage = ({ bgLocations }) => {
    const {
        handleSendMessage,
        user,
        glowClass,
        textLimit,
        textLength,
        handleTextChange,
        textFocus,
        setTextFocus,
        subjectLimit,
        subjectLength,
        handleSubjectChange,
        subjectFocus,
        setSubjectFocus,
        isSmallDevice,
    } = useSendMessage();

    return (
        <form onSubmit={handleSendMessage} className="relative">
            <span
                className={`${glowClass} transition-all ease-in-out duration-[500ms]`}
            >
                Support Request
            </span>

            {!user && (
                <>
                    <input
                        name="name"
                        required
                        type="text"
                        placeholder="Full Name"
                        className={`${
                            bgLocations && "bg-opacity-80"
                        } dark:text-yellow-200 text-orange-900 input max-h-[25px] w-full text-sm bg-base-200 placeholder:dark:text-stone-500 placeholder:text-stone-600 dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)]`}
                    />
                    <input
                        name="email"
                        required
                        type="email"
                        placeholder="Email"
                        className={`${
                            bgLocations && "bg-opacity-70"
                        } dark:text-yellow-200 text-orange-900 input max-h-[25px] w-full text-sm bg-base-200 placeholder:dark:text-stone-500 placeholder:text-stone-600 dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)]`}
                    />
                </>
            )}

            <div className="relative">
                <input
                    name="subject"
                    required
                    maxLength={subjectLimit}
                    onChange={handleSubjectChange}
                    onFocus={() => setSubjectFocus(true)}
                    onBlur={() => setSubjectFocus(false)}
                    type="text"
                    placeholder="Subject"
                    className={`${bgLocations && "bg-opacity-70"} ${
                        subjectLength < subjectLimit
                            ? "dark:text-yellow-200 text-orange-900"
                            : "text-red-600"
                    } input max-h-[25px] w-full text-sm bg-base-200 placeholder:dark:text-stone-500 placeholder:text-stone-600 dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)]`}
                />

                <span
                    className={`${
                        subjectFocus || subjectLength > 0
                            ? "opacity-100"
                            : "opacity-0"
                    } transition-all   ease-in-out duration-700 text-xs px-2 flex gap-1 items-center rounded-lg title ${
                        subjectLength < subjectLimit
                            ? "bg-secondary dark:text-yellow-900 text-orange-900"
                            : "bg-red-500 dark:bg-red-600 text-stone-800"
                    } absolute -right-[13%] -top-1`}
                >
                    {subjectLength}/{subjectLimit}
                </span>
            </div>

            <textarea
                name="message"
                required
                maxLength={textLimit}
                onChange={handleTextChange}
                onFocus={() => setTextFocus(true)}
                onBlur={() => setTextFocus(false)}
                placeholder="Your message goes here"
                className={`${bgLocations && "bg-opacity-70"} ${
                    textLength < textLimit
                        ? "dark:text-yellow-200 text-orange-900"
                        : "text-red-600"
                } focus:outline-none textarea textarea-bordered w-full text-sm min-h-[100px] bg-base-200 placeholder:dark:text-stone-500 placeholder:text-stone-600 dark:focus:outline-yellow-200 focus:outline-orange-100 focus:shadow-[0_0_5px_2px_rgba(255,255,200,0.9),0_0_15px_8px_rgba(255,193,7,0.6)] dark:focus:shadow-[0_0_10px_5px_rgba(253,224,71,0.5)]`}
            ></textarea>

            <span
                className={`${
                    textFocus || textLength > 0 ? "opacity-100" : "opacity-0"
                } transition-all   ease-in-out duration-700 text-xs px-2 flex gap-1 items-center rounded-lg title ${
                    textLength < textLimit
                        ? "bg-secondary dark:text-yellow-900 text-orange-900"
                        : "bg-red-500 dark:bg-red-600 text-stone-800"
                } absolute ${
                    isSmallDevice ? "bottom-9" : "bottom-11"
                } -right-[13%]`}
            >
                {textLength}/{textLimit}
            </span>

            <button
                type="submit"
                className="bg-secondary dark:text-yellow-900 text-orange-900 font-bold px-3 lg:py-2 py-1 lg:rounded-xl rounded-xl mt-2 hover:scale-105 transition-transform ease-in-out"
            >
                Send Message
            </button>
        </form>
    );
};

export default SendMessage;
