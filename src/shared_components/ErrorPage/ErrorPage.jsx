import { Link, useRouteError } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import useScreenSize from "../../hooks/useScreeSize";

const ErrorPage = () => {
    const { error, statusText, status } = useRouteError();
    let message = "";
    let route = "";
    let routeFlag = false;

    useTitle("| Page Not Found");

    if (error && error?.message) {
        for (const letter of error.message) {
            if (letter === '"') routeFlag = true;

            if (routeFlag) {
                route += letter;
            } else {
                message += letter;
            }
        }
    }

    const { isSmallDevice } = useScreenSize();

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.200), #0e0d0d), url('/error_banner${
                    isSmallDevice ? "_res.jpg" : ".avif"
                }')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                overflowY: "hidden",
            }}
            className="flex relative justify-center lg:py-5 lg:px-20 px-10 flex-col items-center min-h-screen overflow-y-hidden"
        >
            <h1 className="top-5 uppercase text-yellow-400 lg:text-6xl text-5xl font-bold lg:mb-5 mt-6">
                {status} {statusText}
            </h1>
            {isSmallDevice ? (
                <div className="flex flex-col items-center justify-center w-full h-full flex-1">
                    <p className="description text-white w-full mb-8 text-lg text-center">
                        Oops! Looks like you tried to land on a wrong trail.{" "}
                        {error && error.message && (
                            <>
                                <span className="text-red-500 font-extrabold">
                                    Because, {message}
                                </span>
                                <span className="text-yellow-500 font-extrabold">
                                    {route}
                                </span>
                            </>
                        )}{" "}
                        Keep pedaling and stay tuned for our triumphant return!
                    </p>
                    <img
                        src="/error_gif.gif"
                        className="rounded-2xl mb-5 w-5/6"
                    />
                    <Link
                        to="/"
                        className="px-3 py-2 description uppercase bg-yellow-500 text-sm font-extrabold text-white rounded-full hover:bg-yellow-600 duration-150"
                    >
                        Back to Homepage
                    </Link>
                </div>
            ) : (
                <>
                    <img src="/error_gif.gif" className="rounded-xl" />
                    <p className="description text-white w-3/4 mb-4 mt-5 text-2xl text-center">
                        Oops! Looks like you tried to land on a wrong trail.{" "}
                        {error && error.message && (
                            <>
                                <span className="text-red-500 font-extrabold">
                                    Because, {message}
                                </span>
                                <span className="text-yellow-500 font-extrabold">
                                    {route}
                                </span>
                            </>
                        )}{" "}
                        Keep pedaling and stay tuned for our triumphant return!
                    </p>
                    <Link
                        to="/"
                        className={`absolute ${
                            (typeof status !== "undefined" &&
                                status !== null &&
                                status !== "") ||
                            (typeof statusText !== "undefined" &&
                                statusText !== null &&
                                statusText !== "")
                                ? "bottom-48"
                                : "bottom-56"
                        } description uppercase bg-yellow-500 text-xl p-3 text-white rounded-xl hover:bg-yellow-600 duration-150`}
                    >
                        Back to Homepage
                    </Link>
                </>
            )}
        </div>
    );
};

export default ErrorPage;
