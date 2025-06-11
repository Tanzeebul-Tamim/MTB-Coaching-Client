import useTitle from "../../hooks/useTitle";
import useScreenSize from "../../hooks/useScreeSize";

const NoInternetPage = () => {
    useTitle("| No Internet");

    const { isSmallDevice } = useScreenSize();

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.200), #0e0d0d), url(${
                    isSmallDevice ? "/no_internet_res" : "/no_internet"
                }.jpg)`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                overflowY: "hidden",
            }}
            className="flex relative justify-center lg:py-5 lg:px-20 px-10 flex-col items-center min-h-screen overflow-y-hidden"
        >
            <div className="flex flex-col items-center">
                <h1 className="top-5 uppercase text-yellow-400 lg:text-6xl text-5xl font-bold lg:mb-5 mt-6 text-center">
                    No Internet Connection
                </h1>
                <h1 className="top-5 uppercase text-yellow-400 lg:text-4xl text-2xl font-bold lg:mb-5 mt-6 text-center">
                    ERR_INTERNET_DISCONNECTED
                </h1>
            </div>
            {isSmallDevice ? (
                <div className="flex flex-col items-center justify-center w-full h-full flex-1">
                    <p className="description text-white w-full mb-8 text-sm text-center">
                        Whoa, looks like you just hit a dead end!{" "}
                        <span className="text-red-500 font-extrabold">
                            Time to check your gear (or Wi-Fi) and get back on
                            track.
                        </span>
                    </p>
                    <img
                        src="/no_internet_gif.gif"
                        className="rounded-2xl mb-5 w-full"
                    />
                    <p className="description text-white w-full mb-8 text-lg text-center">
                        Don&apos;t worry, the ride resumes as soon as
                        you&apos;re back online.
                    </p>
                </div>
            ) : (
                <>
                    <img src="/no_internet_gif.gif" className="rounded-xl" />
                    <p className="description text-white w-3/4 mb-4 mt-5 text-2xl text-center">
                        Whoa, looks like you just hit a dead end!{" "}
                        <span className="text-red-500 font-extrabold">
                            Time to check your gear (or Wi-Fi) and get back on
                            track.
                        </span>{" "}
                        Don&apos;t worry, the ride resumes as soon as
                        you&apos;re back online.
                    </p>
                </>
            )}
        </div>
    );
};

export default NoInternetPage;
