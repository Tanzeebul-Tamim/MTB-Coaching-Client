import { FaEyeSlash, FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { LoadCanvasTemplateNoReload } from "react-simple-captcha";
import { TbFidgetSpinner } from "react-icons/tb";
import "../../../styles/captcha.css";
import useLogin from "./useLogin";

const Login = () => {
    const {
        loading,
        error,
        disabled,
        handleGoogleSignIn,
        handleLogin,
        togglePasswordVisibility,
        handleValidateCaptcha,
        handlePasswordReset,
        emailRef,
        showPassword,
        captchaRef,
    } = useLogin();

    return (
        <div
            className="min-h-screen lg:pt-24 pt-16 lg:pb-16 pb-20 px-3 sm:px-6 md:px-10 lg:px-10 relative flex flex-col justify-center"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.600), rgba(0, 0, 0, 0.450)), url('/assets/login_banner.avif')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <form
                onSubmit={handleLogin}
                className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-20 w-full"
            >
                <div className="block lg:hidden w-full">
                    <h1 className="text-3xl md:text-4xl font-bold title tracking-widest uppercase text-primary text-center">
                        Login now!
                    </h1>
                </div>

                <div className="hidden lg:block z-10 text-left w-full lg:w-1/2">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold title uppercase text-primary">
                        Login now!
                    </h1>
                    <p className="py-4 md:py-6 description text-base md:text-lg lg:text-xl text-accent">
                        Gear up and get ready to embark on an exciting journey
                        into the world of mountain biking. Join our vibrant
                        community of riders, where you can connect, learn, and
                        share your passion for this thrilling sport. Sign in to
                        access exclusive features, personalized content, and
                        connect with fellow riders from around the globe.
                        Let&apos;s ride together and experience the thrill of
                        conquering new trails, pushing your limits, and creating
                        unforgettable memories. Log in now and let the adventure
                        begin!
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body p-4 md:p-6 lg:p-8">
                        <div className="form-control">
                            <label className="label">
                                <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                    Email
                                </span>
                            </label>
                            <input
                                ref={emailRef}
                                type="email"
                                name="email"
                                required
                                placeholder="Enter your email"
                                className="placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-300 dark:bg-stone-800 border-0 input input-bordered text-sm"
                            />
                        </div>
                        <div className="z-[10] relative form-control">
                            <label className="label">
                                <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                    Password
                                </span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                autoComplete="off"
                                name="password"
                                required
                                placeholder="Enter your password"
                                className="placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-300 dark:bg-stone-800 border-0 input input-bordered text-sm"
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    top: "43%",
                                    right: "10px",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                }}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                            <label className="label">
                                <button
                                    onClick={handlePasswordReset}
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password? Please enter your email and{" "}
                                    <span className="text-secondary">
                                        Click here
                                    </span>
                                </button>
                            </label>
                        </div>
                        <div className="z-[10] form-control">
                            <label className="label">
                                <span className="uppercase label-text font-bold tracking-widest text-base-content">
                                    <p className="mb-1">Enter captcha code</p>
                                    <p className="font-light">
                                        <LoadCanvasTemplateNoReload />
                                    </p>
                                </span>
                            </label>
                            <input
                                onChange={handleValidateCaptcha}
                                type="text"
                                required
                                ref={captchaRef}
                                name="captcha"
                                placeholder="Enter the above text"
                                className="placeholder:text-gray-600 placeholder:dark:text-gray-400 bg-stone-300 dark:bg-stone-800 border-0 input input-bordered text-sm"
                            />
                            <label className="label">
                                <Link
                                    to="/register"
                                    className="label-text-alt link link-hover"
                                >
                                    Don&apos; have an account? Please{" "}
                                    <span className="text-secondary">
                                        Register
                                    </span>
                                </Link>
                            </label>
                            <p
                                className={`text-red-600 ${
                                    error ? "visible" : "invisible"
                                }`}
                            >
                                {error ? error : "a"}
                            </p>
                        </div>
                        <div className="divider text-base-content description">
                            Or
                        </div>
                        <div className="z-[10] justify-center gap-10 flex">
                            <button
                                formNoValidate
                                onClick={handleGoogleSignIn}
                                className="lg:hover:scale-105 btn btn-circle hover:bg-base-300 bg-base-200 border-0 z-[10] flex justify-center items-center lg:w-3/4 w-4/5"
                            >
                                <FcGoogle className="text-2xl" />{" "}
                                <span className="font-bold font-sans description text-sm text-base-content">
                                    Continue With Google
                                </span>
                            </button>
                        </div>
                        <div className="z-[10] form-control mt-6">
                            <button
                                disabled={disabled || (loading && true)}
                                type="submit"
                                className="btn bg-amber-500 dark:bg-yellow-500 disabled:bg-amber-900 dark:disabled:bg-yellow-900 disabled:text-stone-500 dark:hover:bg-yellow-600 hover:bg-amber-600 text-accent border-0 text-lg md:text-xl"
                            >
                                {loading ? (
                                    <TbFidgetSpinner className="text-2xl text-stone-400 animate-spin" />
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="absolute lg:hidden -bottom-1 left-0 w-full dark:h-1/2 h-1/3 bg-gradient-to-b from-transparent to-base-100 pointer-events-none"></div>
            <div className="absolute hidden lg:block lg:bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-base-100 pointer-events-none"></div>
        </div>
    );
};

export default Login;
