import useTitle from "../../hooks/useTitle";
import useScreen from "../../hooks/useScreen";

const NoInternetPage = () => {
    useTitle("| No Internet");
    const { isSmallDevice } = useScreen();

    return (
        <div className="flex relative justify-center lg:py-5 lg:px-20 px-10 flex-col items-center min-h-screen overflow-y-hidden">
            <div className="flex flex-col items-center mb-4 mt-12">
                <h1 className="top-5 uppercase text-yellow-400 lg:text-6xl text-5xl font-bold text-center">
                    No Internet Connection
                </h1>
                <h1 className="top-5 uppercase text-yellow-500 lg:text-4xl text-2xl font-bold mt-4 text-center">
                    ERR_INTERNET_DISCONNECTED
                </h1>
            </div>
            {isSmallDevice ? (
                <div className="flex flex-col items-center justify-center w-full h-full flex-1">
                    <p className="description text-base-content w-full mb-8 text-sm text-center">
                        Whoa, looks like you just hit a dead end!{" "}
                        <span className="text-red-500 font-extrabold">
                            Time to check your gear (or Wi-Fi) and get back on
                            track.
                        </span>
                    </p>
                    <p className="description text-base-content w-full mb-8 text-lg text-center">
                        Don&apos;t worry, the ride resumes as soon as
                        you&apos;re back online.
                    </p>
                </div>
            ) : (
                <>
                    <p className="description text-base-content w-3/4 mb-4 mt-5 text-2xl text-center">
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
            <p className="absolute bottom-5 text-gray-400 text-sm lg:text-lg text-center w-full">
                &copy; 2023-{new Date().getFullYear()} MTB Coaching Network
            </p>
        </div>
    );
};

export default NoInternetPage;
