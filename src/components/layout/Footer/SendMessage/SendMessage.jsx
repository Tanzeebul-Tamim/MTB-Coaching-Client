import useAuth from "../../../../hooks/useAuth";
import useSendMessage from "./useSendMessage";

const SendMessage = ({ bgLocations }) => {
    const { user } = useAuth();
    const { handleSendMessage } = useSendMessage(user);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(e);
                e.target.reset();
            }}
        >
            <span className="uppercase text-lg lg:text-xl text-secondary">
                Send us a Message
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
                        } dark:focus:outline-yellow-600 focus:outline-orange-600 dark:text-yellow-200 text-orange-900 input max-h-[25px] w-full text-sm bg-base-200 placeholder:dark:text-stone-500 placeholder:text-stone-600`}
                    />
                    <input
                        name="email"
                        required
                        type="email"
                        placeholder="Email"
                        className={`${
                            bgLocations && "bg-opacity-70"
                        } dark:focus:outline-yellow-600 focus:outline-orange-600 dark:text-yellow-200 text-orange-900 input max-h-[25px] w-full text-sm bg-base-200 placeholder:dark:text-stone-500 placeholder:text-stone-600`}
                    />
                </>
            )}
            <input
                name="subject"
                required
                type="text"
                placeholder="Subject"
                className={`${
                    bgLocations && "bg-opacity-70"
                } dark:focus:outline-yellow-600 focus:outline-orange-600 dark:text-yellow-200 text-orange-900 input max-h-[25px] w-full text-sm bg-base-200 placeholder:dark:text-stone-500 placeholder:text-stone-600`}
            />
            <textarea
                name="message"
                required
                placeholder="Your message goes here"
                className={`${
                    bgLocations && "bg-opacity-70"
                } dark:focus:outline-yellow-600 focus:outline-orange-600 dark:text-yellow-200 text-orange-900 focus:outline-none textarea textarea-bordered w-full text-sm min-h-[100px] bg-base-200 placeholder:dark:text-stone-500 placeholder:text-stone-600`}
            ></textarea>
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
