import { Link, useRouteError } from "react-router-dom";
import useTitle from "../../Helmet/useTitle";

const ErrorPage = () => {
  const { error, statusText, status } = useRouteError();
  useTitle("| Page Not Found");
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.200), #0e0d0d), url('/error_banner.avif')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex relative justify-center py-5 px-20 flex-col items-center"
    >
      <h1 className="absolute top-5 uppercase text-yellow-400 text-6xl font-bold mt-3">
        {status} {statusText}
      </h1>
      <img
        src="/error_gif.gif"
        className="rounded-xl"
      />
      <p className="description text-white w-3/4 mb-4 mt-5 text-2xl text-center">
        Oops! Looks like you tried to land on a wrong trail. {error && error.message && `Because, ${error?.message}.`} Keep pedaling and stay tuned for our triumphant return!
      </p>
      <Link
        to="/"
        className="absolute bottom-40 description uppercase bg-yellow-500 text-xl p-3 text-white rounded-xl hover:bg-yellow-600 duration-150"
      >
        Back to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
